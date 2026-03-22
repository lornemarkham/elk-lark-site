import type { CalendarEvent } from '@/types/calendar';

import { minutesFromTimelineStart } from '@/components/calendar/timelineLayout';

export function eventsOverlap(a: CalendarEvent, b: CalendarEvent): boolean {
  const a1 = minutesFromTimelineStart(a.start);
  const a2 = minutesFromTimelineStart(a.end);
  const b1 = minutesFromTimelineStart(b.start);
  const b2 = minutesFromTimelineStart(b.end);
  return a1 < b2 && b1 < a2;
}

export type EventLayout = { left: `${number}%`; width: `${number}%` };

type LayoutPct = { left: number; width: number };

function connectedComponents(events: CalendarEvent[]): CalendarEvent[][] {
  const visited = new Set<string>();
  const out: CalendarEvent[][] = [];

  const dfs = (id: string, acc: CalendarEvent[]) => {
    visited.add(id);
    const e = events.find((x) => x.id === id);
    if (!e) return;
    acc.push(e);
    for (const o of events) {
      if (visited.has(o.id)) continue;
      if (eventsOverlap(e, o)) dfs(o.id, acc);
    }
  };

  for (const e of events) {
    if (visited.has(e.id)) continue;
    const comp: CalendarEvent[] = [];
    dfs(e.id, comp);
    out.push(comp);
  }
  return out;
}

/**
 * Greedy lane coloring within each overlap cluster (interval graph).
 * Every event in a cluster gets a column; lane count = max concurrent overlaps in that cluster.
 */
function assignLanesInCluster(component: CalendarEvent[]): Map<string, { lane: number; lanes: number }> {
  const sorted = [...component].sort((a, b) => {
    const s = minutesFromTimelineStart(a.start) - minutesFromTimelineStart(b.start);
    if (s !== 0) return s;
    return minutesFromTimelineStart(a.end) - minutesFromTimelineStart(b.end);
  });

  const laneEnd: number[] = [];
  const result = new Map<string, { lane: number; lanes: number }>();

  for (const e of sorted) {
    const s = minutesFromTimelineStart(e.start);
    const end = minutesFromTimelineStart(e.end);
    let lane = laneEnd.findIndex((le) => le <= s);
    if (lane === -1) {
      lane = laneEnd.length;
      laneEnd.push(end);
    } else {
      laneEnd[lane] = end;
    }
    result.set(e.id, { lane, lanes: 0 });
  }

  const lanes = laneEnd.length;
  for (const [id, v] of result) {
    result.set(id, { lane: v.lane, lanes });
  }
  return result;
}

/**
 * Non-overlapping clusters: full width. Overlapping clusters: equal columns per lane.
 */
export function computeEventLayouts(events: CalendarEvent[]): Map<string, EventLayout> {
  const map = new Map<string, LayoutPct>();
  for (const e of events) {
    map.set(e.id, { left: 0, width: 100 });
  }

  const components = connectedComponents(events);

  for (const comp of components) {
    if (comp.length <= 1) continue;

    const lanesById = assignLanesInCluster(comp);
    const lanes = lanesById.get(comp[0].id)?.lanes ?? 1;
    if (lanes <= 1) continue;

    const gapPct = lanes > 1 ? 0.8 : 0;
    const usable = 100 - gapPct * (lanes - 1);
    const colW = usable / lanes;

    for (const e of comp) {
      const { lane } = lanesById.get(e.id) ?? { lane: 0, lanes };
      const left = lane * (colW + gapPct);
      map.set(e.id, { left, width: colW });
    }
  }

  const pct = (n: number): `${number}%` => `${n.toFixed(2)}%` as `${number}%`;
  const out = new Map<string, EventLayout>();
  map.forEach((v, id) => {
    out.set(id, { left: pct(v.left), width: pct(v.width) });
  });
  return out;
}
