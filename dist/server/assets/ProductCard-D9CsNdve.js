import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { d as useCart, B as Button } from "./router-C1H9esa_.js";
import { ArrowRight, Plus } from "lucide-react";
import { P as ProductPlaceholder } from "./ProductPlaceholder-Qz7B8DxW.js";
import { toast } from "sonner";
import { motion } from "framer-motion";
function ProductCard({ product }) {
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const categoryLabel = product.category;
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
            "aria-label": `Ver detalhes de ${product.title}`,
            children: product.imageUrl ? /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full overflow-hidden bg-muted", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.title,
                className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              }
            ) }) : /* @__PURE__ */ jsx(ProductPlaceholder, { category: product.category, className: "rounded-none" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-3 sm:p-5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary line-clamp-1", children: categoryLabel }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 text-sm sm:text-lg font-bold tracking-tight line-clamp-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/produto/$id",
              params: { id: product.id },
              className: "hover:text-primary transition",
              children: product.title
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 hidden sm:block line-clamp-2 text-sm text-muted-foreground", children: product.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                className: "hidden rounded-full sm:inline-flex",
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
                className: "w-full sm:w-auto sm:ml-auto rounded-full bg-primary text-primary-foreground hover:opacity-90",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Orçar" }),
                  /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Add" })
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
