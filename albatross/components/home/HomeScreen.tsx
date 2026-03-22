import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EveningReflection } from '@/components/home/EveningReflection';
import { HealthCheckIn } from '@/components/home/HealthCheckIn';
import { HomeHeader } from '@/components/home/HomeHeader';
import { MyMorningSection } from '@/components/home/MyMorningSection';
import { TodaysReadSection } from '@/components/home/TodaysReadSection';
import { TodaysTopThree } from '@/components/home/TodaysTopThree';
import { WeekHabits } from '@/components/home/WeekHabits';
import {
  HOME_SECTION_ORDER,
  homeBridgingLines,
  type HomeSectionKey,
} from '@/constants/home';
import { theme } from '@/constants/theme';
import { useContentLayout } from '@/hooks/useContentLayout';
import { DEFAULT_MORNING_INPUTS, type MorningInputs } from '@/types/morning';

export function HomeScreen() {
  const { horizontalPadding } = useContentLayout();
  const contentMaxWidth =
    theme.layout.maxContentWidth + horizontalPadding * 2;

  const [activeIndex, setActiveIndex] = useState(0);
  const [morning, setMorning] = useState<MorningInputs>(DEFAULT_MORNING_INPUTS);

  const patchMorning = useCallback((patch: Partial<MorningInputs>) => {
    setMorning((prev) => ({ ...prev, ...patch }));
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (first?.index != null) {
        setActiveIndex(first.index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 55,
  }).current;

  const renderItem: ListRenderItem<HomeSectionKey> = ({ item }) => {
    const bridge =
      item === 'todaysRead'
        ? homeBridgingLines.afterMorning
        : item === 'top3'
          ? homeBridgingLines.beforeTopThree
          : item === 'evening'
            ? homeBridgingLines.beforeEvening
            : null;

    const body = (() => {
      switch (item) {
        case 'morning':
          return (
            <MyMorningSection
              morning={morning}
              onMorningChange={patchMorning}
            />
          );
        case 'todaysRead':
          return <TodaysReadSection morning={morning} />;
        case 'top3':
          return <TodaysTopThree />;
        case 'habits':
          return <WeekHabits />;
        case 'evening':
          return <EveningReflection />;
        case 'health':
          return (
            <View style={styles.healthFutureBlock}>
              <HealthCheckIn />
            </View>
          );
        default:
          return null;
      }
    })();

    return (
      <View>
        {bridge ? <Text style={styles.sectionBridge}>{bridge}</Text> : null}
        {body}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.screenBody} pointerEvents="box-none">
        <FlatList
          data={[...HOME_SECTION_ORDER]}
          keyExtractor={(k) => k}
          renderItem={renderItem}
          ListHeaderComponent={
            <HomeHeader
              activeIndex={activeIndex}
              sectionCount={HOME_SECTION_ORDER.length}
            />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingHorizontal: horizontalPadding,
              maxWidth: contentMaxWidth,
            },
          ]}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenBody: {
    flex: 1,
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
    width: '100%',
    alignSelf: 'center',
  },
  separator: {
    height: theme.spacing.lg,
  },
  sectionBridge: {
    ...theme.typography.caption,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 0.2,
    color: theme.colors.textMuted,
    opacity: 0.92,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    fontStyle: 'italic',
  },
  /** Separates active daily flow from the Health Check-In preview at the bottom. */
  healthFutureBlock: {
    paddingTop: theme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
});
