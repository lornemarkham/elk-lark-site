import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

import { topThreeMockItems } from '@/constants/home';
import type { FocusBlock, FocusTimeSlotIndex } from '@/types/focus';
import type { TopThreeItem } from '@/types/home';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DEFAULT_DURATION_MIN = 60;

function nextSlotIndex(slot: FocusTimeSlotIndex): FocusTimeSlotIndex {
  return (((slot + 1) % 3) as FocusTimeSlotIndex);
}

function runLayoutTransition() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

function focusBlocksFromTopThree(items: TopThreeItem[]): FocusBlock[] {
  return items
    .map((item, row) => {
      if (item.assignedSlot === null) return null;
      return {
        id: `focus-slot-${row}`,
        title: item.title,
        slotIndex: item.assignedSlot,
        duration: DEFAULT_DURATION_MIN,
      } satisfies FocusBlock;
    })
    .filter((b): b is FocusBlock => b !== null);
}

type FocusStoreValue = {
  /** Top Three lines — completion + placement live here only. */
  topThreeItems: TopThreeItem[];
  focusBlocks: FocusBlock[];
  /** Mock calendar event ids → completed (non–Top Three mock rows only). */
  mockEventCompleted: Record<string, boolean>;
  /** Place or cycle time for row `rowIndex` (9 / 11 / 2). */
  addFocusFromTopThree: (rowIndex: number) => void;
  hasFocusForSlot: (rowIndex: number) => boolean;
  cycleFocusTime: (blockId: string) => void;
  /** Toggle completion for the Top Three line linked to `focus-slot-{n}`. */
  toggleTopThreeCompletedByFocusBlockId: (blockId: string) => void;
  setTopThreeCompleted: (id: string, completed: boolean) => void;
  toggleMockEventCompleted: (eventId: string) => void;
};

const FocusStoreContext = createContext<FocusStoreValue | null>(null);

export function FocusStoreProvider({ children }: { children: ReactNode }) {
  const [topThreeItems, setTopThreeItems] = useState<TopThreeItem[]>(() => [
    ...topThreeMockItems,
  ]);
  const [mockEventCompleted, setMockEventCompleted] = useState<
    Record<string, boolean>
  >({});

  const focusBlocks = useMemo(
    () => focusBlocksFromTopThree(topThreeItems),
    [topThreeItems],
  );

  const addFocusFromTopThree = useCallback((rowIndex: number) => {
    const row = Math.min(Math.max(rowIndex, 0), 2) as FocusTimeSlotIndex;
    runLayoutTransition();
    setTopThreeItems((prev) => {
      const item = prev[row];
      if (!item) return prev;
      const nextSlot: FocusTimeSlotIndex =
        item.assignedSlot !== null
          ? nextSlotIndex(item.assignedSlot)
          : row;
      return prev.map((it, i) =>
        i === row ? { ...it, assignedSlot: nextSlot } : it,
      );
    });
  }, []);

  const cycleFocusTime = useCallback((blockId: string) => {
    const row = Number(blockId.replace('focus-slot-', ''));
    if (Number.isNaN(row) || row < 0 || row > 2) return;
    runLayoutTransition();
    setTopThreeItems((prev) => {
      const item = prev[row];
      if (!item || item.assignedSlot === null) return prev;
      return prev.map((it, i) =>
        i === row
          ? { ...it, assignedSlot: nextSlotIndex(it.assignedSlot!) }
          : it,
      );
    });
  }, []);

  const toggleTopThreeCompletedByFocusBlockId = useCallback(
    (blockId: string) => {
      const row = Number(blockId.replace('focus-slot-', ''));
      if (Number.isNaN(row) || row < 0 || row > 2) return;
      setTopThreeItems((prev) =>
        prev.map((it, i) =>
          i === row ? { ...it, completed: !it.completed } : it,
        ),
      );
    },
    [],
  );

  const setTopThreeCompleted = useCallback((id: string, completed: boolean) => {
    setTopThreeItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, completed } : it)),
    );
  }, []);

  const toggleMockEventCompleted = useCallback((eventId: string) => {
    setMockEventCompleted((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  }, []);

  const hasFocusForSlot = useCallback(
    (rowIndex: number) => {
      const row = Math.min(Math.max(rowIndex, 0), 2);
      return topThreeItems[row]?.assignedSlot !== null;
    },
    [topThreeItems],
  );

  const value = useMemo(
    () => ({
      topThreeItems,
      focusBlocks,
      mockEventCompleted,
      addFocusFromTopThree,
      hasFocusForSlot,
      cycleFocusTime,
      toggleTopThreeCompletedByFocusBlockId,
      setTopThreeCompleted,
      toggleMockEventCompleted,
    }),
    [
      topThreeItems,
      focusBlocks,
      mockEventCompleted,
      addFocusFromTopThree,
      hasFocusForSlot,
      cycleFocusTime,
      toggleTopThreeCompletedByFocusBlockId,
      setTopThreeCompleted,
      toggleMockEventCompleted,
    ],
  );

  return (
    <FocusStoreContext.Provider value={value}>{children}</FocusStoreContext.Provider>
  );
}

export function useFocusStore(): FocusStoreValue {
  const ctx = useContext(FocusStoreContext);
  if (!ctx) {
    throw new Error('useFocusStore must be used within FocusStoreProvider');
  }
  return ctx;
}
