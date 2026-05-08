import { U as jsxRuntimeExports } from "./worker-entry-B2NUglqf.js";
import { a as createLucideIcon, k as Route, l as useCart, L as Link, A as ArrowLeft, B as Button, n as Plus, t as toast } from "./router-CYVMDCYh.js";
import { P as ProductPlaceholder } from "./ProductPlaceholder-zyfmA8s4.js";
import { P as ProductCard } from "./ProductCard-DJxhKB4_.js";
import { C as Check } from "./check-BXtAEFCf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./arrow-right-BL5xqh9i.js";
const __iconNode = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
const BadgeDollarSign = createLucideIcon("badge-dollar-sign", __iconNode);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/produtos", search: {
      categoria: product.category
    }, className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Voltar para ",
      categoryLabel
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductPlaceholder, { category: product.category, iconSize: 160, className: "aspect-square" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: categoryLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-balance", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground", children: product.description }),
        product.monthlyRent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-muted/40 px-5 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeDollarSign, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Locação mensal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-extrabold tracking-tight", children: [
              "R$",
              " ",
              product.monthlyRent.toLocaleString("pt-BR", {
                maximumFractionDigits: 0
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
                " ",
                "/ mês"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: handleAdd, className: "w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto", children: inCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1.5 h-4 w-4" }),
          "Adicionar mais 1 ao orçamento"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          "Adicionar à lista de locação"
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: "Especificações técnicas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-4 divide-y divide-border rounded-2xl border border-border bg-card", children: product.specs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm text-muted-foreground", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-semibold", children: s.value })
          ] }, s.label)) })
        ] })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold tracking-tight sm:text-3xl", children: "Equipamentos da mesma linha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/produtos", search: {
          categoria: product.category
        }, className: "hidden text-sm font-semibold text-primary hover:underline sm:inline", children: "Ver tudo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: related.slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  ProductDetail as component
};
