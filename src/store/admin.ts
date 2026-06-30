import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  products as seedProducts,
  categories as seedCategories,
  type Product,
  type Category,
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
    patch: Partial<Product>,
  ) => void;
  toggleActive: (id: string) => void;
  addProduct: (p: Product) => void;
  addProductsBulk: (items: any[]) => Promise<number>;
  bulkUpdateProductsByCSV: (items: any[]) => Promise<{ updated: number, notFound: string[] }>;
  bulkUpdateProducts: (ids: string[], patch: any) => void;
  bulkRemoveProducts: (ids: string[]) => void;
  removeProduct: (id: string) => void;
  // categories
  addCategory: (c: Category) => Promise<void>;
  updateCategory: (slug: string, patch: Partial<Category>) => Promise<void>;
  removeCategory: (slug: string) => Promise<void>;
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
        try {
          // Paralelizar todas as queries para reduzir latência (~3x mais rápido)
          const [sessionResult, catsResult, prodsResult, configResult] = await Promise.all([
            supabase.auth.getSession(),
            supabase.from('rss_categories').select('*').order('name'),
            supabase.from('rss_products').select('*').order('created_at', { ascending: false }),
            supabase.from('site_config').select('*').catch(() => ({ data: null })), // Handle se site_config não existir
          ]);

          const session = sessionResult.data?.session;
          const cats = catsResult.data;
          const prods = prodsResult.data;
          const config = configResult.data;
          
          if (catsResult.error) console.error("Cats error:", catsResult.error);
          if (prodsResult.error) console.error("Prods error:", prodsResult.error);
          if (configResult.error) console.warn("Config error (ignored):", configResult.error);

          console.log("INITIALIZE RESULTS:", { catsResult, prodsResult, configResult });

          const hero = config?.find((c: any) => c.key === 'hero')?.value?.image;

          if (session) {
            useQuotes.getState().fetchQuotes().catch(console.error);
          }

          set({ 
            loading: false,
            user: session?.user ?? null,
            unlocked: !!session?.user,
            categories: (cats?.map((c: any) => ({
              id: c.id,
              name: c.name,
              slug: slugify(c.name),
              image_url: c.image_url
            })) as Category[]) || [],
            products: (prods?.map((p: any) => ({
              id: p.id,
              sku: p.sku || '',
              title: p.title,
              category: p.category,
              subcategory: p.subcategory || '',
              description: p.description,
              imageUrl: p.imageUrl
            })) as Product[]) || [],
            heroImage: hero || undefined
          });
        } catch (error) {
          console.error("Failed to initialize admin store:", error);
          set({ loading: false }); // Garante que a splash saia da tela
        }

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
        const { error } = await supabase.from('rss_products').update(patch).eq('id', id);
        if (error) throw error;
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        }));
      },

      toggleActive: async (id) => {
        // no active in rss_products
      },

      addProduct: async (p) => {
        const id = `${p.category}-${slugify(p.title)}-${Date.now().toString(36)}`;
        const dbProduct = {
          id,
          sku: p.sku,
          title: p.title,
          category: p.category,
          subcategory: p.subcategory,
          description: p.description,
          imageUrl: p.imageUrl,
        };
        const { error } = await supabase.from('rss_products').insert(dbProduct);
        if (error) throw error;

        const newProduct: Product = { ...p, id };
        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      addProductsBulk: async (items) => {
        return 0; // disabled temporarily
      },


      bulkUpdateProductsByCSV: async (items) => {
        return { updated: 0, notFound: [] }; // disabled temporarily
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
        await supabase.from('rss_products').delete().eq('id', id);
        set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
      },

      addCategory: async (c) => {
        const slug = slugify(c.name);
        if (!slug) return;
        if (get().categories.some((x) => x.slug === slug)) return;
        
        const { error } = await supabase.from('rss_categories').insert({ name: c.name, image_url: c.image_url });
        if (error) {
          console.error("Error creating category:", error);
          return;
        }

        set((state) => ({
          categories: [...state.categories, { ...c, slug }],
        }));
      },

      updateCategory: async (slug, patch) => {
        const cat = get().categories.find(c => c.slug === slug);
        if (!cat) return;
        const { error } = await supabase.from('rss_categories').update(patch).eq('id', cat.id);
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
        const cat = get().categories.find(c => c.slug === slug);
        if (!cat) return;
        const { error } = await supabase.from('rss_categories').delete().eq('id', cat.id);
        if (error) {
          console.error("Error deleting category:", error);
          return;
        }
        set((state) => ({
          categories: state.categories.filter((c) => c.slug !== slug),
        }));
      },

      reset: () =>
        set({
          products: [],
          categories: [],
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
