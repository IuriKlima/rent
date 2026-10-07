import { create } from "zustand";
import type { CartItem } from "./cart";
import { supabase } from "@/lib/supabase";

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
  fetchQuotes: () => Promise<void>;
  addQuote: (q: Omit<Quote, "id" | "createdAt" | "status" | "totalItems">) => Promise<Quote>;
  updateStatus: (id: string, status: Quote["status"]) => Promise<void>;
  removeQuote: (id: string) => Promise<void>;
  clear: () => void;
};

export const useQuotes = create<QuotesState>()((set) => ({
  quotes: [],
  fetchQuotes: async () => {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    set({
      quotes:
        (data?.map((q) => ({
          id: q.id,
          createdAt: q.created_at,
          status: q.status,
          lead: {
            name: q.lead_name,
            condominio: q.lead_condominio,
            phone: q.lead_phone,
            email: q.lead_email,
          },
          items: q.items,
          totalItems: q.total_items,
        })) as Quote[]) || [],
    });
  },
  addQuote: async (q) => {
    const totalItems = q.items.reduce((acc, i) => acc + i.quantity, 0);
    const dbQuote = {
      lead_name: q.lead.name,
      lead_condominio: q.lead.condominio,
      lead_phone: q.lead.phone,
      lead_email: q.lead.email,
      items: q.items,
      total_items: totalItems,
      status: "novo",
    };

    const { data, error } = await supabase.from("quotes").insert(dbQuote).select().single();
    if (error) throw error;

    const newQuote: Quote = {
      id: data.id,
      createdAt: data.created_at,
      status: data.status,
      lead: q.lead,
      items: q.items,
      totalItems: totalItems,
    };

    set((state) => ({ quotes: [newQuote, ...state.quotes] }));
    return newQuote;
  },
  updateStatus: async (id, status) => {
    await supabase.from("quotes").update({ status }).eq("id", id);
    set((state) => ({
      quotes: state.quotes.map((q) => (q.id === id ? { ...q, status } : q)),
    }));
  },
  removeQuote: async (id) => {
    await supabase.from("quotes").delete().eq("id", id);
    set((state) => ({ quotes: state.quotes.filter((q) => q.id !== id) }));
  },
  clear: () => set({ quotes: [] }),
}));

// Remove cópias antigas de dados de contato persistidas no navegador.
if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem("rentfit-quotes");
  } catch {
    // O armazenamento pode estar desativado pelo navegador.
  }
}
