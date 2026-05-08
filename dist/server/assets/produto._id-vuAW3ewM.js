import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { a as ProductPlaceholder, P as ProductCard } from "./ProductCard-BHyNs7-M.js";
import { e as Route, f as useCart, B as Button } from "./router-jv7vIj3S.js";
import { ArrowLeft, BadgeDollarSign, Check, Plus } from "lucide-react";
import { toast } from "sonner";
import "framer-motion";
import "react";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "zod";
import "@tanstack/zod-adapter";
function ProductDetail() {
  const {
    product,
    related,
    categories
  } = Route.useLoaderData();
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label ?? "";
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const inCart = useCart((s) => s.items.some((i) => i.id === product.id));
  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      categoryLabel
    });
    toast.success("Adicionado ao orçamento", {
      description: product.name,
      action: {
        label: "Ver",
        onClick: () => setOpen(true)
      }
    });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(Link, { to: "/produtos", search: {
      categoria: product.category
    }, className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Voltar para ",
      categoryLabel
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: product.image ? /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "aspect-square w-full rounded-2xl object-cover border border-border" }) : /* @__PURE__ */ jsx(ProductPlaceholder, { category: product.category, iconSize: 160, className: "aspect-square" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: categoryLabel }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-balance", children: product.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-muted-foreground", children: product.description }),
        product.monthlyRent && /* @__PURE__ */ jsxs("div", { className: "mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-muted/40 px-5 py-3", children: [
          /* @__PURE__ */ jsx(BadgeDollarSign, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Locação mensal" }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-extrabold tracking-tight", children: [
              "R$",
              " ",
              product.monthlyRent.toLocaleString("pt-BR", {
                maximumFractionDigits: 0
              }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
                " ",
                "/ mês"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(Button, { size: "lg", onClick: handleAdd, className: "w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto", children: inCart ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Check, { className: "mr-1.5 h-4 w-4" }),
          "Adicionar mais 1 ao orçamento"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          "Adicionar à lista de locação"
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: "Especificações técnicas" }),
          /* @__PURE__ */ jsx("dl", { className: "mt-4 divide-y divide-border rounded-2xl border border-border bg-card", children: product.specs.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 px-5 py-3", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm text-muted-foreground", children: s.label }),
            /* @__PURE__ */ jsx("dd", { className: "text-sm font-semibold", children: s.value })
          ] }, s.label)) })
        ] })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold tracking-tight sm:text-3xl", children: "Equipamentos da mesma linha" }),
        /* @__PURE__ */ jsx(Link, { to: "/produtos", search: {
          categoria: product.category
        }, className: "hidden text-sm font-semibold text-primary hover:underline sm:inline", children: "Ver tudo" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: related.slice(0, 3).map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  ProductDetail as component
};
