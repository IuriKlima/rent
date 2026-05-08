import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouterState, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { ShoppingBag, X, Menu, Mail, Phone, MapPin, Minus, Plus, Trash2, ArrowLeft, MessageCircle } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { toast, Toaster as Toaster$1 } from "sonner";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
const appCss = "/assets/styles-BsXSb4rj.css";
const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map(
              (i) => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity }] };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) => set((state) => ({
        items: state.items.map((i) => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i).filter((i) => i.quantity > 0)
      })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      totalCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0)
    }),
    { name: "rentfit-cart" }
  )
);
const WHATSAPP_NUMBER = "5511999999999";
function buildWhatsappUrl(items, lead) {
  const itemsStr = items.length > 0 ? items.map((i) => `${i.quantity}x ${i.name} (${i.categoryLabel})`).join(", ") : "(nenhum item selecionado)";
  let msg = `Olá, sou síndico e tenho interesse em um projeto de locação para o meu condomínio com os seguintes equipamentos: ${itemsStr}.`;
  if (lead) {
    msg += `

— Dados de contato —
Nome: ${lead.name}
Condomínio: ${lead.condominio}
Telefone: ${lead.phone}
E-mail: ${lead.email}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
function buildWhatsappContactUrl(message) {
  const text = "Olá! Gostaria de falar com um consultor da Rent Fitness sobre um projeto de academia para meu condomínio.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logo = "/assets/logo-BYFxPJ6h.webp";
const navLinks = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Catálogo" },
  { to: "/contato", label: "Contato" }
];
function Header() {
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center gap-2 group", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Rent Fitness", className: "h-10 w-auto" }) }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1", children: navLinks.map((l) => {
        const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: l.to,
            className: cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active ? "bg-secondary text-secondary-foreground" : "text-foreground/70 hover:text-foreground hover:bg-muted"
            ),
            children: l.label
          },
          l.to
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "default",
            size: "sm",
            onClick: () => setOpen(true),
            className: "relative gap-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90",
            "aria-label": "Abrir orçamento",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Orçamento" }),
              count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground", children: count })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setMobileOpen((v) => !v),
            className: "md:hidden rounded-full p-2 hover:bg-muted",
            "aria-label": "Menu",
            children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    mobileOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-border/60 bg-background", children: /* @__PURE__ */ jsx("nav", { className: "mx-auto flex max-w-7xl flex-col px-4 py-2", children: navLinks.map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        onClick: () => setMobileOpen(false),
        className: "rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted",
        children: l.label
      },
      l.to
    )) }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "mt-24 bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Rent Fitness", className: "h-12 w-auto brightness-0 invert" }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-sm text-white/60", children: "Locação de academias profissionais para condomínios de alto padrão. Equipamentos premium, manutenção inclusa e atualização contínua." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold tracking-wide text-white/90 uppercase", children: "Navegação" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 text-sm text-white/60", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary transition", children: "Início" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produtos", className: "hover:text-primary transition", children: "Catálogo" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contato", className: "hover:text-primary transition", children: "Contato" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/admin", className: "hover:text-primary transition", children: "Admin" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold tracking-wide text-white/90 uppercase", children: "Contato" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-3 text-sm text-white/60", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-4 w-4 text-primary" }),
            "contato@rentfitness.com.br"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 h-4 w-4 text-primary" }),
            "+55 11 99999-9999"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 text-primary" }),
            "São Paulo, SP — Brasil"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Rent Fitness. Todos os direitos reservados."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "CNPJ XX.XXX.XXX/0001-XX" })
    ] })
  ] }) });
}
const supabaseUrl = "https://pchsvcaqltyqwmmqnpwg.supabase.co";
const supabaseAnonKey = "sb_publishable_Ie5VYWcARdJXVRr4tHxUhQ_jN-16aON";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const useQuotes = create()(
  persist(
    (set) => ({
      quotes: [],
      fetchQuotes: async () => {
        const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        set({
          quotes: data?.map((q) => ({
            id: q.id,
            createdAt: q.created_at,
            status: q.status,
            lead: {
              name: q.lead_name,
              condominio: q.lead_condominio,
              phone: q.lead_phone,
              email: q.lead_email
            },
            items: q.items,
            totalItems: q.total_items
          })) || []
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
          status: "novo"
        };
        const { data, error } = await supabase.from("quotes").insert(dbQuote).select().single();
        if (error) throw error;
        const newQuote = {
          id: data.id,
          createdAt: data.created_at,
          status: data.status,
          lead: q.lead,
          items: q.items,
          totalItems
        };
        set((state) => ({ quotes: [newQuote, ...state.quotes] }));
        return newQuote;
      },
      updateStatus: async (id, status) => {
        await supabase.from("quotes").update({ status }).eq("id", id);
        set((state) => ({
          quotes: state.quotes.map((q) => q.id === id ? { ...q, status } : q)
        }));
      },
      removeQuote: async (id) => {
        await supabase.from("quotes").delete().eq("id", id);
        set((state) => ({ quotes: state.quotes.filter((q) => q.id !== id) }));
      },
      clear: () => set({ quotes: [] })
    }),
    { name: "rentfit-quotes" }
  )
);
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  condominio: z.string().trim().min(2, "Informe o nome do condomínio.").max(120, "Nome do condomínio muito longo."),
  phone: z.string().trim().min(8, "Informe um telefone válido.").max(20, "Telefone inválido."),
  email: z.string().trim().email("E-mail inválido.").max(160, "E-mail muito longo.")
});
function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, clear } = useCart();
  const addQuote = useQuotes((s) => s.addQuote);
  const [step, setStep] = useState("items");
  const [lead, setLead] = useState({
    name: "",
    condominio: "",
    phone: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  function setField(key, value) {
    setLead((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: void 0 }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0];
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    const safeLead = parsed.data;
    addQuote({ lead: safeLead, items });
    const url = buildWhatsappUrl(items, safeLead);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Orçamento enviado!", {
      description: "Abrimos o WhatsApp em uma nova aba."
    });
    clear();
    setLead({ name: "", condominio: "", phone: "", email: "" });
    setErrors({});
    setStep("items");
    setOpen(false);
  }
  function handleOpenChange(open) {
    setOpen(open);
    if (!open) {
      setStep("items");
      setErrors({});
    }
  }
  return /* @__PURE__ */ jsx(Sheet, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(
    SheetContent,
    {
      side: "right",
      className: "flex w-full flex-col gap-0 sm:max-w-md p-0",
      children: [
        /* @__PURE__ */ jsxs(SheetHeader, { className: "border-b border-border px-6 py-5", children: [
          /* @__PURE__ */ jsxs(SheetTitle, { className: "flex items-center gap-2 text-xl font-extrabold tracking-tight", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 text-primary" }),
            step === "items" ? "Seu orçamento" : "Seus dados"
          ] }),
          /* @__PURE__ */ jsx(SheetDescription, { children: step === "items" ? totalItems > 0 ? `${totalItems} ${totalItems === 1 ? "item" : "itens"} selecionado${totalItems === 1 ? "" : "s"}.` : "Adicione equipamentos e envie sua cotação pelo WhatsApp." : "Para finalizar, informe os dados do responsável." })
        ] }),
        step === "items" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-7 w-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Seu orçamento está vazio." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "mt-4 rounded-full",
                onClick: () => setOpen(false),
                children: /* @__PURE__ */ jsx(Link, { to: "/produtos", children: "Ver catálogo" })
              }
            )
          ] }) : /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: items.map((item) => /* @__PURE__ */ jsxs(
            motion.li,
            {
              layout: true,
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.18 },
              className: "flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: item.name }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs uppercase tracking-wide text-muted-foreground", children: item.categoryLabel }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 inline-flex items-center gap-1 rounded-full border border-border bg-background p-1", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQty(item.id, item.quantity - 1),
                        className: "flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted",
                        "aria-label": "Diminuir quantidade",
                        children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "min-w-6 text-center text-xs font-semibold", children: item.quantity }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQty(item.id, item.quantity + 1),
                        className: "flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted",
                        "aria-label": "Aumentar quantidade",
                        children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(item.id),
                    className: "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                    "aria-label": "Remover item",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ]
            },
            item.id
          )) }) }) }),
          items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-border bg-background/95 px-6 py-5", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: () => setStep("lead"),
                className: "w-full rounded-full bg-primary text-primary-foreground hover:opacity-90",
                size: "lg",
                children: "Continuar"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: clear,
                className: "mt-3 w-full text-xs text-muted-foreground hover:text-foreground",
                children: "Limpar orçamento"
              }
            )
          ] })
        ] }),
        step === "lead" && /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-5", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setStep("items"),
                className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground",
                children: [
                  /* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                  " Voltar aos itens"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4", children: [
              /* @__PURE__ */ jsx(
                Field,
                {
                  id: "lead-name",
                  label: "Seu nome",
                  value: lead.name,
                  onChange: (v) => setField("name", v),
                  error: errors.name,
                  placeholder: "Ex: João Silva",
                  autoComplete: "name"
                }
              ),
              /* @__PURE__ */ jsx(
                Field,
                {
                  id: "lead-condominio",
                  label: "Condomínio",
                  value: lead.condominio,
                  onChange: (v) => setField("condominio", v),
                  error: errors.condominio,
                  placeholder: "Ex: Edifício Vista Park"
                }
              ),
              /* @__PURE__ */ jsx(
                Field,
                {
                  id: "lead-phone",
                  label: "Telefone / WhatsApp",
                  value: lead.phone,
                  onChange: (v) => setField("phone", v),
                  error: errors.phone,
                  placeholder: "(11) 99999-9999",
                  type: "tel",
                  autoComplete: "tel"
                }
              ),
              /* @__PURE__ */ jsx(
                Field,
                {
                  id: "lead-email",
                  label: "E-mail",
                  value: lead.email,
                  onChange: (v) => setField("email", v),
                  error: errors.email,
                  placeholder: "voce@email.com",
                  type: "email",
                  autoComplete: "email"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: "Ao enviar, abriremos o WhatsApp com sua cotação. Seus dados são usados apenas para retorno comercial." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background/95 px-6 py-5", children: /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              size: "lg",
              className: "w-full rounded-full bg-primary text-primary-foreground hover:opacity-90",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                "Enviar cotação pelo WhatsApp"
              ]
            }
          ) })
        ] })
      ]
    }
  ) });
}
function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: id, children: label }),
    /* @__PURE__ */ jsx(
      Input,
      {
        id,
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        autoComplete,
        className: cn(error && "border-destructive focus-visible:ring-destructive")
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const useAnalytics = create()(
  persist(
    (set, get) => ({
      visits: [],
      trackVisit: (path) => {
        const last = get().visits[0];
        if (last && last.path === path && Date.now() - new Date(last.at).getTime() < 2e3) {
          return;
        }
        set((state) => ({
          visits: [{ path, at: (/* @__PURE__ */ new Date()).toISOString() }, ...state.visits].slice(0, 1e3)
        }));
      },
      clear: () => set({ visits: [] })
    }),
    { name: "rentfit-analytics" }
  )
);
const categories = [
  {
    slug: "evo",
    label: "Linha Evo",
    short: "Evolução em biomecânica",
    description: "Equipamentos com curvas de carga progressivas e acabamento premium para academias de condomínios de alto padrão."
  },
  {
    slug: "select",
    label: "Linha Select",
    short: "Seleção profissional",
    description: "Estações compactas e versáteis pensadas para otimizar espaço sem abrir mão da performance profissional."
  },
  {
    slug: "peso-livre",
    label: "Peso Livre",
    short: "Treino livre e funcional",
    description: "Bancos, racks, halteres e anilhas olímpicas com revestimentos antiaderentes e acabamento high-end."
  },
  {
    slug: "cardio",
    label: "Cárdio",
    short: "Cardio silencioso e premium",
    description: "Esteiras, bikes, elípticos e remos com baixo ruído e consoles inteligentes — pensados para áreas comuns."
  }
];
const products = [
  // ===== EVO =====
  {
    id: "evo-leg-press",
    name: "Leg Press 45° Evo",
    category: "evo",
    shortDescription: "Leg Press 45° com curva biomecânica otimizada.",
    description: "O Leg Press 45° Evo entrega uma curva de carga linear com pegada ergonômica, apoio lombar reforçado e plataforma antiderrapante de grande área. Estrutura em aço carbono com pintura eletrostática preta fosca.",
    specs: [
      { label: "Carga máxima", value: "500 kg" },
      { label: "Dimensões", value: "210 × 110 × 150 cm" },
      { label: "Peso", value: "245 kg" },
      { label: "Acabamento", value: "Aço carbono, pintura epóxi preta" }
    ],
    relatedIds: ["evo-supino", "evo-extensora", "evo-pulley"],
    monthlyRent: 890
  },
  {
    id: "evo-supino",
    name: "Supino Reto Evo",
    category: "evo",
    shortDescription: "Supino reto com trajetória guiada e contrabalanço.",
    description: "Supino reto guiado com sistema de contrabalanço para descarga suave. Pegadas múltiplas em aço inox e estofado de alta densidade.",
    specs: [
      { label: "Carga máxima", value: "200 kg" },
      { label: "Dimensões", value: "180 × 160 × 130 cm" },
      { label: "Peso", value: "165 kg" }
    ],
    relatedIds: ["evo-leg-press", "evo-extensora", "evo-remada"],
    monthlyRent: 690
  },
  {
    id: "evo-extensora",
    name: "Cadeira Extensora Evo",
    category: "evo",
    shortDescription: "Extensora com came elíptica para resistência uniforme.",
    description: "Cadeira extensora com came elíptica que entrega resistência uniforme em toda a amplitude. Banco com regulagem rápida em 8 posições.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "120 × 90 × 150 cm" },
      { label: "Peso", value: "140 kg" }
    ],
    relatedIds: ["evo-leg-press", "evo-supino", "evo-pulley"],
    monthlyRent: 590
  },
  {
    id: "evo-pulley",
    name: "Pulley Frontal Evo",
    category: "evo",
    shortDescription: "Pulley frontal com polias rolamentadas premium.",
    description: "Pulley com polias rolamentadas, cabo de aço revestido e múltiplas posições de barra. Apoio de coxa ajustável.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "140 × 110 × 220 cm" },
      { label: "Peso", value: "180 kg" }
    ],
    relatedIds: ["evo-remada", "evo-supino", "evo-extensora"],
    monthlyRent: 620
  },
  {
    id: "evo-remada",
    name: "Remada Sentada Evo",
    category: "evo",
    shortDescription: "Remada sentada com apoio peitoral ajustável.",
    description: "Remada sentada com apoio peitoral ajustável e pegadas neutras/pronadas. Ideal para fortalecimento de dorsais.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "150 × 90 × 160 cm" },
      { label: "Peso", value: "170 kg" }
    ],
    relatedIds: ["evo-pulley", "evo-supino", "evo-leg-press"],
    monthlyRent: 610
  },
  // ===== SELECT =====
  {
    id: "select-crossover",
    name: "Crossover Select",
    category: "select",
    shortDescription: "Crossover dual ajustável de 12 alturas.",
    description: "Crossover com duas torres ajustáveis em 12 alturas, polias 1:1 para movimentos funcionais e pull-up bar superior.",
    specs: [
      { label: "Carga", value: "2× 90 kg em placas" },
      { label: "Dimensões", value: "320 × 130 × 230 cm" },
      { label: "Peso", value: "320 kg" }
    ],
    relatedIds: ["select-smith", "select-gluteo", "select-abdutor"],
    monthlyRent: 1290
  },
  {
    id: "select-smith",
    name: "Smith Machine Select",
    category: "select",
    shortDescription: "Smith Machine com trilhos lineares de baixo atrito.",
    description: "Smith machine com trilhos lineares de baixo atrito, sistema de travamento giratório e suportes de segurança ajustáveis.",
    specs: [
      { label: "Carga máxima", value: "300 kg" },
      { label: "Dimensões", value: "220 × 170 × 220 cm" },
      { label: "Peso", value: "280 kg" }
    ],
    relatedIds: ["select-crossover", "select-gluteo", "peso-rack"],
    monthlyRent: 990
  },
  {
    id: "select-gluteo",
    name: "Glúteo 4 em 1 Select",
    category: "select",
    shortDescription: "Estação para glúteos com 4 padrões de movimento.",
    description: "Estação dedicada para glúteos com 4 padrões de movimento e apoios estofados de alta densidade.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "150 × 110 × 140 cm" },
      { label: "Peso", value: "175 kg" }
    ],
    relatedIds: ["select-abdutor", "select-adutor", "select-crossover"],
    monthlyRent: 690
  },
  {
    id: "select-abdutor",
    name: "Abdutor Select",
    category: "select",
    shortDescription: "Abdutor com regulagem rápida de amplitude.",
    description: "Cadeira abdutora com regulagem rápida de amplitude, estofado anatômico e apoio lombar reforçado.",
    specs: [
      { label: "Carga", value: "80 kg em placas" },
      { label: "Dimensões", value: "120 × 100 × 150 cm" },
      { label: "Peso", value: "150 kg" }
    ],
    relatedIds: ["select-adutor", "select-gluteo", "select-crossover"],
    monthlyRent: 540
  },
  {
    id: "select-adutor",
    name: "Adutor Select",
    category: "select",
    shortDescription: "Adutor com curva de resistência otimizada.",
    description: "Cadeira adutora com curva de resistência otimizada, ideal para trabalho de adutores em academias premium.",
    specs: [
      { label: "Carga", value: "80 kg em placas" },
      { label: "Dimensões", value: "120 × 100 × 150 cm" },
      { label: "Peso", value: "150 kg" }
    ],
    relatedIds: ["select-abdutor", "select-gluteo", "select-crossover"],
    monthlyRent: 540
  },
  // ===== PESO LIVRE =====
  {
    id: "peso-banco",
    name: "Banco Olímpico Ajustável",
    category: "peso-livre",
    shortDescription: "Banco ajustável de 7 posições, plano a inclinado.",
    description: "Banco olímpico ajustável em 7 posições com estofado de alta densidade, base reforçada e roldanas de transporte.",
    specs: [
      { label: "Carga máxima", value: "350 kg" },
      { label: "Posições", value: "7 reclinações" },
      { label: "Peso", value: "45 kg" }
    ],
    relatedIds: ["peso-rack", "peso-halteres", "peso-anilhas"],
    monthlyRent: 290
  },
  {
    id: "peso-rack",
    name: "Rack de Agachamento Profissional",
    category: "peso-livre",
    shortDescription: "Rack com gaiola de segurança e barra fixa superior.",
    description: "Rack com gaiola de segurança, barra fixa superior, suportes em J e ganchos para anilhas. Estrutura 75 × 75 mm.",
    specs: [
      { label: "Carga máxima", value: "500 kg" },
      { label: "Dimensões", value: "180 × 140 × 230 cm" },
      { label: "Peso", value: "180 kg" }
    ],
    relatedIds: ["peso-banco", "peso-barra", "peso-anilhas"],
    monthlyRent: 690
  },
  {
    id: "peso-halteres",
    name: "Kit Halteres 1–50 kg",
    category: "peso-livre",
    shortDescription: "Conjunto completo emborrachado, 1 a 50 kg.",
    description: "Conjunto completo de halteres emborrachados de 1 kg a 50 kg, em pares, com suporte triplo em aço.",
    specs: [
      { label: "Faixa", value: "1 a 50 kg (pares)" },
      { label: "Material", value: "Borracha cromada" },
      { label: "Inclui", value: "Suporte triplo" }
    ],
    relatedIds: ["peso-banco", "peso-rack", "peso-anilhas"],
    monthlyRent: 1490
  },
  {
    id: "peso-anilhas",
    name: "Kit Anilhas Olímpicas",
    category: "peso-livre",
    shortDescription: "Anilhas olímpicas emborrachadas, 1,25 a 25 kg.",
    description: "Kit de anilhas olímpicas emborrachadas de 1,25 a 25 kg, com furo de 50 mm e cabos integrados.",
    specs: [
      { label: "Faixa", value: "1,25 a 25 kg" },
      { label: "Furo", value: "50 mm olímpico" },
      { label: "Acabamento", value: "Borracha preta" }
    ],
    relatedIds: ["peso-rack", "peso-barra", "peso-halteres"],
    monthlyRent: 590
  },
  {
    id: "peso-barra",
    name: "Barra Olímpica 20 kg",
    category: "peso-livre",
    shortDescription: "Barra olímpica 20 kg com rolamentos premium.",
    description: "Barra olímpica de 20 kg com rolamentos de agulha, knurling médio e capacidade dinâmica de 700 kg.",
    specs: [
      { label: "Peso", value: "20 kg" },
      { label: "Comprimento", value: "2,20 m" },
      { label: "Capacidade", value: "700 kg dinâmico" }
    ],
    relatedIds: ["peso-anilhas", "peso-rack", "peso-banco"],
    monthlyRent: 190
  },
  // ===== CÁRDIO =====
  {
    id: "cardio-esteira",
    name: "Esteira Pro Silent",
    category: "cardio",
    shortDescription: "Esteira profissional com tecnologia de baixo ruído.",
    description: 'Esteira profissional com motor AC 4 HP, tecnologia de amortecimento dinâmico e console touch 15". Operação ultra-silenciosa, ideal para áreas comuns de condomínios.',
    specs: [
      { label: "Motor", value: "4 HP AC contínuo" },
      { label: "Velocidade", value: "1 a 22 km/h" },
      { label: "Console", value: 'Touch 15" Android' },
      { label: "Carga máx.", value: "180 kg" }
    ],
    relatedIds: ["cardio-bike-vert", "cardio-eliptico", "cardio-remo"],
    monthlyRent: 1290
  },
  {
    id: "cardio-bike-vert",
    name: "Bike Vertical Pro",
    category: "cardio",
    shortDescription: "Bike vertical com resistência magnética silenciosa.",
    description: "Bike vertical com sistema magnético de 32 níveis, console com programas pré-definidos e suporte para tablet.",
    specs: [
      { label: "Resistência", value: "Magnética 32 níveis" },
      { label: "Roda", value: "13 kg" },
      { label: "Carga máx.", value: "150 kg" }
    ],
    relatedIds: ["cardio-bike-horiz", "cardio-esteira", "cardio-eliptico"],
    monthlyRent: 690
  },
  {
    id: "cardio-bike-horiz",
    name: "Bike Horizontal Confort",
    category: "cardio",
    shortDescription: "Bike horizontal com encosto ergonômico premium.",
    description: "Bike horizontal com encosto ergonômico, ajuste de banco assistido por gás e console com 12 programas.",
    specs: [
      { label: "Resistência", value: "Magnética 24 níveis" },
      { label: "Carga máx.", value: "150 kg" },
      { label: "Console", value: 'LCD 7"' }
    ],
    relatedIds: ["cardio-bike-vert", "cardio-esteira", "cardio-remo"],
    monthlyRent: 690
  },
  {
    id: "cardio-eliptico",
    name: "Elíptico Cross Pro",
    category: "cardio",
    shortDescription: "Elíptico com passada longa e movimento suave.",
    description: 'Elíptico com passada de 50 cm, sistema magnético de 24 níveis e console LCD 10". Movimento articulado para baixo impacto.',
    specs: [
      { label: "Passada", value: "50 cm" },
      { label: "Resistência", value: "Magnética 24 níveis" },
      { label: "Carga máx.", value: "150 kg" }
    ],
    relatedIds: ["cardio-esteira", "cardio-bike-vert", "cardio-remo"],
    monthlyRent: 890
  },
  {
    id: "cardio-remo",
    name: "Remo Ergômetro Air",
    category: "cardio",
    shortDescription: "Remo ergômetro com resistência por ar.",
    description: "Remo ergômetro com resistência por ar, monitor PM5 e estrutura dobrável. Treino completo de corpo inteiro.",
    specs: [
      { label: "Resistência", value: "Por ar (variável)" },
      { label: "Monitor", value: "PM5" },
      { label: "Carga máx.", value: "150 kg" }
    ],
    relatedIds: ["cardio-eliptico", "cardio-esteira", "cardio-bike-vert"],
    monthlyRent: 590
  }
];
function slugify(input) {
  return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}
const useAdminStore = create()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      heroImage: void 0,
      unlocked: false,
      user: null,
      initialize: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const { data: cats } = await supabase.from("categories").select("*").order("label");
        const { data: prods } = await supabase.from("products").select("*").order("created_at", { ascending: false });
        const { data: config } = await supabase.from("site_config").select("*");
        const hero = config?.find((c) => c.key === "hero")?.value?.image;
        if (session) {
          useQuotes.getState().fetchQuotes();
        }
        set({
          user: session?.user ?? null,
          unlocked: !!session?.user,
          categories: cats || [],
          products: prods?.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            shortDescription: p.short_description,
            description: p.description,
            specs: p.specs,
            relatedIds: p.related_ids,
            active: p.active,
            monthlyRent: p.monthly_rent,
            image: p.image
          })) || [],
          heroImage: hero || void 0
        });
        supabase.auth.onAuthStateChange((_event, session2) => {
          set({ user: session2?.user ?? null, unlocked: !!session2?.user });
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
        await supabase.from("site_config").upsert({ key: "hero", value: { image } });
      },
      clearHeroImage: async () => {
        set({ heroImage: void 0 });
        await supabase.from("site_config").upsert({ key: "hero", value: { image: null } });
      },
      updateProduct: async (id, patch) => {
        const dbPatch = {};
        if (patch.name) dbPatch.name = patch.name;
        if (patch.monthlyRent !== void 0) dbPatch.monthly_rent = patch.monthlyRent;
        if (patch.active !== void 0) dbPatch.active = patch.active;
        if (patch.category) dbPatch.category = patch.category;
        if (patch.shortDescription !== void 0) dbPatch.short_description = patch.shortDescription;
        if (patch.image !== void 0) dbPatch.image = patch.image;
        const { error } = await supabase.from("products").update(dbPatch).eq("id", id);
        if (error) throw error;
        set((state) => ({
          products: state.products.map((p) => p.id === id ? { ...p, ...patch } : p)
        }));
      },
      toggleActive: async (id) => {
        const p = get().products.find((x) => x.id === id);
        if (!p) return;
        const newActive = !(p.active ?? true);
        await supabase.from("products").update({ active: newActive }).eq("id", id);
        set((state) => ({
          products: state.products.map(
            (p2) => p2.id === id ? { ...p2, active: newActive } : p2
          )
        }));
      },
      addProduct: async (p) => {
        const id = `${p.category}-${slugify(p.name)}-${Date.now().toString(36)}`;
        const dbProduct = {
          id,
          name: p.name,
          category: p.category,
          short_description: p.shortDescription ?? "",
          description: p.description ?? "",
          specs: p.specs ?? [],
          related_ids: p.relatedIds ?? [],
          active: p.active ?? true,
          monthly_rent: p.monthlyRent,
          image: p.image
        };
        const { error } = await supabase.from("products").insert(dbProduct);
        if (error) throw error;
        const newProduct = {
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
        const newProducts = valid.map((i, idx) => ({
          id: `${i.category}-${slugify(i.name)}-${Date.now().toString(36)}-${idx}`,
          name: i.name.trim(),
          category: i.category,
          shortDescription: i.shortDescription ?? "",
          description: "",
          specs: [],
          relatedIds: [],
          active: true,
          monthlyRent: i.monthlyRent,
          image: i.image
        }));
        const dbProducts = newProducts.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          short_description: p.shortDescription,
          description: p.description,
          specs: p.specs,
          related_ids: p.relatedIds,
          active: p.active,
          monthly_rent: p.monthlyRent,
          image: p.image
        }));
        if (dbProducts.length > 0) {
          const { error } = await supabase.from("products").insert(dbProducts);
          if (error) {
            console.error("Error bulk creating products:", error);
            return 0;
          }
        }
        set((state) => ({ products: [...newProducts, ...state.products] }));
        return newProducts.length;
      },
      bulkUpdateProducts: (ids, patch) => set((state) => ({
        products: state.products.map((p) => ids.includes(p.id) ? { ...p, ...patch } : p)
      })),
      bulkRemoveProducts: (ids) => set((state) => ({
        products: state.products.filter((p) => !ids.includes(p.id))
      })),
      removeProduct: async (id) => {
        await supabase.from("products").delete().eq("id", id);
        set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
      },
      addCategory: async (c) => {
        const slug = slugify(c.slug) || slugify(c.label);
        if (!slug) return;
        if (get().categories.some((x) => x.slug === slug)) return;
        const newCategory = {
          slug,
          label: c.label,
          short: c.short,
          description: c.description
        };
        const { error } = await supabase.from("categories").insert(newCategory);
        if (error) {
          console.error("Error creating category:", error);
          return;
        }
        set((state) => ({
          categories: [...state.categories, newCategory]
        }));
      },
      updateCategory: async (slug, patch) => {
        const { error } = await supabase.from("categories").update(patch).eq("slug", slug);
        if (error) {
          console.error("Error updating category:", error);
          return;
        }
        set((state) => ({
          categories: state.categories.map(
            (c) => c.slug === slug ? { ...c, ...patch } : c
          )
        }));
      },
      removeCategory: async (slug) => {
        const { error } = await supabase.from("categories").delete().eq("slug", slug);
        if (error) {
          console.error("Error deleting category:", error);
          return;
        }
        set((state) => ({
          categories: state.categories.filter((c) => c.slug !== slug)
          // não remove produtos automaticamente; apenas oculta da listagem por categoria
        }));
      },
      reset: () => set({
        products: products.map((p) => ({ ...p, active: p.active ?? true })),
        categories: [...categories]
      })
    }),
    {
      name: "rentfit-admin",
      // Não persiste o estado de "unlocked" — exige login a cada sessão
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        heroImage: state.heroImage
      })
    }
  )
);
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Página não encontrada" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "A página que você procura não existe ou foi movida." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90",
        children: "Voltar para o início"
      }
    ) })
  ] }) });
}
const Route$9 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rent Fitness — Locação de academias premium para condomínios" },
      {
        name: "description",
        content: "Locação de equipamentos de academia profissional para condomínios de alto padrão. Manutenção inclusa, atualização contínua e custo fixo."
      },
      { name: "author", content: "Rent Fitness" },
      { property: "og:title", content: "Rent Fitness — Academias premium para condomínios" },
      {
        property: "og:description",
        content: "Eleve o padrão do seu condomínio com uma academia profissional sob locação."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const trackVisit = useAnalytics((s) => s.trackVisit);
  const initialize = useAdminStore((s) => s.initialize);
  const isAdmin = pathname.startsWith("/admin");
  useEffect(() => {
    initialize();
    if (!isAdmin) trackVisit(pathname);
  }, [pathname, isAdmin, trackVisit, initialize]);
  if (isAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(
        Toaster,
        {
          position: "top-right",
          toastOptions: {
            classNames: {
              toast: "glass !rounded-2xl !border-border !text-foreground !shadow-xl"
            }
          }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(CartDrawer, {}),
    /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-right",
        toastOptions: {
          classNames: {
            toast: "glass !rounded-2xl !border-border !text-foreground !shadow-xl"
          }
        }
      }
    )
  ] });
}
const $$splitComponentImporter$8 = () => import("./produtos-wwqAAM5y.js");
const categorySchema = z.enum(["evo", "select", "peso-livre", "cardio", "todos"]);
const searchSchema = z.object({
  categoria: fallback(categorySchema, "todos").default("todos")
});
const Route$8 = createFileRoute("/produtos")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [{
      title: "Catálogo de equipamentos — Rent Fitness"
    }, {
      name: "description",
      content: "Explore o catálogo completo de equipamentos para locação: linhas Evo, Select, Peso Livre e Cárdio."
    }, {
      property: "og:title",
      content: "Catálogo de equipamentos — Rent Fitness"
    }, {
      property: "og:description",
      content: "Linhas Evo, Select, Peso Livre e Cárdio para condomínios premium."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./contato-eND5dys0.js");
const Route$7 = createFileRoute("/contato")({
  head: () => ({
    meta: [{
      title: "Fale com um consultor — Rent Fitness"
    }, {
      name: "description",
      content: "Fale com um consultor especialista da Rent Fitness e receba uma proposta sob medida para o seu condomínio."
    }, {
      property: "og:title",
      content: "Fale com um consultor — Rent Fitness"
    }, {
      property: "og:description",
      content: "Atendimento dedicado para projetos de academia de condomínios premium."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin-C2wOtCAy.js");
const Route$6 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Painel administrativo — Rent Fitness"
    }, {
      name: "description",
      content: "Gestão completa do site Rent Fitness."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-7Ak-ixIf.js");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Rent Fitness — Academia premium sob locação para condomínios"
    }, {
      name: "description",
      content: "Eleve o padrão do seu condomínio com uma academia profissional. Equipamentos premium, manutenção inclusa e atualização contínua, com custo fixo mensal."
    }, {
      property: "og:title",
      content: "Rent Fitness — Academia premium sob locação"
    }, {
      property: "og:description",
      content: "Locação de academias profissionais para condomínios de alto padrão."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.index-Wh3NLjat.js");
const Route$4 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./produto._id-Boj7kTX-.js");
const $$splitErrorComponentImporter = () => import("./produto._id-D50mt_lS.js");
const $$splitNotFoundComponentImporter = () => import("./produto._id-Bbn5LAqA.js");
const Route$3 = createFileRoute("/produto/$id")({
  loader: async ({
    params
  }) => {
    const {
      data: p,
      error
    } = await supabase.from("products").select("*").eq("id", params.id).single();
    if (error || !p) throw notFound();
    const product = {
      id: p.id,
      name: p.name,
      category: p.category,
      shortDescription: p.short_description,
      description: p.description,
      specs: p.specs,
      relatedIds: p.related_ids,
      active: p.active,
      monthlyRent: p.monthly_rent,
      image: p.image
    };
    const {
      data: relatedData
    } = await supabase.from("products").select("*").in("id", product.relatedIds);
    const related = relatedData?.map((rp) => ({
      id: rp.id,
      name: rp.name,
      category: rp.category,
      shortDescription: rp.short_description,
      description: rp.description,
      specs: rp.specs,
      relatedIds: rp.related_ids,
      active: rp.active,
      monthlyRent: rp.monthly_rent,
      image: rp.image
    })) || [];
    const {
      data: cats
    } = await supabase.from("categories").select("*");
    return {
      product,
      related,
      categories: cats || []
    };
  },
  head: ({
    loaderData
  }) => {
    const product = loaderData?.product;
    const categories2 = loaderData?.categories;
    if (!product) {
      return {
        meta: [{
          title: "Produto não encontrado — Rent Fitness"
        }]
      };
    }
    const categoryLabel = categories2?.find((c) => c.slug === product.category)?.label ?? "";
    const title = `${product.name} — Rent Fitness`;
    const description = `${product.shortDescription} ${categoryLabel}.`;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.produtos-2OzN-2J6.js");
const Route$2 = createFileRoute("/admin/produtos")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.orcamentos-CeR-fTaP.js");
const Route$1 = createFileRoute("/admin/orcamentos")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.categorias-ih9L4okx.js");
const Route = createFileRoute("/admin/categorias")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ProdutosRoute = Route$8.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => Route$9
});
const ContatoRoute = Route$7.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$9
});
const AdminRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const AdminIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ProdutoIdRoute = Route$3.update({
  id: "/produto/$id",
  path: "/produto/$id",
  getParentRoute: () => Route$9
});
const AdminProdutosRoute = Route$2.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => AdminRoute
});
const AdminOrcamentosRoute = Route$1.update({
  id: "/orcamentos",
  path: "/orcamentos",
  getParentRoute: () => AdminRoute
});
const AdminCategoriasRoute = Route.update({
  id: "/categorias",
  path: "/categorias",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminCategoriasRoute,
  AdminOrcamentosRoute,
  AdminProdutosRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  ContatoRoute,
  ProdutosRoute,
  ProdutoIdRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Input as I,
  Label as L,
  Route$8 as R,
  Sheet as S,
  useQuotes as a,
  buildWhatsappContactUrl as b,
  cn as c,
  useAnalytics as d,
  Route$3 as e,
  useCart as f,
  categories as g,
  SheetContent as h,
  SheetHeader as i,
  SheetTitle as j,
  SheetDescription as k,
  buildWhatsappUrl as l,
  router as r,
  useAdminStore as u
};
