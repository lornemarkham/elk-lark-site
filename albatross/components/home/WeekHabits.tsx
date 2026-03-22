import { useState } from 'react';

import { ChecklistCard } from '@/components/home/ChecklistCard';
import { ProgressBadge } from '@/components/ui/ProgressBadge';
import { getWeekHabitsSnapshot } from '@/lib/data/weekHabits';
import { homeSections } from '@/constants/home';
import type { HabitItem } from '@/types/home';

export function WeekHabits() {
  const copy = homeSections.habits;
  const [habits, setHabits] = useState<HabitItem[]>(() =>
    getWeekHabitsSnapshot(),
  );

  const completedCount = habits.filter((h) => h.done).length;

  const onToggle = (id: string, done: boolean) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done } : h)),
    );
  };

  return (
    <ChecklistCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      items={habits}
      onToggle={onToggle}
      listVariant="habits"
      right={
        <ProgressBadge
          completed={completedCount}
          total={habits.length}
          variant="compact"
        />
      }
    />
  );
}
