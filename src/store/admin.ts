import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  products as seedProducts,
  categories as seedCategories,
  type Product,
  type Category,
  type CategorySlug,
} from "@/data/products";

type AdminState = {
  products: Product[];
  categories: Category[];
  heroImage?: string;
  unlocked: boolean;
  unlock: (password: string) => boolean;
  lock: () => void;
  setHeroImage: (image: string) => void;
  clearHeroImage: () => void;
  // products
  updateProduct: (
    id: string,
    patch: Partial<Pick<Product, "name" | "monthlyRent" | "active" | "category" | "shortDescription" | "image">>,
  ) => void;
  toggleActive: (id: string) => void;
  addProduct: (
    p: Omit<Product, "id" | "specs" | "relatedIds"> & {
      specs?: Product["specs"];
      relatedIds?: string[];
      image?: string;
    },
  ) => void;
  addProductsBulk: (
    items: Array<Pick<Product, "name" | "category"> & Partial<Pick<Product, "shortDescription" | "monthlyRent" | "image">>>,
  ) => number;
  bulkUpdateProducts: (ids: string[], patch: Partial<Pick<Product, "active" | "category" | "monthlyRent">>) => void;
  bulkRemoveProducts: (ids: string[]) => void;
  removeProduct: (id: string) => void;
  // categories
  addCategory: (c: Omit<Category, "slug"> & { slug: string }) => void;
  updateCategory: (slug: CategorySlug, patch: Partial<Omit<Category, "slug">>) => void;
  removeCategory: (slug: CategorySlug) => void;
  // reset
  reset: () => void;
};

const ADMIN_PASSWORD = "rentfit2026";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: seedProducts.map((p) => ({ ...p, active: p.active ?? true })),
      categories: [...seedCategories],
      heroImage: undefined,
      unlocked: false,
      unlock: (password) => {
        if (password.trim() === ADMIN_PASSWORD) {
          set({ unlocked: true });
          return true;
        }
        return false;
      },
      lock: () => set({ unlocked: false }),
      setHeroImage: (image) => set({ heroImage: image }),
      clearHeroImage: () => set({ heroImage: undefined }),

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

      addProduct: (p) => {
        const id = `${p.category}-${slugify(p.name)}-${Date.now().toString(36)}`;
        const newProduct: Product = {
          id,
          name: p.name,
          category: p.category,
          shortDescription: p.shortDescription ?? "",
          description: p.description ?? "",
          specs: p.specs ?? [],
          relatedIds: p.relatedIds ?? [],
          active: p.active ?? true,
          monthlyRent: p.monthlyRent,
          image: p.image,
        };
        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      addProductsBulk: (items) => {
        const validCats = new Set(get().categories.map((c) => c.slug));
        const valid = items.filter((i) => i.name?.trim() && validCats.has(i.category));
        const newProducts: Product[] = valid.map((i, idx) => ({
          id: `${i.category}-${slugify(i.name)}-${Date.now().toString(36)}-${idx}`,
          name: i.name.trim(),
          category: i.category,
          shortDescription: i.shortDescription ?? "",
          description: "",
          specs: [],
          relatedIds: [],
          active: true,
          monthlyRent: i.monthlyRent,
          image: i.image,
        }));
        set((state) => ({ products: [...newProducts, ...state.products] }));
        return newProducts.length;
      },

      bulkUpdateProducts: (ids, patch) =>
        set((state) => ({
          products: state.products.map((p) => (ids.includes(p.id) ? { ...p, ...patch } : p)),
        })),

      bulkRemoveProducts: (ids) =>
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p.id)),
        })),

      removeProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

      addCategory: (c) => {
        const slug = (slugify(c.slug) || slugify(c.label)) as CategorySlug;
        if (!slug) return;
        if (get().categories.some((x) => x.slug === slug)) return;
        set((state) => ({
          categories: [
            ...state.categories,
            {
              slug,
              label: c.label,
              short: c.short,
              description: c.description,
            },
          ],
        }));
      },

      updateCategory: (slug, patch) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.slug === slug ? { ...c, ...patch } : c,
          ),
        })),

      removeCategory: (slug) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.slug !== slug),
          // não remove produtos automaticamente; apenas oculta da listagem por categoria
        })),

      reset: () =>
        set({
          products: seedProducts.map((p) => ({ ...p, active: p.active ?? true })),
          categories: [...seedCategories],
        }),
    }),
    {
      name: "rentfit-admin",
      // Não persiste o estado de "unlocked" — exige login a cada sessão
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        heroImage: state.heroImage,
      }),
    },
  ),
);
