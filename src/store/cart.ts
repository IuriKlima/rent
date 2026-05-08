import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategorySlug } from "@/data/products";

export type CartItem = {
  id: string;
  name: string;
  category: CategorySlug;
  categoryLabel: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  totalCount: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      totalCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: "rentfit-cart" },
  ),
);

export const WHATSAPP_NUMBER = "5511924913426"; // TODO: substituir pelo número real

export type WhatsappLead = {
  name: string;
  condominio: string;
  phone: string;
  email: string;
};

export function buildWhatsappUrl(items: CartItem[], lead?: WhatsappLead): string {
  const itemsStr =
    items.length > 0
      ? items
          .map((i) => `${i.quantity}x ${i.name} (${i.categoryLabel})`)
          .join(", ")
      : "(nenhum item selecionado)";

  let msg = `Olá, sou síndico e tenho interesse em um projeto de locação para o meu condomínio com os seguintes equipamentos: ${itemsStr}.`;

  if (lead) {
    msg += `\n\n— Dados de contato —\nNome: ${lead.name}\nCondomínio: ${lead.condominio}\nTelefone: ${lead.phone}\nE-mail: ${lead.email}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function buildWhatsappContactUrl(message?: string): string {
  const text = message ?? "Olá! Gostaria de falar com um consultor da Rent Fitness sobre um projeto de academia para meu condomínio.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
