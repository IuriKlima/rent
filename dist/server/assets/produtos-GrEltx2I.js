import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useAdminStore, R as Route, c as cn } from "./router-jv7vIj3S.js";
import { P as ProductCard } from "./ProductCard-BHyNs7-M.js";
import { motion } from "framer-motion";
import "react";
import "lucide-react";
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
import "sonner";
import "@tanstack/zod-adapter";
function ProductsPage() {
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const {
    categoria
  } = Route.useSearch();
  const filters = [{
    slug: "todos",
    label: "Todos"
  }, ...categories.map((c) => ({
    slug: c.slug,
    label: c.label
  }))];
  const filtered = categoria === "todos" ? products : products.filter((p) => p.category === categoria);
  const activeCategory = categories.find((c) => c.slug === categoria);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("header", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Catálogo" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl", children: activeCategory ? activeCategory.label : "Equipamentos premium" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: activeCategory ? activeCategory.description : "Equipamentos profissionais para todos os perfis de condomínio. Filtre por linha e monte seu projeto." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: filters.map((f) => {
      const active = f.slug === categoria;
      return /* @__PURE__ */ jsx(Link, { to: "/produtos", search: {
        categoria: f.slug
      }, className: cn("rounded-full border px-4 py-2 text-sm font-medium transition", active ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-background text-foreground/70 hover:border-foreground/30 hover:text-foreground"), children: f.label }, f.slug);
    }) }),
    /* @__PURE__ */ jsx(motion.div, { layout: true, className: "mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) }),
    filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "mt-16 text-center text-muted-foreground", children: "Nenhum equipamento nessa linha por enquanto." })
  ] });
}
export {
  ProductsPage as component
};
