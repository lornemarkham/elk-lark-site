import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/constants/theme';
import type { HealthMetricId } from '@/types/health';

type Props = {
  label: string;
  valueDisplay: string;
  helperHint?: string;
  icon: ReactNode;
  selected: boolean;
  onPress: () => void;
};

/**
 * Pressable metric card — snapshot-style, not a control.
 */
export function HealthMetricTile({
  label,
  valueDisplay,
  helperHint,
  icon,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.tile,
        selected && styles.tileSelected,
        pressed && styles.tilePressed,
      ]}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.value} numberOfLines={1}>
        {valueDisplay}
      </Text>
      {helperHint ? (
        <Text style={styles.helper} numberOfLines={2}>
          {helperHint}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function healthMetricIcon(metricId: HealthMetricId, color: string) {
  switch (metricId) {
    case 'sleep':
      return <Ionicons name="moon-outline" size={22} color={color} />;
    case 'activity':
      return <Ionicons name="walk-outline" size={22} color={color} />;
    case 'recovery':
      return <Ionicons name="heart-outline" size={22} color={color} />;
  }
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 96,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  tileSelected: {
    borderColor: theme.colors.accentMuted,
    backgroundColor: theme.colors.accentSoft,
  },
  tilePressed: {
    opacity: 0.92,
  },
  iconWrap: {
    marginBottom: 2,
  },
  label: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  value: {
    ...theme.typography.bodyMedium,
    fontFamily: 'Fraunces_500Medium',
    fontSize: 17,
    color: theme.colors.text,
    textAlign: 'center',
  },
  helper: {
    ...theme.typography.caption,
    fontSize: 11,
    lineHeight: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
});
