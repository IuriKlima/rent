import { create } from "zustand";
import { products as seedProducts, type Product } from "@/data/products";

type AdminState = {
  products: Product[];
  unlocked: boolean;
  unlock: (password: string) => boolean;
  lock: () => void;
  updateProduct: (id: string, patch: Partial<Pick<Product, "name" | "monthlyRent" | "active">>) => void;
  toggleActive: (id: string) => void;
  reset: () => void;
};

const ADMIN_PASSWORD = "rentfit2026";

export const useAdminStore = create<AdminState>((set) => ({
  products: seedProducts.map((p) => ({ ...p, active: p.active ?? true })),
  unlocked: false,
  unlock: (password) => {
    if (password === ADMIN_PASSWORD) {
      set({ unlocked: true });
      return true;
    }
    return false;
  },
  lock: () => set({ unlocked: false }),
  updateProduct: (id, patch) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  toggleActive: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, active: !(p.active ?? true) } : p,
      ),
    })),
  reset: () =>
    set({
      products: seedProducts.map((p) => ({ ...p, active: p.active ?? true })),
    }),
}));
