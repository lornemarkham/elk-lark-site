import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/constants/theme';

const SLOT_HINTS = ['9:00 AM', '11:00 AM', '2:00 PM'] as const;

type Props = {
  assigned: boolean;
  onPress: () => void;
  /** Row index 0–2 — default slot when placing for the first time. */
  slotIndex: number;
  /** Time slot 0–2 for the hint line (current block time when assigned; defaults to `slotIndex`). */
  timeSlotIndexForHint?: number;
};

/**
 * Explicit, tappable control for Top Three → Calendar (not row-tap).
 */
export function AssignTimeButton({
  assigned,
  onPress,
  slotIndex,
  timeSlotIndexForHint,
}: Props) {
  const hintIdx = Math.min(
    Math.max(timeSlotIndexForHint ?? slotIndex, 0),
    2,
  );
  const hint = SLOT_HINTS[hintIdx];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        assigned ? styles.pillPlaced : styles.pillDefault,
        pressed && { opacity: 0.88 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={
        assigned
          ? `Placed at ${hint} — tap to move to the next time slot`
          : `Assign time at ${hint} on calendar`
      }
      hitSlop={6}
    >
      <View style={styles.labelRow}>
        {assigned ? (
          <Ionicons
            name="checkmark-circle"
            size={14}
            color={theme.colors.dotActive}
            style={styles.placedIcon}
          />
        ) : null}
        <Text style={[styles.label, assigned && styles.labelPlaced]}>
          {assigned ? 'Placed' : 'Assign time'}
        </Text>
      </View>
      <Text style={[styles.hint, assigned && styles.hintPlaced]}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    minWidth: 96,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  pillDefault: {
    backgroundColor: theme.colors.surfaceElevated,
    borderColor: theme.colors.accentMuted,
  },
  pillPlaced: {
    backgroundColor: theme.colors.accentSoft,
    borderColor: 'rgba(184, 149, 138, 0.38)',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  placedIcon: {
    marginTop: 0,
  },
  label: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.text,
    textAlign: 'center',
  },
  labelPlaced: {
    color: theme.colors.textMuted,
  },
  hint: {
    ...theme.typography.caption,
    fontSize: 10,
    lineHeight: 12,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  hintPlaced: {
    color: 'rgba(130, 122, 116, 0.82)',
  },
});
