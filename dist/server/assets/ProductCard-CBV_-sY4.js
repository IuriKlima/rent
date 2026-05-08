import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { f as useCart, g as categories, B as Button } from "./router-B-2FfIs3.js";
import { ArrowRight, Plus } from "lucide-react";
import { P as ProductPlaceholder } from "./ProductPlaceholder-DpNqRGM4.js";
import { toast } from "sonner";
import { motion } from "framer-motion";
function ProductCard({ product }) {
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label ?? product.category;
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
  return /* @__PURE__ */ jsxs(
    motion.article,
    {
      whileHover: { y: -4 },
      transition: { type: "spring", stiffness: 300, damping: 22 },
      className: "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl",
      children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/produto/$id",
            params: { id: product.id },
            className: "block",
            "aria-label": `Ver detalhes de ${product.name}`,
            children: product.image ? /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full overflow-hidden bg-muted", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.image,
                alt: product.name,
                className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              }
            ) }) : /* @__PURE__ */ jsx(ProductPlaceholder, { category: product.category, className: "rounded-none" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary", children: categoryLabel }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold tracking-tight", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/produto/$id",
              params: { id: product.id },
              className: "hover:text-primary transition",
              children: product.name
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: product.shortDescription }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                className: "rounded-full",
                children: /* @__PURE__ */ jsxs(Link, { to: "/produto/$id", params: { id: product.id }, children: [
                  "Detalhes ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-3.5 w-3.5" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                size: "sm",
                onClick: handleAdd,
                className: "ml-auto rounded-full bg-primary text-primary-foreground hover:opacity-90",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3.5 w-3.5" }),
                  "Orçar"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
