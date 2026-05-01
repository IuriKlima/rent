import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Visit = {
  path: string;
  at: string; // ISO timestamp
};

type AnalyticsState = {
  visits: Visit[];
  trackVisit: (path: string) => void;
  clear: () => void;
};

export const useAnalytics = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      visits: [],
      trackVisit: (path) => {
        const last = get().visits[0];
        // dedup: ignora se mesma rota foi registrada nos últimos 2 segundos
        if (last && last.path === path && Date.now() - new Date(last.at).getTime() < 2000) {
          return;
        }
        set((state) => ({
          visits: [{ path, at: new Date().toISOString() }, ...state.visits].slice(0, 1000),
        }));
      },
      clear: () => set({ visits: [] }),
    }),
    { name: "rentfit-analytics" },
  ),
);
