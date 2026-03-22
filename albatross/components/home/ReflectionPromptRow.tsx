import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  label: string;
  hint: string;
  selected: boolean;
  onPress: () => void;
};

/**
 * Tappable reflection line — not a checkbox; calm card-like row.
 */
export function ReflectionPromptRow({
  label,
  hint,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.wrap,
        selected && styles.wrapSelected,
        pressed && styles.wrapPressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  wrapSelected: {
    borderColor: theme.colors.accentMuted,
    backgroundColor: theme.colors.accentSoft,
  },
  wrapPressed: {
    opacity: 0.92,
  },
  label: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  hint: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
  },
});
