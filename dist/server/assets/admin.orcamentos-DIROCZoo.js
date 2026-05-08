import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-B2NUglqf.js";
import { a as createLucideIcon, h as useQuotes, I as Input, c as cn, B as Button, T as Trash2, t as toast, S as Sheet, K as SheetContent, N as SheetHeader, O as SheetTitle, Q as SheetDescription, P as Phone, M as Mail, d as MessageCircle, U as buildWhatsappUrl } from "./router-CYVMDCYh.js";
import { S as Search, f as Select, g as SelectTrigger, h as SelectValue, i as SelectContent, j as SelectItem } from "./select-p0Wwdexc.js";
import { F as FileText } from "./file-text-CmGkFKj5.js";
import { E as Eye } from "./eye-DrD4C9PH.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./check-BXtAEFCf.js";
const __iconNode = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
const STATUS_LABEL = {
  novo: "Novo",
  "em-contato": "Em contato",
  fechado: "Fechado",
  descartado: "Descartado"
};
const STATUS_STYLE = {
  novo: "bg-primary/10 text-primary",
  "em-contato": "bg-blue-500/10 text-blue-600",
  fechado: "bg-emerald-500/10 text-emerald-600",
  descartado: "bg-muted text-muted-foreground"
};
function QuotesPage() {
  const {
    quotes,
    updateStatus,
    removeQuote
  } = useQuotes();
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    return quotes.filter((q) => {
      const matchSearch = q.lead.name.toLowerCase().includes(search.toLowerCase()) || q.lead.condominio.toLowerCase().includes(search.toLowerCase()) || q.lead.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filter === "all" || q.status === filter;
      return matchSearch && matchStatus;
    });
  }, [quotes, search, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Pipeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl", children: "Orçamentos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Pedidos de cotação enviados pelo site. Total:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: quotes.length }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por nome, condomínio ou e-mail...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filter, onValueChange: setFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "sm:w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos" }),
          Object.keys(STATUS_LABEL).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABEL[s] }, s))
        ] })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium", children: "Nenhum orçamento por aqui." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Os pedidos enviados pelo site aparecem nessa lista." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-3", children: filtered.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: q.lead.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", STATUS_STYLE[q.status]), children: STATUS_LABEL[q.status] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
          " ",
          q.lead.condominio
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          q.totalItems,
          " item(ns) ·",
          " ",
          new Date(q.createdAt).toLocaleString("pt-BR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: q.status, onValueChange: (v) => updateStatus(q.id, v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(STATUS_LABEL).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABEL[s] }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full", onClick: () => setSelected(q), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-1 h-3.5 w-3.5" }),
          " Detalhes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive", onClick: () => {
          if (confirm("Excluir este orçamento?")) {
            removeQuote(q.id);
            toast.message("Orçamento excluído");
          }
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }) }, q.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!selected, onOpenChange: (open) => !open && setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "right", className: "w-full sm:max-w-md", children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: selected.lead.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { children: [
          "Recebido em ",
          new Date(selected.createdAt).toLocaleString("pt-BR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Contato" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            selected.lead.condominio
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${selected.lead.phone}`, className: "flex items-center gap-2 text-sm hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            selected.lead.phone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${selected.lead.email}`, className: "flex items-center gap-2 text-sm hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            selected.lead.email
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
            "Equipamentos solicitados (",
            selected.totalItems,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border rounded-2xl border border-border bg-card", children: selected.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: it.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: it.categoryLabel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold", children: [
              it.quantity,
              "x"
            ] })
          ] }, it.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: buildWhatsappUrl(selected.items, selected.lead), target: "_blank", rel: "noopener noreferrer", className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          "Reenviar pelo WhatsApp"
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  QuotesPage as component
};
