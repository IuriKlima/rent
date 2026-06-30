import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as ProductPlaceholder } from "./ProductPlaceholder-Qz7B8DxW.js";
import { f as Route, d as useCart, B as Button } from "./router-C1H9esa_.js";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { toast } from "sonner";
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
import "framer-motion";
import "zod";
import "@tanstack/zod-adapter";
function ProductDetail() {
  const {
    product
  } = Route.useLoaderData();
  const categoryLabel = product.category;
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const inCart = useCart((s) => s.items.some((i) => i.id === product.id));
  function handleAdd() {
    addItem({
      id: product.id,
      name: product.title,
      category: product.category,
      categoryLabel
    });
    toast.success("Adicionado ao orçamento", {
      description: product.title,
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
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: product.imageUrl ? /* @__PURE__ */ jsx("img", { src: product.imageUrl, alt: product.title, className: "aspect-square w-full rounded-2xl object-cover border border-border" }) : /* @__PURE__ */ jsx(ProductPlaceholder, { category: product.category, iconSize: 160, className: "aspect-square" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: categoryLabel }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-balance", children: product.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-muted-foreground", children: product.description }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(Button, { size: "lg", onClick: handleAdd, className: "w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto", children: inCart ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Check, { className: "mr-1.5 h-4 w-4" }),
          "Adicionar mais 1 ao orçamento"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          "Adicionar à lista de locação"
        ] }) }) })
      ] })
    ] }) })
  ] });
}
export {
  ProductDetail as component
};
