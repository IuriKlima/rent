import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { c as cn, f as useCart, g as categories, B as Button } from "./router-jv7vIj3S.js";
import { Bike, Dumbbell, Activity, Footprints, ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
const ICONS = {
  evo: Dumbbell,
  select: Activity,
  "peso-livre": Dumbbell,
  cardio: Bike
};
const ALT_ICONS = {
  evo: Activity,
  select: Footprints,
  "peso-livre": Footprints,
  cardio: Footprints
};
function ProductPlaceholder({
  category,
  className,
  variant = "primary",
  iconSize = 96
}) {
  const IconMap = variant === "primary" ? ICONS : ALT_ICONS;
  const Icon = IconMap[category] || Dumbbell;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-secondary via-secondary to-black",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.07]",
            style: {
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Icon,
          {
            size: iconSize,
            strokeWidth: 1.25,
            className: "relative z-10 text-white/85"
          }
        )
      ]
    }
  );
}
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
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-3 sm:p-5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary line-clamp-1", children: categoryLabel }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 text-sm sm:text-lg font-bold tracking-tight line-clamp-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/produto/$id",
              params: { id: product.id },
              className: "hover:text-primary transition",
              children: product.name
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 hidden sm:block line-clamp-2 text-sm text-muted-foreground", children: product.shortDescription }),
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
  ProductCard as P,
  ProductPlaceholder as a
};
