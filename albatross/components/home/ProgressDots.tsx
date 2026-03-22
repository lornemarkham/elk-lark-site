import { StyleSheet, View } from 'react-native';

import { theme } from '@/constants/theme';

interface ProgressDotsProps {
  total: number;
  activeIndex: number;
}

export function ProgressDots({ total, activeIndex }: ProgressDotsProps) {
  return (
    <View style={styles.row} accessibilityRole="progressbar">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <View
            key={i}
            style={[styles.dot, active ? styles.dotActive : styles.dotIdle]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },
  dot: {
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.dotInactive,
  },
  dotIdle: {
    width: 8,
    height: 8,
    opacity: 0.55,
  },
  dotActive: {
    width: 11,
    height: 11,
    backgroundColor: theme.colors.dotActive,
    opacity: 1,
  },
});
