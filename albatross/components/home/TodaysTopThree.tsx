import { useMemo } from 'react';

import { AssignTimeButton } from '@/components/home/AssignTimeButton';
import { ChecklistCard } from '@/components/home/ChecklistCard';
import { ProgressBadge } from '@/components/ui/ProgressBadge';
import { homeSections } from '@/constants/home';
import { useFocusStore } from '@/providers/FocusStore';

/**
 * Three fixed intentions; “Assign time” places a block on the shared Calendar (tap again to cycle 9 / 11 / 2).
 * Completion lives only on `topThreeItems` in FocusStore.
 */
export function TodaysTopThree() {
  const copy = homeSections.topThree;
  const {
    topThreeItems,
    addFocusFromTopThree,
    hasFocusForSlot,
    focusBlocks,
    setTopThreeCompleted,
  } = useFocusStore();

  const checklistItems = useMemo(
    () =>
      topThreeItems.map((item) => ({
        id: item.id,
        label: item.title,
        done: item.completed,
      })),
    [topThreeItems],
  );

  const completedCount = topThreeItems.filter((item) => item.completed).length;

  const onToggle = (id: string, done: boolean) => {
    setTopThreeCompleted(id, done);
  };

  return (
    <ChecklistCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      items={checklistItems}
      onToggle={onToggle}
      listVariant="inset"
      right={
        <ProgressBadge
          completed={completedCount}
          total={topThreeItems.length}
          variant="withLabel"
        />
      }
      renderRowAccessory={(item) => {
        const row = checklistItems.findIndex((i) => i.id === item.id);
        const block = focusBlocks.find((b) => b.id === `focus-slot-${row}`);
        const hintSlot = block ? block.slotIndex : row;
        return (
          <AssignTimeButton
            slotIndex={row}
            timeSlotIndexForHint={hintSlot}
            assigned={hasFocusForSlot(row)}
            onPress={() => addFocusFromTopThree(row)}
          />
        );
      }}
    />
  );
}
