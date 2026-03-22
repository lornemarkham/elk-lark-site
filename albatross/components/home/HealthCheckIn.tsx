import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  HealthMetricTile,
  healthMetricIcon,
} from '@/components/home/HealthMetricTile';
import { SectionCard } from '@/components/ui/SectionCard';
import { getHealthCheckInSnapshot } from '@/lib/data/healthCheckIn';
import { homeSections } from '@/constants/home';
import { theme } from '@/constants/theme';
import type { HealthMetricId } from '@/types/health';

type Props = {
  /** When true, section is preview-only (non-interactive, reduced emphasis). */
  comingSoon?: boolean;
};

export function HealthCheckIn({ comingSoon = true }: Props) {
  const copy = homeSections.health;
  const snapshot = useMemo(() => getHealthCheckInSnapshot(), []);
  const [selectedId, setSelectedId] = useState<HealthMetricId | null>(null);

  const iconColor = theme.colors.accent;

  const card = (
    <SectionCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={
        comingSoon
          ? `${copy.description}\n\n${copy.comingSoonNote}`
          : copy.description
      }
      right={
        comingSoon ? (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        ) : undefined
      }
    >
      <View style={styles.row}>
        {snapshot.map((m) => (
          <HealthMetricTile
            key={m.id}
            label={m.label}
            valueDisplay={m.valueDisplay}
            helperHint={m.helperHint}
            icon={healthMetricIcon(m.id, iconColor)}
            selected={!comingSoon && selectedId === m.id}
            onPress={() =>
              setSelectedId((prev) => (prev === m.id ? null : m.id))
            }
          />
        ))}
      </View>
    </SectionCard>
  );

  if (comingSoon) {
    return (
      <View
        style={styles.comingSoonShell}
        pointerEvents="none"
        accessible
        accessibilityLabel="Health Check-In. Preview only, coming soon."
        accessibilityState={{ disabled: true }}
      >
        {card}
      </View>
    );
  }

  return card;
}

const styles = StyleSheet.create({
  comingSoonShell: {
    opacity: 0.68,
  },
  comingSoonBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  comingSoonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: theme.colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
  },
});
