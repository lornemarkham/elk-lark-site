import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDefaultSeason, Season } from "../lib/season";

type SeasonCtx = {
  season: Season;
  setSeason: (s: Season) => void;
};

const Ctx = createContext<SeasonCtx | null>(null);

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<Season>(() => getDefaultSeason());

  // Load from session if present
  useEffect(() => {
    const saved = sessionStorage.getItem("season") as Season | null;
    if (saved) setSeason(saved);
  }, []);

  // Persist on change
  useEffect(() => {
    sessionStorage.setItem("season", season);
    // flip a class on <html> or a top container for CSS variable theming
    document.documentElement.classList.remove("season-winter", "season-summer");
    document.documentElement.classList.add(season === "winter" ? "season-winter" : "season-summer");
  }, [season]);

  const value = useMemo(() => ({ season, setSeason }), [season]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSeason(): SeasonCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSeason must be used within SeasonProvider");
  return ctx;
}
