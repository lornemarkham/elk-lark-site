import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onToggle: (next: boolean) => void;
  /** Habits card: larger tap target, refined checkbox, centered alignment */
  variant?: 'default' | 'habits';
  /** Trailing control — does not toggle the row */
  accessory?: ReactNode;
}

export function CheckboxRow({
  label,
  checked,
  onToggle,
  variant = 'default',
  accessory,
}: CheckboxRowProps) {
  const isHabits = variant === 'habits';

  const main = (
    <Pressable
      onPress={() => onToggle(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={({ pressed }) => [
        styles.row,
        isHabits && styles.rowHabits,
        accessory ? styles.rowFlex : null,
        pressed ? { opacity: 0.9 } : null,
      ]}
    >
      <View
        style={[
          styles.box,
          checked && styles.boxChecked,
          isHabits && styles.boxAlignHabits,
        ]}
      >
        {checked ? <View style={styles.dot} /> : null}
      </View>
      <Text
        style={[
          styles.label,
          isHabits && styles.labelHabits,
          checked && styles.labelDone,
        ]}
        numberOfLines={3}
      >
        {label}
      </Text>
    </Pressable>
  );

  if (!accessory) {
    return main;
  }

  return (
    <View style={[styles.rowWithAccessory, isHabits && styles.rowHabitsOuter]}>
      {main}
      <View style={styles.accessory}>{accessory}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowWithAccessory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: theme.spacing.sm,
  },
  rowHabitsOuter: {
    minHeight: 52,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
  },
  rowFlex: {
    flex: 1,
    minWidth: 0,
  },
  rowHabits: {
    alignItems: 'center',
    minHeight: 52,
  },
  accessory: {
    flexShrink: 0,
    justifyContent: 'center',
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: theme.radii.sm,
    borderWidth: 1.5,
    borderColor: theme.colors.accentMuted,
    backgroundColor: theme.colors.surfaceElevated,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentSoft,
  },
  boxAlignHabits: {
    marginTop: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.accent,
  },
  label: {
    ...theme.typography.body,
    flex: 1,
    color: theme.colors.text,
  },
  labelHabits: {
    lineHeight: 22,
    paddingTop: 0,
  },
  labelDone: {
    color: theme.colors.textMuted,
    textDecorationLine: 'line-through',
    textDecorationColor: 'rgba(61, 56, 53, 0.32)',
    opacity: 0.9,
  },
});
