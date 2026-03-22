import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { ScreenHeaderTitleRow } from '@/components/branding/ScreenHeaderTitleRow';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { insightsCopy } from '@/constants/insights';
import { theme } from '@/constants/theme';
import type { InsightsWeekModel } from '@/lib/insights/buildInsightsWeekModel';
import { loadInsightsWeekModel } from '@/lib/insights/loadInsightsWeekModel';
import {
  getPreferences,
  mergePreferences,
  savePreferences,
} from '@/lib/storage/preferences';
import { useContentLayout } from '@/hooks/useContentLayout';
import { DEFAULT_GUIDANCE_LEVEL } from '@/types/preferences';

const GUIDANCE_SLIDER = { min: 1, max: 5, step: 1 } as const;

function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function MetricRow({
  label,
  value,
  showRule,
}: {
  label: string;
  value: string;
  showRule?: boolean;
}) {
  return (
    <View style={[styles.metricRow, showRule && styles.metricRowRule]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

type GuidanceLevelProps = {
  value: number;
  onChange: (v: number) => void;
};

/** Core control — persisted via app Preferences (Phase 1: storage only). */
function GuidanceLevelSection({ value, onChange }: GuidanceLevelProps) {
  return (
    <Card style={styles.guidanceCard}>
      <Text style={styles.sectionTitle}>{insightsCopy.guidanceTitle}</Text>
      <Text style={styles.guidanceDescription}>
        {insightsCopy.guidanceLevelHint}
      </Text>
      <View style={styles.sliderBlock}>
        <Slider
          label={insightsCopy.guidanceSliderLabel(value)}
          value={value}
          min={GUIDANCE_SLIDER.min}
          max={GUIDANCE_SLIDER.max}
          step={GUIDANCE_SLIDER.step}
          onChange={onChange}
          showValue={false}
        />
        <View style={styles.guidanceScale}>
          <Text style={styles.guidanceScaleEnd}>Gentle</Text>
          <Text style={styles.guidanceScaleEnd}>More direct</Text>
        </View>
      </View>
    </Card>
  );
}

/**
 * Week snapshot, patterns, suggestions, and guidance intensity — derived + preferences.
 */
export function InsightsScreen() {
  const { horizontalPadding } = useContentLayout();
  const contentMaxWidth =
    theme.layout.maxContentWidth + horizontalPadding * 2;

  const [model, setModel] = useState<InsightsWeekModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [guidanceLevel, setGuidanceLevel] = useState(DEFAULT_GUIDANCE_LEVEL);
  const [prefsHydrated, setPrefsHydrated] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoading(true);
      Promise.all([loadInsightsWeekModel(), getPreferences()])
        .then(([m, stored]) => {
          if (cancelled) return;
          setModel(m);
          setGuidanceLevel(mergePreferences(stored).guidanceLevel ?? DEFAULT_GUIDANCE_LEVEL);
          setPrefsHydrated(true);
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
      return () => {
        cancelled = true;
      };
    }, []),
  );

  useEffect(() => {
    if (!prefsHydrated) return;
    const t = setTimeout(() => {
      getPreferences().then((stored) => {
        const merged = mergePreferences(stored);
        savePreferences({ ...merged, guidanceLevel });
      });
    }, 400);
    return () => clearTimeout(t);
  }, [guidanceLevel, prefsHydrated]);

  const onGuidanceChange = useCallback((v: number) => {
    setGuidanceLevel(Math.max(1, Math.min(5, Math.round(v))));
  }, []);

  if (loading || model === null) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={theme.colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (model.isEmpty) {
    const daysCollected = 0;
    const progressPct = (daysCollected / 7) * 100;
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: horizontalPadding,
              maxWidth: contentMaxWidth,
              paddingBottom: theme.spacing.xxl + theme.spacing.md,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeaderTitleRow title="Insights">
            <Text style={styles.pageSubtitle}>{insightsCopy.pageSubtitle}</Text>
          </ScreenHeaderTitleRow>
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyHeading}>{insightsCopy.emptyHeading}</Text>
            <Text style={styles.emptySubtext}>{insightsCopy.emptySubtext}</Text>
            <Text style={styles.emptyWeekPosition}>
              {insightsCopy.emptyWeekPosition}
            </Text>
            <Text style={styles.emptyProgressLabel}>
              {insightsCopy.weekDaysProgress(daysCollected)}
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${progressPct}%` }]}
              />
            </View>
            <Text style={styles.emptyEncouragement}>
              {insightsCopy.emptyEncouragement}
            </Text>
          </Card>

          <View style={styles.stack}>
            <GuidanceLevelSection
              value={guidanceLevel}
              onChange={onGuidanceChange}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const energyLabel =
    model.avgEnergy != null ? `${model.avgEnergy.toFixed(1)} / 10` : '—';
  const topThreeLabel =
    model.topThreeCompletionPct != null
      ? `${model.topThreeCompletionPct}%`
      : '—';
  const habitsLabel = `${model.habitsCompleted} of ${model.habitsTotal}`;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            maxWidth: contentMaxWidth,
            paddingBottom: theme.spacing.xxl + theme.spacing.md,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeaderTitleRow title="Insights">
          <Text style={styles.pageSubtitle}>{insightsCopy.pageSubtitle}</Text>
        </ScreenHeaderTitleRow>

        {model.dayCount < 7 ? (
          <View style={styles.weekBuildingBanner}>
            <Text style={styles.weekBuildingLabel}>
              {insightsCopy.weekDaysProgress(model.dayCount)}
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(model.dayCount / 7) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.weekBuildingEncourage}>
              {insightsCopy.weekProgressEncouragement}
            </Text>
          </View>
        ) : null}

        <View style={styles.stack}>
          <Card style={styles.card}>
            <Text style={styles.eyebrow}>{insightsCopy.weekCardEyebrow}</Text>
            <SectionTitle>{insightsCopy.weekCardTitle}</SectionTitle>
            <Text style={styles.weekSnapshotIntro}>
              {insightsCopy.weekSnapshotIntro}
            </Text>
            <View style={styles.metrics}>
              <MetricRow
                label={insightsCopy.metricAvgEnergy}
                value={energyLabel}
                showRule
              />
              <MetricRow
                label={insightsCopy.metricTopThree}
                value={topThreeLabel}
                showRule
              />
              <MetricRow
                label={insightsCopy.metricHabits}
                value={habitsLabel}
              />
            </View>
          </Card>

          <Card style={styles.card}>
            <SectionTitle>Patterns</SectionTitle>
            <Text style={styles.sectionIntro}>
              {insightsCopy.sectionIntroPatterns}
            </Text>
            {model.patterns.length > 0 ? (
              <View style={styles.bullets}>
                {model.patterns.map((line, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>·</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.placeholder}>{insightsCopy.patternsPlaceholder}</Text>
            )}
          </Card>

          <Card style={styles.card}>
            <SectionTitle>Suggestions</SectionTitle>
            {model.suggestions.length > 0 ? (
              <>
                <Text style={styles.sectionIntro}>
                  {insightsCopy.sectionIntroSuggestions}
                </Text>
                <View style={styles.bullets}>
                  {model.suggestions.map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>·</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Text style={styles.placeholder}>
                {insightsCopy.suggestionsPlaceholder}
              </Text>
            )}
          </Card>

          <GuidanceLevelSection
            value={guidanceLevel}
            onChange={onGuidanceChange}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  scrollContent: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: theme.spacing.md,
    gap: theme.spacing.lg,
  },
  pageSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    maxWidth: 520,
    lineHeight: 23,
  },
  weekSnapshotIntro: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  stack: {
    gap: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  card: {
    gap: theme.spacing.md,
  },
  guidanceCard: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  guidanceDescription: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginTop: -theme.spacing.xs,
  },
  eyebrow: {
    ...theme.typography.eyebrow,
    color: theme.colors.textMuted,
    letterSpacing: 1.4,
    fontSize: 10,
  },
  sectionTitle: {
    ...theme.typography.title,
    color: theme.colors.text,
    letterSpacing: -0.2,
  },
  sectionIntro: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginTop: -theme.spacing.xs,
  },
  placeholder: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginTop: theme.spacing.xs,
  },
  emptyCard: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  emptyHeading: {
    ...theme.typography.title,
    fontSize: 20,
    lineHeight: 26,
    color: theme.colors.text,
    letterSpacing: -0.2,
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    lineHeight: 24,
  },
  emptyProgressLabel: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  progressTrack: {
    height: 4,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentSoft,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentMuted,
  },
  emptyEncouragement: {
    ...theme.typography.caption,
    fontStyle: 'italic',
    color: theme.colors.textMuted,
    lineHeight: 20,
  },
  weekBuildingBanner: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  weekBuildingLabel: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    color: theme.colors.text,
  },
  weekBuildingEncourage: {
    ...theme.typography.caption,
    fontStyle: 'italic',
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
  metrics: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  metricRowRule: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.xs,
    paddingBottom: theme.spacing.sm,
  },
  metricLabel: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    flex: 1,
  },
  metricValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
  },
  bullets: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  bulletDot: {
    ...theme.typography.body,
    color: theme.colors.accentMuted,
    lineHeight: 22,
    width: 12,
    textAlign: 'center',
  },
  bulletText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 22,
    flex: 1,
  },
  sliderBlock: {
    marginTop: theme.spacing.xs,
  },
  guidanceScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  guidanceScaleEnd: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.textMuted,
  },
});
