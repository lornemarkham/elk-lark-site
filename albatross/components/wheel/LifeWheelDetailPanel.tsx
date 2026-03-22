import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/constants/theme';
import type { LifeWheelDimension } from '@/types/wheel';

type Props = {
  dimension: LifeWheelDimension;
  insight: string;
  /** Mock: which area is marked as this week’s focus */
  weeklyFocusDimensionId: string | null;
  onSetWeeklyFocus: () => void;
};

export function LifeWheelDetailPanel({
  dimension,
  insight,
  weeklyFocusDimensionId,
  onSetWeeklyFocus,
}: Props) {
  const isFocusedThisWeek = weeklyFocusDimensionId === dimension.id;

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>Reflection</Text>
      <View style={styles.titleRow}>
        <Text style={styles.categoryName}>{dimension.label}</Text>
        <View
          style={[
            styles.scorePill,
            { borderLeftWidth: 3, borderLeftColor: dimension.color },
          ]}
        >
          <Text style={styles.scoreValue}>{dimension.value}</Text>
          <Text style={styles.scoreOutOf}>/10</Text>
        </View>
      </View>
      <Text style={styles.insight}>{insight}</Text>
      <Pressable
        onPress={onSetWeeklyFocus}
        disabled={isFocusedThisWeek}
        style={({ pressed }) => [
          styles.cta,
          isFocusedThisWeek && styles.ctaDone,
          !isFocusedThisWeek && pressed && styles.ctaPressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: isFocusedThisWeek }}
        accessibilityLabel={
          isFocusedThisWeek
            ? `${dimension.label} is already this week’s focus`
            : 'Focus this area this week'
        }
      >
        {isFocusedThisWeek ? (
          <>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={theme.colors.dotActive}
              style={styles.ctaIcon}
            />
            <Text style={styles.ctaLabelDone}>This week’s focus</Text>
          </>
        ) : (
          <Text style={styles.ctaLabel}>Focus this area this week</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  eyebrow: {
    ...theme.typography.caption,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.55,
    textTransform: 'uppercase',
    color: theme.colors.textMuted,
    opacity: 0.92,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  categoryName: {
    ...theme.typography.title,
    fontSize: 20,
    lineHeight: 26,
    color: theme.colors.text,
    flex: 1,
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.accentSoft,
  },
  scoreValue: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 18,
    lineHeight: 22,
    color: theme.colors.text,
    fontVariant: ['tabular-nums'],
  },
  scoreOutOf: {
    ...theme.typography.caption,
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textMuted,
    marginLeft: 1,
  },
  insight: {
    ...theme.typography.body,
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(61, 56, 53, 0.88)',
    marginTop: theme.spacing.xs,
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.accentMuted,
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaDone: {
    backgroundColor: theme.colors.accentSoft,
    borderColor: theme.colors.border,
  },
  ctaIcon: {
    marginRight: 6,
  },
  ctaLabel: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    lineHeight: 17,
    color: theme.colors.text,
    letterSpacing: 0.2,
  },
  ctaLabelDone: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    lineHeight: 17,
    color: theme.colors.text,
    letterSpacing: 0.15,
  },
});
