import { useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeaderTitleRow } from '@/components/branding/ScreenHeaderTitleRow';
import { InputField } from '@/components/ui/InputField';
import { journalCopy } from '@/constants/journal';
import { theme } from '@/constants/theme';
import { useContentLayout } from '@/hooks/useContentLayout';

const FREEFORM_MIN_HEIGHT = 360;
/** Intention, I am, gratitude — softer when “Write freely” is focused (no hide, stable layout). */
const SURROUNDING_SECTION_OPACITY = 0.52;

/**
 * Daily journal — calm, page-like writing; persistence later.
 */
export function JournalScreen() {
  const { horizontalPadding } = useContentLayout();
  const contentMaxWidth =
    theme.layout.maxContentWidth + horizontalPadding * 2;

  const day = useMemo(() => new Date(), []);
  const dateLabel = useMemo(
    () =>
      day.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    [day],
  );

  const [intention, setIntention] = useState('');
  const [iam1, setIam1] = useState('');
  const [iam2, setIam2] = useState('');
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');
  const [freeform, setFreeform] = useState('');
  const [freeformFocused, setFreeformFocused] = useState(false);

  const onFreeformFocus = () => {
    setFreeformFocused(true);
  };

  const onFreeformBlur = () => {
    setFreeformFocused(false);
  };

  const c = journalCopy;

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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            opacity: freeformFocused ? SURROUNDING_SECTION_OPACITY : 1,
          }}
        >
          <ScreenHeaderTitleRow title="Journal">
            <View style={styles.headerMeta}>
              <Text style={styles.eyebrow}>{c.pageEyebrow}</Text>
              <Text style={styles.dateTitle}>{dateLabel}</Text>
            </View>
          </ScreenHeaderTitleRow>

          <View style={styles.sectionBlock}>
            <InputField
              label={c.intentionLabel}
              labelGap="relaxed"
              variant="soft"
              value={intention}
              onChangeText={setIntention}
              placeholder={c.intentionPlaceholder}
              minHeight={52}
            />
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>{c.iamLabel}</Text>
            <InputField
              variant="soft"
              value={iam1}
              onChangeText={setIam1}
              placeholder={c.iamPlaceholder1}
              minHeight={52}
            />
            <InputField
              variant="soft"
              value={iam2}
              onChangeText={setIam2}
              placeholder={c.iamPlaceholder2}
              minHeight={52}
            />
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>{c.gratitudeLabel}</Text>
            <InputField
              variant="soft"
              value={gratitude1}
              onChangeText={setGratitude1}
              placeholder={c.gratitudePlaceholder}
              minHeight={52}
            />
            <InputField
              variant="soft"
              value={gratitude2}
              onChangeText={setGratitude2}
              placeholder={c.gratitudePlaceholder}
              minHeight={52}
            />
            <InputField
              variant="soft"
              value={gratitude3}
              onChangeText={setGratitude3}
              placeholder={c.gratitudePlaceholder}
              minHeight={52}
            />
          </View>
        </View>

        <View
          style={[
            styles.freeformSection,
            freeformFocused && styles.freeformSectionFocused,
          ]}
        >
          <InputField
            label={c.freeformLabel}
            labelGap="relaxed"
            variant="soft"
            value={freeform}
            onChangeText={setFreeform}
            placeholder={c.freeformPlaceholder}
            multiline
            scrollEnabled
            minHeight={FREEFORM_MIN_HEIGHT}
            onFocus={onFreeformFocus}
            onBlur={onFreeformBlur}
            style={[
              styles.freeformInput,
              freeformFocused && styles.freeformInputFocused,
            ]}
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
  scrollContent: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: theme.spacing.md,
  },
  headerMeta: {
    gap: theme.spacing.xs,
  },
  eyebrow: {
    ...theme.typography.eyebrow,
    color: theme.colors.accent,
    letterSpacing: 1.6,
    marginBottom: theme.spacing.xs,
  },
  dateTitle: {
    ...theme.typography.title,
    fontSize: 22,
    lineHeight: 28,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl + theme.spacing.xs,
    letterSpacing: -0.2,
  },
  sectionBlock: {
    marginBottom: theme.spacing.xxl + theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.bodyMedium,
    fontSize: 14,
    color: theme.colors.textMuted,
    letterSpacing: 0.2,
  },
  freeformSection: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: 'rgba(255, 252, 250, 0.65)',
  },
  freeformSectionFocused: {
    backgroundColor: 'rgba(255, 252, 250, 0.94)',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  freeformInput: {
    lineHeight: 24,
    fontSize: 16,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  freeformInputFocused: {
    borderColor: 'rgba(196, 165, 154, 0.55)',
    backgroundColor: '#FFFCFA',
  },
});
