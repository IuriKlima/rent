import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-B2NUglqf.js";
import { u as useAdminStore, t as toast, f as Label, I as Input, B as Button, X, T as Trash2, n as Plus } from "./router-CYVMDCYh.js";
import { T as Textarea } from "./textarea-hHBodB6x.js";
import { P as Pencil, D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-DCWODXLs.js";
import { C as Check } from "./check-BXtAEFCf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CategoriesPage() {
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    removeCategory
  } = useAdminStore();
  const [editingSlug, setEditingSlug] = reactExports.useState(null);
  const [draft, setDraft] = reactExports.useState({
    label: "",
    short: "",
    description: ""
  });
  function startEdit(slug) {
    const c = categories.find((x) => x.slug === slug);
    if (!c) return;
    setEditingSlug(slug);
    setDraft({
      label: c.label,
      short: c.short,
      description: c.description
    });
  }
  function save() {
    if (!editingSlug) return;
    updateCategory(editingSlug, draft);
    setEditingSlug(null);
    toast.success("Categoria atualizada");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Organização" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl", children: "Categorias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Linhas de produtos que aparecem no catálogo público." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NewCategoryDialog, { onSubmit: (c) => {
        addCategory(c);
        toast.success("Categoria criada");
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: categories.map((c) => {
      const count = products.filter((p) => p.category === c.slug).length;
      const isEditing = editingSlug === c.slug;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-5", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.label, onChange: (e) => setDraft({
            ...draft,
            label: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Subtítulo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.short, onChange: (e) => setDraft({
            ...draft,
            short: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: draft.description, onChange: (e) => setDraft({
            ...draft,
            description: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditingSlug(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: save, className: "bg-primary text-primary-foreground hover:opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-3.5 w-3.5" }),
            " Salvar"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary", children: c.short }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-bold tracking-tight", children: c.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
            count,
            " ",
            count === 1 ? "produto" : "produtos"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: c.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
          "slug: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-muted px-1", children: c.slug })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full", onClick: () => startEdit(c.slug), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1 h-3 w-3" }),
            " Editar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive", onClick: () => {
            if (count > 0) {
              if (!confirm(`Existem ${count} produto(s) nesta categoria. Excluir mesmo assim?`)) return;
            } else if (!confirm(`Excluir a categoria "${c.label}"?`)) {
              return;
            }
            removeCategory(c.slug);
            toast.message("Categoria removida");
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }) }, c.slug);
    }) })
  ] });
}
function NewCategoryDialog({
  onSubmit
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [label, setLabel] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [short, setShort] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  function reset() {
    setLabel("");
    setSlug("");
    setShort("");
    setDescription("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) reset();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full bg-primary text-primary-foreground hover:opacity-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Nova categoria"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova categoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "As categorias agrupam os produtos no catálogo." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nc-label", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nc-label", value: label, onChange: (e) => setLabel(e.target.value), placeholder: "Ex: Linha Premium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nc-slug", children: "Slug (opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nc-slug", value: slug, onChange: (e) => setSlug(e.target.value), placeholder: "linha-premium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nc-short", children: "Subtítulo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nc-short", value: short, onChange: (e) => setShort(e.target.value), placeholder: "Equipamentos top de linha" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nc-desc", children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "nc-desc", rows: 3, value: description, onChange: (e) => setDescription(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          if (!label.trim()) {
            toast.error("Informe o nome");
            return;
          }
          onSubmit({
            slug: slug.trim() || label.trim(),
            label: label.trim(),
            short: short.trim(),
            description: description.trim()
          });
          setOpen(false);
          reset();
        }, className: "bg-primary text-primary-foreground hover:opacity-90", children: "Criar" })
      ] })
    ] })
  ] });
}
export {
  CategoriesPage as component
};
