import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ScreenHeaderTitleRow } from '@/components/branding/ScreenHeaderTitleRow';
import { SectionCard } from '@/components/ui/SectionCard';
import { LifeWheelCategoryList } from '@/components/wheel/LifeWheelCategoryList';
import { LifeWheelDetailPanel } from '@/components/wheel/LifeWheelDetailPanel';
import { LifeWheelRadar } from '@/components/wheel/LifeWheelRadar';
import { LifeWheelScoreEditor } from '@/components/wheel/LifeWheelScoreEditor';
import { LifeWheelSectionCard } from '@/components/wheel/LifeWheelSectionCard';
import { WheelYourFocusCard } from '@/components/wheel/WheelYourFocusCard';
import { WeeklyIntentionSection } from '@/components/wheel/WeeklyIntentionSection';
import { WeeklyPatternsSection } from '@/components/wheel/WeeklyPatternsSection';
import { WeeklyReflectionSection } from '@/components/wheel/WeeklyReflectionSection';
import { theme } from '@/constants/theme';
import {
  getLifeWheelDimensionDetail,
  mockWeeklyIntentionExtraPrompt,
  mockWeeklyIntentionThemeDefault,
  mockWeeklyIntentionThemeOptions,
  mockWeeklyOutcomeFields,
  mockWeeklyPatternSliders,
  mockWeeklyReflectionPrompts,
  wheelWeeklySections,
} from '@/lib/data/wheelWeekly';
import {
  getLifeWheelPreferences,
  saveLifeWheelPreferences,
} from '@/lib/storage/lifeWheelPreferences';
import {
  lifeWheelDimensionsFromPreferences,
  newWheelCategoryId,
  WHEEL_MAX_CATEGORIES,
  WHEEL_MIN_CATEGORIES,
} from '@/lib/wheel/lifeWheelCategories';
import { isValidAreaLabel } from '@/lib/wheel/wheelAreaLabel';
import { useContentLayout } from '@/hooks/useContentLayout';
import type { LifeWheelUserPreferences } from '@/types/wheel';

const INTENTION_DROPDOWN_LABEL = 'This week’s theme';
const WIDE_BREAKPOINT = 640;

export function WheelWeeklyScreen() {
  const { horizontalPadding } = useContentLayout();
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= WIDE_BREAKPOINT;

  const contentMaxWidth =
    theme.layout.maxContentWidth + horizontalPadding * 2;

  const copy = wheelWeeklySections;

  const [prefs, setPrefs] = useState<LifeWheelUserPreferences | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDimensionId, setSelectedDimensionId] = useState<
    string | null
  >(null);
  const [sliderActiveId, setSliderActiveId] = useState<string | null>(null);
  const [weeklyFocusDimensionId, setWeeklyFocusDimensionId] = useState<
    string | null
  >(null);

  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelValue, setEditingLabelValue] = useState('');

  const [addingArea, setAddingArea] = useState(false);
  const [newAreaDraft, setNewAreaDraft] = useState('');
  const [addAreaError, setAddAreaError] = useState<string | null>(null);

  useEffect(() => {
    getLifeWheelPreferences().then(setPrefs);
  }, []);

  useEffect(() => {
    if (!prefs) return;
    const t = setTimeout(() => {
      saveLifeWheelPreferences(prefs);
    }, 450);
    return () => clearTimeout(t);
  }, [prefs]);

  const dimensions = useMemo(
    () => (prefs ? lifeWheelDimensionsFromPreferences(prefs) : []),
    [prefs],
  );

  const updateDimensionValue = useCallback((id: string, value: number) => {
    const v = Math.max(0, Math.min(10, Math.round(value)));
    setPrefs((p) => {
      if (!p) return p;
      return {
        ...p,
        scoresById: { ...p.scoresById, [id]: v },
      };
    });
  }, []);

  const startEditLabel = useCallback((id: string, label: string) => {
    setEditingLabelId(id);
    setEditingLabelValue(label);
    setSelectedDimensionId(id);
  }, []);

  const commitEditingLabel = useCallback(() => {
    if (!editingLabelId || !prefs) return;
    const trimmed = editingLabelValue.trim();
    const prev =
      prefs.categories.find((c) => c.id === editingLabelId)?.label ?? '';

    if (!trimmed || trimmed === prev) {
      setEditingLabelId(null);
      setEditingLabelValue('');
      return;
    }

    if (!isValidAreaLabel(trimmed)) {
      setEditingLabelId(null);
      setEditingLabelValue('');
      return;
    }

    setPrefs((p) => {
      if (!p) return p;
      return {
        ...p,
        categories: p.categories.map((c) =>
          c.id === editingLabelId ? { ...c, label: trimmed } : c,
        ),
      };
    });
    setEditingLabelId(null);
    setEditingLabelValue('');
  }, [editingLabelId, editingLabelValue, prefs]);

  const startAddArea = useCallback(() => {
    setAddingArea(true);
    setNewAreaDraft('');
    setAddAreaError(null);
  }, []);

  const cancelAddArea = useCallback(() => {
    setAddingArea(false);
    setNewAreaDraft('');
    setAddAreaError(null);
  }, []);

  const confirmAddArea = useCallback(() => {
    const t = newAreaDraft.trim();
    if (!isValidAreaLabel(t)) {
      setAddAreaError('Enter a name (not “New area”).');
      return;
    }
    const id = newWheelCategoryId();
    setPrefs((p) => {
      if (!p || p.categories.length >= WHEEL_MAX_CATEGORIES) return p;
      return {
        categories: [...p.categories, { id, label: t }],
        scoresById: { ...p.scoresById, [id]: 6 },
      };
    });
    setSelectedDimensionId(id);
    setAddingArea(false);
    setNewAreaDraft('');
    setAddAreaError(null);
  }, [newAreaDraft]);

  const onChangeNewAreaDraft = useCallback((text: string) => {
    setNewAreaDraft(text);
    setAddAreaError(null);
  }, []);

  const removeSelectedCategory = useCallback(() => {
    if (!selectedDimensionId) return;
    setPrefs((p) => {
      if (!p || p.categories.length <= WHEEL_MIN_CATEGORIES) return p;
      const id = selectedDimensionId;
      const categories = p.categories.filter((c) => c.id !== id);
      const scoresById = { ...p.scoresById };
      delete scoresById[id];
      return { categories, scoresById };
    });
    setWeeklyFocusDimensionId((f) =>
      f === selectedDimensionId ? null : f,
    );
    setSelectedDimensionId(null);
    setEditingLabelId(null);
    setEditingLabelValue('');
  }, [selectedDimensionId]);

  useEffect(() => {
    if (!prefs || !selectedDimensionId) return;
    if (!prefs.categories.some((c) => c.id === selectedDimensionId)) {
      setSelectedDimensionId(null);
    }
  }, [prefs, selectedDimensionId]);

  useEffect(() => {
    if (!editingLabelId) return;
    if (!prefs?.categories.some((c) => c.id === editingLabelId)) {
      setEditingLabelId(null);
      setEditingLabelValue('');
    }
  }, [prefs, editingLabelId]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => {
      const next = !prev;
      if (next) {
        setSelectedDimensionId(null);
        setEditingLabelId(null);
        setEditingLabelValue('');
        setAddingArea(false);
        setNewAreaDraft('');
        setAddAreaError(null);
      } else {
        setSliderActiveId(null);
      }
      return next;
    });
  }, []);

  const selectedDimension = dimensions.find(
    (d) => d.id === selectedDimensionId,
  );
  const selectedDetail =
    selectedDimensionId != null
      ? getLifeWheelDimensionDetail(selectedDimensionId)
      : undefined;
  const insightText = selectedDetail?.insight ?? '';

  const lifeWheelDescription = isEditMode
    ? 'Adjust scores with the sliders — the chart updates as you go. Tap Done when finished.'
    : copy.lifeWheel.description;

  const canAddCategory =
    prefs != null && prefs.categories.length < WHEEL_MAX_CATEGORIES;
  const canRemoveCategory =
    prefs != null && prefs.categories.length > WHEEL_MIN_CATEGORIES;

  const editToggle = (
    <Pressable
      onPress={toggleEditMode}
      hitSlop={8}
      style={({ pressed }) => [styles.editToggle, pressed && { opacity: 0.75 }]}
      accessibilityRole="button"
      accessibilityLabel={isEditMode ? 'Done editing wheel' : 'Edit wheel scores'}
    >
      <Text style={styles.editToggleLabel}>
        {isEditMode ? 'Done' : 'Edit wheel'}
      </Text>
    </Pressable>
  );

  if (!prefs) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={theme.colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            maxWidth: contentMaxWidth,
            paddingBottom: theme.spacing.xxl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeaderTitleRow title="Life wheel">
          <Text style={styles.pageSubtitle}>
            {isEditMode
              ? 'Tune each area from 0–10. Your changes stay on this device until you leave the app.'
              : 'Use the list below the wheel to choose an area — colors match the chart. Tap the pencil to rename.'}
        </Text>
        </ScreenHeaderTitleRow>

        <View style={styles.sectionGap} />

        <LifeWheelSectionCard
          eyebrow={copy.lifeWheel.eyebrow}
          title={copy.lifeWheel.title}
          description={lifeWheelDescription}
          right={editToggle}
        >
          {isEditMode ? (
            <Animated.View
              key="edit"
              entering={FadeIn.duration(220)}
              style={styles.editBlock}
            >
              <View pointerEvents="none" style={styles.wheelNonInteractive}>
                <LifeWheelRadar
                  dimensions={dimensions}
                  selectedId={null}
                  onSelectDimension={() => {}}
                  highlightedSegmentId={sliderActiveId}
                />
              </View>
              <LifeWheelScoreEditor
                dimensions={dimensions}
                onChangeValue={updateDimensionValue}
                onActiveSliderChange={setSliderActiveId}
              />
            </Animated.View>
          ) : (
            <Animated.View key="view" entering={FadeIn.duration(220)}>
              <View
                style={[
                  styles.wheelLayout,
                  isWide && styles.wheelLayoutWide,
                ]}
              >
                {isWide ? (
                  <>
                    <View style={styles.wheelChartColumn}>
                      <LifeWheelRadar
                        dimensions={dimensions}
                        selectedId={selectedDimensionId}
                        onSelectDimension={setSelectedDimensionId}
                        highlightedSegmentId={selectedDimensionId}
                      />
                    </View>
                    <View style={styles.wheelListColumn}>
                      <LifeWheelCategoryList
                        dimensions={dimensions}
                        selectedId={selectedDimensionId}
                        onSelectDimension={setSelectedDimensionId}
                        editingLabelId={editingLabelId}
                        editingLabelValue={editingLabelValue}
                        onStartEditLabel={startEditLabel}
                        onChangeEditingLabel={setEditingLabelValue}
                        onCommitEditingLabel={commitEditingLabel}
                        canAddCategory={canAddCategory}
                        canRemoveCategory={canRemoveCategory}
                        onStartAddArea={startAddArea}
                        addingArea={addingArea}
                        newAreaDraft={newAreaDraft}
                        onChangeNewAreaDraft={onChangeNewAreaDraft}
                        onConfirmNewArea={confirmAddArea}
                        onCancelNewArea={cancelAddArea}
                        addAreaError={addAreaError}
                        onRemoveSelectedCategory={removeSelectedCategory}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.wheelChartColumn}>
                      <LifeWheelRadar
                        dimensions={dimensions}
                        selectedId={selectedDimensionId}
                        onSelectDimension={setSelectedDimensionId}
                        highlightedSegmentId={selectedDimensionId}
                      />
                    </View>
                    <LifeWheelCategoryList
                      dimensions={dimensions}
                      selectedId={selectedDimensionId}
                      onSelectDimension={setSelectedDimensionId}
                      editingLabelId={editingLabelId}
                      editingLabelValue={editingLabelValue}
                      onStartEditLabel={startEditLabel}
                      onChangeEditingLabel={setEditingLabelValue}
                      onCommitEditingLabel={commitEditingLabel}
                      canAddCategory={canAddCategory}
                      canRemoveCategory={canRemoveCategory}
                      onStartAddArea={startAddArea}
                      addingArea={addingArea}
                      newAreaDraft={newAreaDraft}
                      onChangeNewAreaDraft={onChangeNewAreaDraft}
                      onConfirmNewArea={confirmAddArea}
                      onCancelNewArea={cancelAddArea}
                      addAreaError={addAreaError}
                      onRemoveSelectedCategory={removeSelectedCategory}
                    />
                  </>
                )}
              </View>

              {selectedDimension != null ? (
                <Animated.View
                  key={selectedDimension.id}
                  entering={FadeIn.duration(280)}
                >
                  <LifeWheelDetailPanel
                    dimension={selectedDimension}
                    insight={insightText}
                    weeklyFocusDimensionId={weeklyFocusDimensionId}
                    onSetWeeklyFocus={() =>
                      setWeeklyFocusDimensionId(selectedDimension.id)
                    }
                  />
                </Animated.View>
              ) : (
                <Text style={styles.hint}>
                  Select a category in the list to see your score and a gentle
                  insight.
                </Text>
              )}
            </Animated.View>
          )}
        </LifeWheelSectionCard>

        {!isEditMode ? (
          <>
            <View style={styles.sectionGap} />
            <WheelYourFocusCard dimensions={dimensions} />
          </>
        ) : null}

        <View style={styles.sectionGap} />

        <SectionCard
          eyebrow={copy.reflection.eyebrow}
          title={copy.reflection.title}
          description={copy.reflection.description}
        >
          <WeeklyReflectionSection prompts={mockWeeklyReflectionPrompts} />
        </SectionCard>

        <View style={styles.sectionGap} />

        <SectionCard
          eyebrow={copy.intention.eyebrow}
          title={copy.intention.title}
          description={copy.intention.description}
        >
          <WeeklyIntentionSection
            dropdownLabel={INTENTION_DROPDOWN_LABEL}
            themeOptions={mockWeeklyIntentionThemeOptions}
            initialTheme={mockWeeklyIntentionThemeDefault}
            outcomes={mockWeeklyOutcomeFields}
            alignmentPrompt={mockWeeklyIntentionExtraPrompt}
          />
        </SectionCard>

        <View style={styles.sectionGap} />

        <SectionCard
          eyebrow={copy.patterns.eyebrow}
          title={copy.patterns.title}
          description={copy.patterns.description}
        >
          <WeeklyPatternsSection sliders={mockWeeklyPatternSliders} />
        </SectionCard>
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
  },
  pageSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    maxWidth: 560,
    lineHeight: 23,
  },
  sectionGap: {
    height: theme.spacing.lg,
  },
  editToggle: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    marginTop: -2,
  },
  editToggleLabel: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    lineHeight: 17,
    color: theme.colors.accent,
    letterSpacing: 0.2,
  },
  editBlock: {
    gap: theme.spacing.md,
  },
  wheelNonInteractive: {
    alignSelf: 'center',
  },
  wheelLayout: {
    gap: theme.spacing.lg,
  },
  wheelLayoutWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  wheelChartColumn: {
    flexShrink: 0,
    width: '100%',
    alignItems: 'center',
  },
  wheelListColumn: {
    flex: 1,
    minWidth: 260,
  },
  hint: {
    ...theme.typography.caption,
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    opacity: 0.92,
  },
});
