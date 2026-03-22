import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon: ReactNode;
};

/**
 * Single-choice tile: icon, label, selected styling.
 */
export function ChoiceTile({ label, selected, onPress, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cell,
        selected && styles.cellSelected,
        pressed && !selected && { opacity: 0.92 },
      ]}
    >
      <View
        style={[styles.iconCircle, selected && styles.iconCircleSelected]}
      >
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flexBasis: '48%',
    flexGrow: 1,
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cellSelected: {
    borderColor: theme.colors.accentMuted,
    backgroundColor: theme.colors.accentSoft,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleSelected: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  label: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    color: theme.colors.text,
  },
});
