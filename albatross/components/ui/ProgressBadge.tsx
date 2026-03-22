import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  completed: number;
  total: number;
  /** `"withLabel"` → `2 / 3 complete`; `"compact"` → `2/4` (habits) */
  variant?: 'compact' | 'withLabel';
};

/**
 * Small pill for checklist progress (Top Three + Habits).
 */
export function ProgressBadge({
  completed,
  total,
  variant = 'compact',
}: Props) {
  const text =
    variant === 'withLabel'
      ? `${completed} / ${total} complete`
      : `${completed}/${total}`;

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentSoft,
  },
  text: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    color: theme.colors.text,
  },
});
