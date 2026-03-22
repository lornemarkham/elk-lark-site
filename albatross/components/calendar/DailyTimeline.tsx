import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/constants/theme';
import type { CalendarEvent } from '@/types/calendar';

import { computeEventLayouts } from '@/components/calendar/timelineOverlap';
import { useFocusStore } from '@/providers/FocusStore';
import {
  DEFAULT_HOUR_ROW_HEIGHT,
  TIMELINE_TOTAL_MINUTES,
  formatHourLabel,
  formatTimeParts,
  getNowMinutesInTimelineWindow,
  hasEventEnded,
  hourLabels,
  isEventActiveNow,
  minutesFromTimelineStart,
} from '@/components/calendar/timelineLayout';

const TIME_GUTTER = 48;

/** “Now” line + active-event accent */
const ACCENT_SOLID = '#E9AD8B';
const NOW_LINE_COLOR = ACCENT_SOLID;
const NOW_DOT_SIZE = 6;
const NOW_LINE_HEIGHT = 2;

const VARIANT_STYLES: Record<
  CalendarEvent['variant'],
  { backgroundColor: string; borderColor: string }
> = {
  bloom: {
    backgroundColor: '#EDE5E1',
    borderColor: 'rgba(61, 56, 53, 0.1)',
  },
  mist: {
    backgroundColor: '#E6EBE6',
    borderColor: 'rgba(61, 56, 53, 0.09)',
  },
  dune: {
    backgroundColor: '#EBE8E3',
    borderColor: 'rgba(61, 56, 53, 0.09)',
  },
  clay: {
    backgroundColor: '#E8E4DF',
    borderColor: 'rgba(61, 56, 53, 0.1)',
  },
};

/** Top Three blocks — warm priority lane, lighter than prior debug styling */
const FOCUS_STORE_BG = theme.colors.accentSoft;
/** Darker + soft #E9AD8B wash for “current” */
const FOCUS_STORE_BG_ACTIVE = '#C9B0A4';
const FOCUS_STORE_BORDER = 'rgba(184, 149, 138, 0.22)';
const FOCUS_STORE_ACCENT = theme.colors.dotActive;

/** Stronger contrast + accent tint for the active event */
const VARIANT_ACTIVE_BG: Record<CalendarEvent['variant'], string> = {
  bloom: '#D2C3BB',
  mist: '#C8D0C8',
  dune: '#CDC6BF',
  clay: '#D0C8C2',
};

const ACTIVE_OUTER_BORDER = 'rgba(233, 173, 139, 0.5)';
const ACTIVE_BORDER_WIDTH = 3;
const ACTIVE_LEFT_BORDER_WIDTH = 4;
const ACTIVE_EVENT_SHADOW = {
  shadowColor: '#E9AD8B',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 4,
} as const;

const PAST_EVENT_OPACITY = 0.5;
const COMPLETED_DIM = 0.88;

type EventBlockContentProps = {
  event: CalendarEvent;
  fromStore: boolean;
  isExternal: boolean;
  kindLabel: string;
  completed: boolean;
};

function EventBlockContent({
  event,
  fromStore,
  isExternal,
  kindLabel,
  completed,
}: EventBlockContentProps) {
  const typeLabel = fromStore ? 'Top Three' : kindLabel;
  const timeRange = `${formatTimeParts(event.start)} – ${formatTimeParts(event.end)}`;

  return (
    <>
      <Text
        style={[
          fromStore ? styles.topThreeLabel : styles.eventTypeTag,
          !fromStore && isExternal && styles.eventTypeTagExternal,
        ]}
      >
        {typeLabel}
      </Text>
      <View style={styles.titleRow}>
        {completed ? (
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={theme.colors.dotActive}
            style={styles.titleCheck}
          />
        ) : null}
        <Text
          style={[
            styles.eventTitle,
            fromStore && styles.eventTitleStore,
            isExternal && styles.eventTitleExternal,
            completed && styles.eventTitleDone,
          ]}
          numberOfLines={3}
        >
          {event.title}
        </Text>
      </View>
      <Text style={[styles.eventTime, completed && styles.eventTimeDone]}>
        {timeRange}
      </Text>
    </>
  );
}

type ActivePulseWrapperProps = {
  isActive: boolean;
  baseOpacity: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/**
 * Very subtle whole-block opacity pulse when `isActive` (no hooks in parent map).
 */
function ActivePulseWrapper({
  isActive,
  baseOpacity,
  style,
  children,
}: ActivePulseWrapperProps) {
  const opacityAnim = useRef(new Animated.Value(baseOpacity)).current;

  useEffect(() => {
    if (!isActive) {
      opacityAnim.setValue(baseOpacity);
      return;
    }
    opacityAnim.setValue(baseOpacity);
    const min = baseOpacity * 0.96;
    const max = baseOpacity;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: min,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: max,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => {
      loop.stop();
      opacityAnim.setValue(baseOpacity);
    };
  }, [isActive, baseOpacity, opacityAnim]);

  if (!isActive) {
    return (
      <View style={[style, { opacity: baseOpacity }]}>{children}</View>
    );
  }

  return (
    <Animated.View style={[style, { opacity: opacityAnim }]}>{children}</Animated.View>
  );
}

type Props = {
  events: CalendarEvent[];
  hourRowHeight?: number;
};

export function DailyTimeline({
  events,
  hourRowHeight = DEFAULT_HOUR_ROW_HEIGHT,
}: Props) {
  const {
    toggleTopThreeCompletedByFocusBlockId,
    toggleMockEventCompleted,
  } = useFocusStore();
  const hours = hourLabels();
  const gridHeight = hours.length * hourRowHeight;

  const [minuteTick, setMinuteTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMinuteTick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const nowMinutes = useMemo(
    () => getNowMinutesInTimelineWindow(),
    [minuteTick],
  );
  const nowLineTopPx =
    nowMinutes != null
      ? (nowMinutes / TIMELINE_TOTAL_MINUTES) * gridHeight
      : null;

  /** Refreshes with `minuteTick` so past/future opacity updates every minute. */
  const timelineNow = useMemo(() => new Date(), [minuteTick]);

  /** By start time; same slot → Top Three block sorts after mock (higher zIndex). */
  const ordered = useMemo(() => {
    return [...events].sort((a, b) => {
      const t =
        minutesFromTimelineStart(a.start) - minutesFromTimelineStart(b.start);
      if (t !== 0) return t;
      return (a.fromFocusStore ? 1 : 0) - (b.fromFocusStore ? 1 : 0);
    });
  }, [events]);

  const layouts = useMemo(
    () => computeEventLayouts(ordered),
    [ordered],
  );

  return (
    <View style={[styles.row, styles.timelineRoot]}>
      <View style={[styles.timeColumn, { width: TIME_GUTTER }]}>
        {hours.map((h) => (
          <View
            key={h}
            style={[styles.timeCell, { height: hourRowHeight }]}
          >
            <Text style={styles.timeLabel}>{formatHourLabel(h)}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.gridWrap, { height: gridHeight }]}>
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.gridOverlay]}
        >
          {hours.map((h) => (
            <View
              key={h}
              style={[
                styles.gridRow,
                {
                  height: hourRowHeight,
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderTopColor: theme.colors.border,
                },
              ]}
            />
          ))}
        </View>

        {nowLineTopPx != null ? (
          <View
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.nowLineWrap,
              {
                top: nowLineTopPx - NOW_DOT_SIZE / 2,
                zIndex: 15,
              },
            ]}
          >
            <View style={styles.nowDot} />
            <View style={styles.nowLineBar} />
          </View>
        ) : null}

        {ordered.map((event) => {
          const startM = minutesFromTimelineStart(event.start);
          const endM = minutesFromTimelineStart(event.end);
          const durM = Math.max(endM - startM, 1);

          const top = (startM / TIMELINE_TOTAL_MINUTES) * gridHeight;
          const height = Math.max(
            (durM / TIMELINE_TOTAL_MINUTES) * gridHeight,
            46,
          );

          const palette = VARIANT_STYLES[event.variant];
          const isExternal = event.eventType === 'external';
          const fromStore = event.fromFocusStore === true;
          const completed = event.completed === true;

          const isActive = isEventActiveNow(event, timelineNow);

          const backgroundColor = fromStore
            ? isActive
              ? FOCUS_STORE_BG_ACTIVE
              : FOCUS_STORE_BG
            : isActive
              ? VARIANT_ACTIVE_BG[event.variant]
              : palette.backgroundColor;
          const borderColor = isActive
            ? ACTIVE_OUTER_BORDER
            : fromStore
              ? FOCUS_STORE_BORDER
              : palette.borderColor;
          const leftAccent = isExternal
            ? theme.colors.dotInactive
            : theme.colors.accent;

          const kindLabel = isExternal ? 'Calendar' : 'Focus';
          const layout = layouts.get(event.id) ?? {
            left: '0%' as const,
            width: '100%' as const,
          };

          const zIndex = fromStore ? 4 : isExternal ? 1 : 2;

          const isPast = hasEventEnded(event, timelineNow);
          const timelineDim = isPast ? PAST_EVENT_OPACITY : 1;

          const stackZ = isActive ? zIndex + 1 : zIndex;

          const onToggleComplete = () => {
            if (fromStore) toggleTopThreeCompletedByFocusBlockId(event.id);
            else toggleMockEventCompleted(event.id);
          };

          const blockContent = (
            <EventBlockContent
              event={event}
              fromStore={fromStore}
              isExternal={isExternal}
              kindLabel={kindLabel}
              completed={completed}
            />
          );

          if (fromStore) {
            return (
              <TopThreeTimelineBlock
                key={event.id}
                event={event}
                top={top}
                height={height}
                layout={layout}
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                zIndex={stackZ}
                timelineDim={timelineDim}
                isActive={isActive}
                completed={completed}
                onToggleComplete={onToggleComplete}
              >
                {blockContent}
              </TopThreeTimelineBlock>
            );
          }

          const baseOp =
            (isExternal ? 0.96 : 1) *
            timelineDim *
            (completed ? COMPLETED_DIM : 1);
          const typeForA11y = isExternal ? 'Calendar' : 'Focus';
          const timeRange = `${formatTimeParts(event.start)} – ${formatTimeParts(event.end)}`;

          return (
            <ActivePulseWrapper
              key={event.id}
              isActive={isActive}
              baseOpacity={baseOp}
              style={{
                position: 'absolute',
                top,
                height,
                left: layout.left,
                width: layout.width,
                zIndex: stackZ,
                overflow: isActive ? 'visible' : 'hidden',
              }}
            >
              <Pressable
                onPress={onToggleComplete}
                accessibilityRole="button"
                accessibilityState={{ checked: completed }}
                accessibilityLabel={`${event.title}. ${typeForA11y}. ${timeRange}. ${completed ? 'Completed' : 'Not completed'}. Tap to mark ${completed ? 'not done' : 'done'}.`}
                style={({ pressed }) => [
                  styles.eventBlockInner,
                  {
                    height: '100%',
                    backgroundColor,
                    borderColor,
                    borderWidth: isActive ? ACTIVE_BORDER_WIDTH : StyleSheet.hairlineWidth,
                    borderLeftWidth: isActive
                      ? ACTIVE_LEFT_BORDER_WIDTH
                      : isExternal
                        ? 2
                        : 3,
                    borderLeftColor: isActive ? ACCENT_SOLID : leftAccent,
                    opacity: pressed ? 0.96 : 1,
                    overflow: isActive ? 'visible' : 'hidden',
                    ...(isActive ? ACTIVE_EVENT_SHADOW : { elevation: 0 }),
                  },
                ]}
              >
                {blockContent}
              </Pressable>
            </ActivePulseWrapper>
          );
        })}
      </View>
    </View>
  );
}

type TopThreeTimelineBlockProps = {
  event: CalendarEvent;
  top: number;
  height: number;
  layout: { left: `${number}%`; width: `${number}%` };
  backgroundColor: string;
  borderColor: string;
  zIndex: number;
  timelineDim: number;
  isActive: boolean;
  completed: boolean;
  onToggleComplete: () => void;
  children: ReactNode;
};

function TopThreeTimelineBlock({
  event,
  top,
  height,
  layout,
  backgroundColor,
  borderColor,
  zIndex,
  timelineDim,
  isActive,
  completed,
  onToggleComplete,
  children,
}: TopThreeTimelineBlockProps) {
  const fade = useRef(new Animated.Value(1)).current;
  const slotRef = useRef(event.focusSlotIndex ?? 0);

  useEffect(() => {
    const slot = event.focusSlotIndex ?? 0;
    if (slotRef.current !== slot) {
      slotRef.current = slot;
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 0.88,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [event.focusSlotIndex, fade]);

  const timeRange = `${formatTimeParts(event.start)} – ${formatTimeParts(event.end)}`;
  const basePulseOpacity =
    timelineDim * (completed ? COMPLETED_DIM : 1);

  return (
    <ActivePulseWrapper
      isActive={isActive}
      baseOpacity={basePulseOpacity}
      style={{
        position: 'absolute',
        top,
        height,
        left: layout.left,
        width: layout.width,
        zIndex,
        overflow: isActive ? 'visible' : 'hidden',
      }}
    >
      <Pressable
        onPress={onToggleComplete}
        accessibilityRole="button"
        accessibilityState={{ checked: completed }}
        accessibilityLabel={`Top Three. ${event.title}. ${timeRange}. ${isActive ? 'Current event. ' : ''}${completed ? 'Completed' : 'Not completed'}. Tap to mark ${completed ? 'not done' : 'done'}.`}
        style={({ pressed }) => [
          styles.eventBlockInner,
          {
            height: '100%',
            backgroundColor,
            borderColor: isActive ? ACTIVE_OUTER_BORDER : borderColor,
            borderWidth: isActive ? ACTIVE_BORDER_WIDTH : StyleSheet.hairlineWidth,
            borderLeftWidth: isActive ? ACTIVE_LEFT_BORDER_WIDTH : 3,
            borderLeftColor: isActive ? ACCENT_SOLID : FOCUS_STORE_ACCENT,
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
            overflow: isActive ? 'visible' : 'hidden',
            ...(isActive ? ACTIVE_EVENT_SHADOW : { elevation: 2 }),
          },
        ]}
      >
        <Animated.View style={[styles.topThreeInner, { opacity: fade }]}>
          {children}
        </Animated.View>
      </Pressable>
    </ActivePulseWrapper>
  );
}

const styles = StyleSheet.create({
  timelineRoot: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeColumn: {
    paddingRight: theme.spacing.sm,
  },
  timeCell: {
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  timeLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  gridWrap: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    position: 'relative',
  },
  nowLineWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: NOW_DOT_SIZE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowDot: {
    width: NOW_DOT_SIZE,
    height: NOW_DOT_SIZE,
    borderRadius: NOW_DOT_SIZE / 2,
    backgroundColor: NOW_LINE_COLOR,
  },
  nowLineBar: {
    flex: 1,
    height: NOW_LINE_HEIGHT,
    marginLeft: 2,
    borderRadius: NOW_LINE_HEIGHT / 2,
    backgroundColor: NOW_LINE_COLOR,
  },
  gridOverlay: {
    zIndex: 1,
  },
  gridRow: {
    width: '100%',
  },
  eventBlockInner: {
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  titleCheck: {
    marginTop: 2,
  },
  topThreeInner: {
    flex: 1,
  },
  eventTypeTag: {
    ...theme.typography.caption,
    fontSize: 10,
    lineHeight: 13,
    color: theme.colors.textMuted,
    marginBottom: 3,
    letterSpacing: 0.35,
  },
  eventTypeTagExternal: {
    color: 'rgba(130, 122, 116, 0.85)',
  },
  topThreeLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.6,
    color: theme.colors.dotActive,
    marginBottom: 4,
  },
  eventTitle: {
    ...theme.typography.bodyMedium,
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.text,
    flex: 1,
  },
  eventTitleStore: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    lineHeight: 19,
    color: theme.colors.text,
  },
  eventTitleExternal: {
    fontFamily: 'DMSans_400Regular',
    color: 'rgba(61, 56, 53, 0.88)',
  },
  eventTitleDone: {
    textDecorationLine: 'line-through',
    color: theme.colors.textMuted,
  },
  eventTime: {
    ...theme.typography.caption,
    fontSize: 11,
    lineHeight: 14,
    color: theme.colors.textMuted,
    marginTop: 6,
    fontFamily: 'DMSans_500Medium',
  },
  eventTimeDone: {
    opacity: 0.85,
  },
});
