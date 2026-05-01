import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart";

export type LeadInfo = {
  name: string;
  condominio: string;
  phone: string;
  email: string;
};

export type Quote = {
  id: string;
  createdAt: string; // ISO
  status: "novo" | "em-contato" | "fechado" | "descartado";
  lead: LeadInfo;
  items: CartItem[];
  totalItems: number;
};

type QuotesState = {
  quotes: Quote[];
  addQuote: (q: Omit<Quote, "id" | "createdAt" | "status" | "totalItems">) => Quote;
  updateStatus: (id: string, status: Quote["status"]) => void;
  removeQuote: (id: string) => void;
  clear: () => void;
};

export const useQuotes = create<QuotesState>()(
  persist(
    (set) => ({
      quotes: [],
      addQuote: (q) => {
        const newQuote: Quote = {
          ...q,
          id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
          status: "novo",
          totalItems: q.items.reduce((acc, i) => acc + i.quantity, 0),
        };
        set((state) => ({ quotes: [newQuote, ...state.quotes] }));
        return newQuote;
      },
      updateStatus: (id, status) =>
        set((state) => ({
          quotes: state.quotes.map((q) => (q.id === id ? { ...q, status } : q)),
        })),
      removeQuote: (id) =>
        set((state) => ({ quotes: state.quotes.filter((q) => q.id !== id) })),
      clear: () => set({ quotes: [] }),
    }),
    { name: "rentfit-quotes" },
  ),
);
