import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  right,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        {eyebrow ? (
          <Text style={styles.eyebrow}>{eyebrow}</Text>
        ) : null}
        <Text style={styles.title}>{title}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  textBlock: { flex: 1, gap: theme.spacing.xs },
  right: { paddingTop: 1 },
  eyebrow: {
    ...theme.typography.eyebrow,
    color: theme.colors.accent,
    letterSpacing: 1.6,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    letterSpacing: -0.2,
  },
  description: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
  },
});
