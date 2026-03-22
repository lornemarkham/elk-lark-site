import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { SectionCard } from '@/components/ui/SectionCard';
import { CheckboxRow } from '@/components/ui/CheckboxRow';
import { theme } from '@/constants/theme';

export type ChecklistItem = { id: string; label: string; done: boolean };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: ReactNode;
  items: ChecklistItem[];
  onToggle: (id: string, done: boolean) => void;
  /** `inset` = bordered group (Top Three); `habits` = premium habit list; `flat` = legacy tight stack */
  listVariant?: 'inset' | 'flat' | 'habits';
  /** Optional trailing control per row (e.g. assign to calendar) */
  renderRowAccessory?: (item: ChecklistItem) => ReactNode;
};

/**
 * Section with a list of checkbox rows.
 */
export function ChecklistCard({
  eyebrow,
  title,
  description,
  right,
  items,
  onToggle,
  listVariant = 'inset',
  renderRowAccessory,
}: Props) {
  const rowVariant = listVariant === 'habits' ? 'habits' : 'default';

  return (
    <SectionCard
      eyebrow={eyebrow}
      title={title}
      description={description}
      right={right}
    >
      <View
        style={
          listVariant === 'flat'
            ? styles.listFlat
            : styles.listGrouped
        }
      >
        {items.map((item, index) => (
          <View
            key={item.id}
            style={
              listVariant === 'habits' && index < items.length - 1
                ? styles.habitRowDivider
                : undefined
            }
          >
            <CheckboxRow
              label={item.label}
              checked={item.done}
              variant={rowVariant}
              onToggle={(done) => onToggle(item.id, done)}
              accessory={renderRowAccessory?.(item)}
            />
          </View>
        ))}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  listGrouped: {
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  listFlat: {
    gap: 2,
  },
  habitRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
});
