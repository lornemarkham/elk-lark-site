import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { DailyTimeline } from '@/components/calendar/DailyTimeline';
import {
  focusBlockToCalendarEvent,
  parseFocusBlockRow,
} from '@/lib/calendar/focusBlockToEvent';
import { sortEventsByStartTime } from '@/lib/calendar/sortEvents';
import { mockCalendarDayEvents } from '@/lib/mock/calendarDayEvents';
import {
  DEFAULT_HOUR_ROW_HEIGHT,
  TIMELINE_START_HOUR,
  TIMELINE_TOTAL_MINUTES,
  getNowMinutesInTimelineWindow,
  hourLabels,
} from '@/components/calendar/timelineLayout';
import { theme } from '@/constants/theme';
import { useContentLayout } from '@/hooks/useContentLayout';
import { useFocusStore } from '@/providers/FocusStore';
import type { CalendarEvent } from '@/types/calendar';

/** Where the “now” line sits in the viewport (0 = top). Slightly above center so upcoming events stay visible. */
const NOW_LINE_VIEWPORT_RATIO = 0.42;

export function CalendarDayScreen() {
  const { horizontalPadding } = useContentLayout();
  const { focusBlocks, mockEventCompleted, topThreeItems } = useFocusStore();
  const hasPlacedTopThree = focusBlocks.length > 0;
  const isFocused = useIsFocused();

  const scrollRef = useRef<ScrollView>(null);
  const didAutoScrollRef = useRef(false);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [hintBlockHeight, setHintBlockHeight] = useState(0);

  const { height: windowHeight } = useWindowDimensions();
  const hourCount = hourLabels().length;
  /** Tall screens need a taller grid than the default so the day strip remains scrollable. */
  const timelineRowHeight = useMemo(
    () =>
      Math.max(
        DEFAULT_HOUR_ROW_HEIGHT,
        Math.ceil(windowHeight / hourCount),
      ),
    [windowHeight, hourCount],
  );
  const gridHeight = hourCount * timelineRowHeight;

  const computeScrollY = useCallback(
    (hintOffset: number) => {
      if (scrollViewHeight <= 0 || contentHeight <= 0) return null;

      const d = new Date();
      const nowInWindow = getNowMinutesInTimelineWindow(d);
      const clockMin = d.getHours() * 60 + d.getMinutes();
      const dayStartMin = TIMELINE_START_HOUR * 60;

      let nowLineY: number;
      if (nowInWindow != null) {
        nowLineY = (nowInWindow / TIMELINE_TOTAL_MINUTES) * gridHeight;
      } else if (clockMin < dayStartMin) {
        nowLineY = 0;
      } else {
        nowLineY = gridHeight;
      }

      const targetY =
        hintOffset +
        nowLineY -
        scrollViewHeight * NOW_LINE_VIEWPORT_RATIO;
      const maxScroll = Math.max(0, contentHeight - scrollViewHeight);
      return Math.max(0, Math.min(targetY, maxScroll));
    },
    [
      contentHeight,
      gridHeight,
      scrollViewHeight,
    ],
  );

  useFocusEffect(
    useCallback(() => {
      didAutoScrollRef.current = false;
    }, []),
  );

  useEffect(() => {
    if (!isFocused || didAutoScrollRef.current) return;
    if (scrollViewHeight <= 0 || contentHeight <= 0) return;
    const hintOffset = hasPlacedTopThree ? 0 : hintBlockHeight;
    if (!hasPlacedTopThree && hintBlockHeight <= 0) return;

    const y = computeScrollY(hintOffset);
    if (y == null) return;

    didAutoScrollRef.current = true;
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y, animated: true });
    });
  }, [
    isFocused,
    scrollViewHeight,
    contentHeight,
    hintBlockHeight,
    hasPlacedTopThree,
    computeScrollY,
  ]);

  const day = useMemo(() => new Date(), []);

  const dateLabel = useMemo(
    () =>
      day.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [day],
  );

  const events = useMemo((): CalendarEvent[] => {
    const fromStore = focusBlocks.map((b) => {
      const row = parseFocusBlockRow(b.id);
      const completed =
        row !== null ? (topThreeItems[row]?.completed ?? false) : false;
      return focusBlockToCalendarEvent(b, completed);
    });
    const mockMerged = mockCalendarDayEvents.map((e) => ({
      ...e,
      completed: mockEventCompleted[e.id] ?? false,
    }));
    return sortEventsByStartTime([...mockMerged, ...fromStore]);
  }, [focusBlocks, mockEventCompleted, topThreeItems]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.dateTitle}>{dateLabel}</Text>
        <Pressable
          onPress={() => {
            console.log('[Calendar] day complete toggled (placeholder)');
          }}
          style={({ pressed }) => [styles.checkBtn, pressed && { opacity: 0.75 }]}
          accessibilityRole="button"
          accessibilityLabel="Mark day complete"
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={28}
            color={theme.colors.accent}
          />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: theme.spacing.xxl,
          },
        ]}
        showsVerticalScrollIndicator={false}
        onLayout={(e: LayoutChangeEvent) => {
          setScrollViewHeight(e.nativeEvent.layout.height);
        }}
        onContentSizeChange={(_w, h) => {
          setContentHeight(h);
        }}
      >
        {!hasPlacedTopThree ? (
          <View
            style={styles.emptyHintWrap}
            onLayout={(e: LayoutChangeEvent) => {
              setHintBlockHeight(e.nativeEvent.layout.height);
            }}
          >
            <Text style={styles.emptyHint}>
              Assign your Top Three to place them in your day
            </Text>
          </View>
        ) : null}
        <DailyTimeline events={events} hourRowHeight={timelineRowHeight} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  dateTitle: {
    ...theme.typography.title,
    color: theme.colors.text,
    flex: 1,
  },
  checkBtn: {
    padding: theme.spacing.xs,
    marginRight: -theme.spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  /** No flexGrow — content height must come from children so the timeline scrolls fully. */
  scrollContent: {},
  emptyHintWrap: {
    marginBottom: theme.spacing.md,
  },
  emptyHint: {
    ...theme.typography.caption,
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textMuted,
    textAlign: 'center',
    opacity: 0.85,
  },
});
