import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  products as seedProducts,
  categories as seedCategories,
  type Product,
  type Category,
  type CategorySlug,
} from "@/data/products";
import { supabase } from "@/lib/supabase";
import { useQuotes } from "./quotes";

type AdminState = {
  loading: boolean;
  products: Product[];
  categories: Category[];
  heroImage?: string;
  unlocked: boolean;
  user: any | null;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setHeroImage: (image: string) => void;
  clearHeroImage: () => void;
  // products
  updateProduct: (
    id: string,
    patch: Partial<Pick<Product, "name" | "monthlyRent" | "active" | "category" | "shortDescription" | "image" | "sku">>,
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
    items: Array<Pick<Product, "name" | "category"> & Partial<Pick<Product, "shortDescription" | "monthlyRent" | "image" | "sku">>>,
  ) => Promise<number>;
  bulkUpdateProductsByCSV: (
    items: Array<{ sku: string } & Partial<Pick<Product, "name" | "category" | "shortDescription" | "monthlyRent">>>,
  ) => Promise<{ updated: number, notFound: string[] }>;
  bulkUpdateProducts: (ids: string[], patch: Partial<Pick<Product, "active" | "category" | "monthlyRent">>) => void;
  bulkRemoveProducts: (ids: string[]) => void;
  removeProduct: (id: string) => void;
  // categories
  addCategory: (c: Omit<Category, "slug"> & { slug: string }) => Promise<void>;
  updateCategory: (slug: CategorySlug, patch: Partial<Omit<Category, "slug">>) => Promise<void>;
  removeCategory: (slug: CategorySlug) => Promise<void>;
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
      loading: true,
      products: [],
      categories: [],
      heroImage: undefined,
      unlocked: false,
      user: null,

      initialize: async () => {
        // Paralelizar todas as queries para reduzir latência (~3x mais rápido)
        const [sessionResult, catsResult, prodsResult, configResult] = await Promise.all([
          supabase.auth.getSession(),
          supabase.from('categories').select('*').order('label'),
          supabase.from('products').select('*').order('created_at', { ascending: false }),
          supabase.from('site_config').select('*'),
        ]);

        const session = sessionResult.data?.session;
        const cats = catsResult.data;
        const prods = prodsResult.data;
        const config = configResult.data;
        const hero = config?.find(c => c.key === 'hero')?.value?.image;

        if (session) {
          useQuotes.getState().fetchQuotes();
        }

        set({ 
          loading: false,
          user: session?.user ?? null,
          unlocked: !!session?.user,
          categories: (cats as any[]) || [],
          products: (prods?.map(p => ({
            id: p.id,
            sku: p.sku,
            name: p.name,
            category: p.category,
            shortDescription: p.short_description,
            description: p.description,
            specs: p.specs,
            relatedIds: p.related_ids,
            active: p.active,
            monthlyRent: p.monthly_rent,
            image: p.image
          })) as Product[]) || [],
          heroImage: hero || undefined
        });

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          set({ user: session?.user ?? null, unlocked: !!session?.user });
        });
      },

      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        set({ user: data.user, unlocked: true });
        return true;
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, unlocked: false });
      },

      setHeroImage: async (image) => {
        set({ heroImage: image });
        await supabase.from('site_config').upsert({ key: 'hero', value: { image } });
      },
      clearHeroImage: async () => {
        set({ heroImage: undefined });
        await supabase.from('site_config').upsert({ key: 'hero', value: { image: null } });
      },

      updateProduct: async (id, patch) => {
        // Snake case for DB
        const dbPatch: any = {};
        if (patch.name !== undefined) dbPatch.name = patch.name;
        if (patch.sku !== undefined) dbPatch.sku = patch.sku;
        if (patch.monthlyRent !== undefined) dbPatch.monthly_rent = patch.monthlyRent;
        if (patch.active !== undefined) dbPatch.active = patch.active;
        if (patch.category !== undefined) dbPatch.category = patch.category;
        if (patch.shortDescription !== undefined) dbPatch.short_description = patch.shortDescription;
        if (patch.image !== undefined) dbPatch.image = patch.image;

        const { error } = await supabase.from('products').update(dbPatch).eq('id', id);
        if (error) throw error;

        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        }));
      },

      toggleActive: async (id) => {
        const p = get().products.find(x => x.id === id);
        if (!p) return;
        const newActive = !(p.active ?? true);
        await supabase.from('products').update({ active: newActive }).eq('id', id);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, active: newActive } : p,
          ),
        }));
      },

      addProduct: async (p) => {
        const id = `${p.category}-${slugify(p.name)}-${Date.now().toString(36)}`;
        const dbProduct = {
          id,
          sku: p.sku,
          name: p.name,
          category: p.category,
          short_description: p.shortDescription ?? "",
          description: p.description ?? "",
          specs: p.specs ?? [],
          related_ids: p.relatedIds ?? [],
          active: p.active ?? true,
          monthly_rent: p.monthlyRent,
          image: p.image,
        };
        const { error } = await supabase.from('products').insert(dbProduct);
        if (error) throw error;

        const newProduct: Product = { 
          ...p, 
          id, 
          shortDescription: p.shortDescription ?? "", 
          description: p.description ?? "", 
          specs: p.specs ?? [], 
          relatedIds: p.relatedIds ?? [], 
          active: p.active ?? true,
          monthlyRent: p.monthlyRent,
          image: p.image
        };
        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      addProductsBulk: async (items) => {
        const validCats = new Set(get().categories.map((c) => c.slug));
        const valid = items.filter((i) => i.name?.trim() && validCats.has(i.category));
        
        const newProducts: Product[] = valid.map((i, idx) => ({
          id: `${i.category}-${slugify(i.name)}-${Date.now().toString(36)}-${idx}`,
          sku: i.sku,
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

        const dbProducts = newProducts.map((p) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category,
          short_description: p.shortDescription,
          description: p.description,
          specs: p.specs,
          related_ids: p.relatedIds,
          active: p.active,
          monthly_rent: p.monthlyRent,
          image: p.image,
        }));

        if (dbProducts.length > 0) {
          const { error } = await supabase.from('products').insert(dbProducts);
          if (error) {
            console.error("Error bulk creating products:", error);
            return 0;
          }
        }

        set((state) => ({ products: [...newProducts, ...state.products] }));
        return newProducts.length;
      },


      bulkUpdateProductsByCSV: async (items) => {
        let updated = 0;
        const notFound: string[] = [];
        
        for (const item of items) {
          const product = get().products.find(p => p.sku === item.sku);
          if (!product) {
            notFound.push(item.sku);
            continue;
          }

          const patch: any = {};
          if (item.name) patch.name = item.name;
          if (item.category) patch.category = item.category;
          if (item.shortDescription !== undefined) patch.short_description = item.shortDescription;
          if (item.monthlyRent !== undefined) patch.monthly_rent = item.monthlyRent;

          if (Object.keys(patch).length > 0) {
            await supabase.from('products').update(patch).eq('id', product.id);
            updated++;
          }
        }

        // reload state after bulk update
        if (updated > 0) {
          await get().initialize();
        }

        return { updated, notFound };
      },

      bulkUpdateProducts: (ids, patch) =>
        set((state) => ({
          products: state.products.map((p) => (ids.includes(p.id) ? { ...p, ...patch } : p)),
        })),

      bulkRemoveProducts: (ids) =>
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p.id)),
        })),

      removeProduct: async (id) => {
        await supabase.from('products').delete().eq('id', id);
        set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
      },

      addCategory: async (c) => {
        const slug = (slugify(c.slug) || slugify(c.label)) as CategorySlug;
        if (!slug) return;
        if (get().categories.some((x) => x.slug === slug)) return;
        
        const newCategory = {
          slug,
          label: c.label,
          short: c.short,
          description: c.description,
        };

        const { error } = await supabase.from('categories').insert(newCategory);
        if (error) {
          console.error("Error creating category:", error);
          return;
        }

        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: async (slug, patch) => {
        const { error } = await supabase.from('categories').update(patch).eq('slug', slug);
        if (error) {
          console.error("Error updating category:", error);
          return;
        }
        set((state) => ({
          categories: state.categories.map((c) =>
            c.slug === slug ? { ...c, ...patch } : c,
          ),
        }));
      },

      removeCategory: async (slug) => {
        const { error } = await supabase.from('categories').delete().eq('slug', slug);
        if (error) {
          console.error("Error deleting category:", error);
          return;
        }
        set((state) => ({
          categories: state.categories.filter((c) => c.slug !== slug),
          // não remove produtos automaticamente; apenas oculta da listagem por categoria
        }));
      },

      reset: () =>
        set({
          products: seedProducts.map((p) => ({ ...p, active: p.active ?? true })),
          categories: [...seedCategories],
        }),
    }),
    {
      name: "rentfit-admin",
      // Não persiste products/categories (sempre vêm frescos do Supabase)
      // Não persiste unlocked — exige login a cada sessão
      partialize: (state) => ({
        heroImage: state.heroImage,
      }),
    },
  ),
);
