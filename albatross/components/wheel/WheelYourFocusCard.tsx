import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { buildYourFocusMessages } from '@/lib/wheel/wheelYourFocus';
import type { LifeWheelDimension } from '@/types/wheel';

type Props = {
  dimensions: LifeWheelDimension[];
};

/**
 * Surfaces the lowest spoke(s) as a concrete focus — connects scores to action.
 */
export function WheelYourFocusCard({ dimensions }: Props) {
  const msg = buildYourFocusMessages(dimensions);
  if (!msg) return null;

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Your Focus</Text>
      <Text style={styles.primary}>{msg.primary}</Text>
      {msg.secondary ? (
        <Text style={styles.secondary}>{msg.secondary}</Text>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  title: {
    ...theme.typography.title,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.text,
    letterSpacing: -0.2,
  },
  primary: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  secondary: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginTop: theme.spacing.xs,
    fontStyle: 'italic',
  },
});
