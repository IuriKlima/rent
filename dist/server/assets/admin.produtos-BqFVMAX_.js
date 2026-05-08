import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { c as cn, u as useAdminStore, I as Input, B as Button, L as Label } from "./router-DfdIkmYe.js";
import { T as Textarea } from "./textarea-YReb0JVK.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BjWlbaQW.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-Db52EiIR.js";
import { ChevronRight, Check, Circle, Search, ChevronDown, ImagePlus, X, Pencil, Trash2, ArrowRightLeft, FileSpreadsheet, Plus } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { toast } from "sonner";
import "@tanstack/react-router";
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
import "@radix-ui/react-select";
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function ProductsPage() {
  const {
    products,
    categories,
    updateProduct,
    toggleActive,
    addProduct,
    addProductsBulk,
    bulkUpdateProductsByCSV,
    bulkUpdateProducts,
    bulkRemoveProducts,
    removeProduct
  } = useAdminStore();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "all" || p.category === filterCat;
      return matchSearch && matchCat;
    });
  }, [products, search, filterCat]);
  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id));
    }
  };
  const toggleSelect = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };
  async function handleImageUpload(id, file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Arquivo inválido");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result;
      updateProduct(id, {
        image: base64
      });
      toast.success("Imagem atualizada");
    };
    reader.readAsDataURL(file);
  }
  const [editingId, setEditingId] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [draftSku, setDraftSku] = useState("");
  const [draftRent, setDraftRent] = useState("");
  function startEdit(id, name, sku, rent) {
    setEditingId(id);
    setDraftName(name);
    setDraftSku(sku ?? "");
    setDraftRent(rent?.toString() ?? "");
  }
  function cancelEdit() {
    setEditingId(null);
  }
  function saveEdit(id) {
    const rent = draftRent ? Number(draftRent) : void 0;
    updateProduct(id, {
      name: draftName.trim() || void 0,
      sku: draftSku.trim() || void 0,
      monthlyRent: Number.isFinite(rent) ? rent : void 0
    });
    cancelEdit();
    toast.success("Produto atualizado");
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Catálogo" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl", children: "Produtos" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Gerencie os equipamentos disponíveis para locação. Total:",
          " ",
          /* @__PURE__ */ jsx("strong", { children: products.length }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(BulkUpdateDialog, { categories, onSubmit: async (items) => {
          const res = await bulkUpdateProductsByCSV(items);
          if (res.updated > 0) {
            toast.success(`${res.updated} produto(s) atualizado(s) em massa`);
          }
          if (res.notFound.length > 0) {
            toast.error(`${res.notFound.length} SKU(s) não encontrado(s)`);
          }
        } }),
        /* @__PURE__ */ jsx(BulkCreateDialog, { categories, onSubmit: async (items) => {
          const created = await addProductsBulk(items);
          toast.success(`${created} produto(s) criado(s) em massa`);
        } }),
        /* @__PURE__ */ jsx(SingleCreateDialog, { categories, onSubmit: async (p) => {
          await addProduct({
            name: p.name,
            sku: p.sku,
            category: p.category,
            shortDescription: p.shortDescription ?? "",
            description: p.description ?? "",
            monthlyRent: p.monthlyRent
          });
          toast.success("Produto criado");
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { placeholder: "Buscar por nome...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: filterCat, onValueChange: setFilterCat, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "sm:w-56", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Categoria" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Todas as categorias" }),
          categories.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.slug, children: c.label }, c.slug))
        ] })
      ] })
    ] }),
    selectedIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex animate-in fade-in slide-in-from-top-4 items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-primary", children: [
          selectedIds.length,
          " selecionado",
          selectedIds.length === 1 ? "" : "s"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-primary/20" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-8 rounded-full text-xs font-semibold hover:bg-primary/10", onClick: () => {
            bulkUpdateProducts(selectedIds, {
              active: true
            });
            toast.success(`${selectedIds.length} produtos ativados`);
            setSelectedIds([]);
          }, children: "Ativar" }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-8 rounded-full text-xs font-semibold hover:bg-primary/10", onClick: () => {
            bulkUpdateProducts(selectedIds, {
              active: false
            });
            toast.success(`${selectedIds.length} produtos inativados`);
            setSelectedIds([]);
          }, children: "Inativar" }),
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 rounded-full text-xs font-semibold hover:bg-primary/10", children: [
              "Mudar categoria ",
              /* @__PURE__ */ jsx(ChevronDown, { className: "ml-1 h-3 w-3" })
            ] }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", className: "w-56", children: [
              /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Mover para..." }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              categories.map((c) => /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => {
                bulkUpdateProducts(selectedIds, {
                  category: c.slug
                });
                toast.success(`Categoria alterada para ${c.label}`);
                setSelectedIds([]);
              }, children: c.label }, c.slug))
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-8 rounded-full text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive", onClick: () => {
            if (confirm(`Excluir ${selectedIds.length} produtos selecionados?`)) {
              bulkRemoveProducts(selectedIds);
              toast.success(`${selectedIds.length} produtos removidos`);
              setSelectedIds([]);
            }
          }, children: "Excluir" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-8 rounded-full text-xs text-muted-foreground", onClick: () => setSelectedIds([]), children: "Cancelar" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "w-12", children: /* @__PURE__ */ jsx(Checkbox, { checked: selectedIds.length === filtered.length && filtered.length > 0, onCheckedChange: toggleSelectAll, "aria-label": "Selecionar todos" }) }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16", children: "Foto" }),
        /* @__PURE__ */ jsx(TableHead, { children: "SKU" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Produto" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Categoria" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Locação / mês" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        filtered.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center text-sm text-muted-foreground", children: "Nenhum produto encontrado." }) }),
        filtered.map((p) => {
          const cat = categories.find((c) => c.slug === p.category)?.label ?? p.category;
          const isEditing = editingId === p.id;
          const active = p.active ?? true;
          return /* @__PURE__ */ jsxs(TableRow, { className: cn(!active && "opacity-50", selectedIds.includes(p.id) && "bg-primary/5"), children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Checkbox, { checked: selectedIds.includes(p.id), onCheckedChange: () => toggleSelect(p.id), "aria-label": `Selecionar ${p.name}` }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "group relative h-12 w-12 overflow-hidden rounded-lg bg-muted", children: [
              p.image ? /* @__PURE__ */ jsx("img", { src: p.image, alt: p.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx(ImagePlus, { className: "h-4 w-4 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxs("label", { className: "absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100", children: [
                /* @__PURE__ */ jsx(Input, { type: "file", className: "sr-only", accept: "image/*", onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(p.id, file);
                } }),
                /* @__PURE__ */ jsx(ImagePlus, { className: "h-4 w-4 text-white" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: isEditing ? /* @__PURE__ */ jsx(Input, { value: draftSku, onChange: (e) => setDraftSku(e.target.value), className: "h-8 w-24", placeholder: "SKU" }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-muted-foreground", children: p.sku || "—" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: isEditing ? /* @__PURE__ */ jsx(Input, { value: draftName, onChange: (e) => setDraftName(e.target.value), className: "h-8" }) : /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: p.name }),
              p.shortDescription && /* @__PURE__ */ jsx("div", { className: "mt-0.5 line-clamp-1 text-xs text-muted-foreground", children: p.shortDescription })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-sm text-muted-foreground", children: cat }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isEditing ? /* @__PURE__ */ jsx(Input, { type: "number", value: draftRent, onChange: (e) => setDraftRent(e.target.value), className: "ml-auto h-8 w-28 text-right" }) : p.monthlyRent ? `R$ ${p.monthlyRent.toLocaleString("pt-BR")}` : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider", active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"), children: active ? "Ativo" : "Inativo" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isEditing ? /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1", children: [
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => saveEdit(p.id), className: "h-8 px-2", children: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: cancelEdit, className: "h-8 px-2", children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" }) })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-wrap justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => startEdit(p.id, p.name, p.sku, p.monthlyRent), className: "h-8 rounded-full", children: [
                /* @__PURE__ */ jsx(Pencil, { className: "mr-1 h-3 w-3" }),
                " Editar"
              ] }),
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: active ? "outline" : "default", onClick: () => {
                toggleActive(p.id);
                toast.message(active ? "Produto inativado" : "Produto ativado");
              }, className: cn("h-8 rounded-full", !active && "bg-primary text-primary-foreground hover:opacity-90"), children: active ? "Inativar" : "Ativar" }),
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                if (confirm(`Excluir "${p.name}"? Essa ação não pode ser desfeita.`)) {
                  removeProduct(p.id);
                  toast.message("Produto removido");
                }
              }, className: "h-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] }) })
          ] }, p.id);
        })
      ] })
    ] }) })
  ] });
}
function SingleCreateDialog({
  categories,
  onSubmit
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(categories[0]?.slug ?? "");
  const [shortDescription, setShortDescription] = useState("");
  const [rent, setRent] = useState("");
  function reset() {
    setName("");
    setSku("");
    setCategory(categories[0]?.slug ?? "");
    setShortDescription("");
    setRent("");
  }
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) reset();
  }, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "rounded-full bg-primary text-primary-foreground hover:opacity-90", children: [
      /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Novo produto"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Novo produto" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Adicione um equipamento ao catálogo." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "np-sku", children: "SKU" }),
            /* @__PURE__ */ jsx(Input, { id: "np-sku", value: sku, onChange: (e) => setSku(e.target.value), placeholder: "Ex: PT-01" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "np-name", children: "Nome *" }),
            /* @__PURE__ */ jsx(Input, { id: "np-name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Ex: Leg Press 45° Evo" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "np-cat", children: "Categoria" }),
          /* @__PURE__ */ jsxs(Select, { value: category, onValueChange: setCategory, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { id: "np-cat", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Selecione" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: categories.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.slug, children: c.label }, c.slug)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "np-short", children: "Descrição curta" }),
          /* @__PURE__ */ jsx(Input, { id: "np-short", value: shortDescription, onChange: (e) => setShortDescription(e.target.value), placeholder: "Frase de destaque" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "np-rent", children: "Locação mensal (R$)" }),
          /* @__PURE__ */ jsx(Input, { id: "np-rent", type: "number", value: rent, onChange: (e) => setRent(e.target.value), placeholder: "890" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          if (!name.trim() || !category) {
            toast.error("Preencha nome e categoria");
            return;
          }
          const r = rent ? Number(rent) : void 0;
          onSubmit({
            name: name.trim(),
            sku: sku.trim() || void 0,
            category,
            shortDescription: shortDescription.trim(),
            monthlyRent: Number.isFinite(r) ? r : void 0
          });
          setOpen(false);
          reset();
        }, className: "bg-primary text-primary-foreground hover:opacity-90", children: "Criar" })
      ] })
    ] })
  ] });
}
function BulkCreateDialog({
  categories,
  onSubmit
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const example = `nome,categoria,descricao_curta,valor
Leg Press 45° Evo,evo,Leg Press com curva otimizada,890
Esteira Pro Silent,cardio,Esteira silenciosa premium,1290`;
  function parse() {
    const validCats = new Set(categories.map((c) => c.slug));
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const items = [];
    for (const line of lines) {
      if (/^nome[\s,]/i.test(line)) continue;
      const parts = line.split(",").map((p) => p.trim());
      const [name, category, shortDescription, valueStr] = parts;
      if (!name || !category) continue;
      if (!validCats.has(category)) continue;
      const monthlyRent = valueStr ? Number(valueStr) : void 0;
      items.push({
        name,
        category,
        shortDescription,
        monthlyRent: Number.isFinite(monthlyRent) ? monthlyRent : void 0
      });
    }
    return items;
  }
  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target?.result);
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  function downloadTemplate() {
    const blob = new Blob([example], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "modelo_produtos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) setText("");
  }, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "rounded-full", children: [
      /* @__PURE__ */ jsx(FileSpreadsheet, { className: "mr-1.5 h-4 w-4" }),
      " Importar CSV"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Importar produtos via CSV" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          "Faça upload do seu arquivo CSV ou cole os dados abaixo. Categorias disponíveis: ",
          /* @__PURE__ */ jsx("strong", { children: categories.map((c) => c.slug).join(", ") }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "csv-upload", className: "font-semibold cursor-pointer text-primary hover:underline", children: "Selecionar arquivo CSV" }),
            /* @__PURE__ */ jsx(Input, { id: "csv-upload", type: "file", accept: ".csv", className: "hidden", onChange: handleFileUpload }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Os dados serão extraídos e exibidos abaixo para conferência." })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: downloadTemplate, className: "shrink-0", children: "Baixar Modelo" })
        ] }),
        /* @__PURE__ */ jsx(Textarea, { value: text, onChange: (e) => setText(e.target.value), placeholder: example, rows: 8, className: "font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => {
          const items = parse();
          if (items.length === 0) {
            toast.error("Nenhuma linha válida encontrada no CSV");
            return;
          }
          onSubmit(items);
          setOpen(false);
          setText("");
        }, className: "bg-primary text-primary-foreground hover:opacity-90", children: [
          "Importar ",
          text ? `(${parse().length})` : ""
        ] })
      ] })
    ] })
  ] });
}
function BulkUpdateDialog({
  categories,
  onSubmit
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const example = `sku,nome,categoria,descricao_curta,valor
PT-01,Leg Press 45° Evo,evo,Leg Press com curva otimizada,890
PT-02,Esteira Pro Silent,,Esteira silenciosa premium,1390`;
  function parse() {
    const validCats = new Set(categories.map((c) => c.slug));
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const items = [];
    for (const line of lines) {
      if (/^sku[\s,]/i.test(line)) continue;
      const parts = line.split(",").map((p) => p.trim());
      const [sku, name, category, shortDescription, valueStr] = parts;
      if (!sku) continue;
      const monthlyRent = valueStr ? Number(valueStr) : void 0;
      items.push({
        sku,
        name: name || void 0,
        category: validCats.has(category) ? category : void 0,
        shortDescription: shortDescription || void 0,
        monthlyRent: Number.isFinite(monthlyRent) ? monthlyRent : void 0
      });
    }
    return items;
  }
  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target?.result);
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  function downloadTemplate() {
    const blob = new Blob([example], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "modelo_atualizacao_produtos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) setText("");
  }, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "rounded-full", children: [
      /* @__PURE__ */ jsx(ArrowRightLeft, { className: "mr-1.5 h-4 w-4" }),
      " Atualizar via CSV"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Atualizar produtos via CSV (por SKU)" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          "Faça upload do seu arquivo CSV ou cole os dados abaixo. O sistema usará o ",
          /* @__PURE__ */ jsx("strong", { children: "SKU" }),
          " para encontrar o produto e atualizar os outros campos fornecidos. Campos vazios serão ignorados (não apagarão os dados atuais)."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "csv-update", className: "font-semibold cursor-pointer text-primary hover:underline", children: "Selecionar arquivo CSV" }),
            /* @__PURE__ */ jsx(Input, { id: "csv-update", type: "file", accept: ".csv", className: "hidden", onChange: handleFileUpload }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Os dados serão extraídos e exibidos abaixo para conferência." })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: downloadTemplate, className: "shrink-0", children: "Baixar Modelo" })
        ] }),
        /* @__PURE__ */ jsx(Textarea, { value: text, onChange: (e) => setText(e.target.value), placeholder: example, rows: 8, className: "font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => {
          const items = parse();
          if (items.length === 0) {
            toast.error("Nenhuma linha válida com SKU encontrada no CSV");
            return;
          }
          onSubmit(items);
          setOpen(false);
          setText("");
        }, className: "bg-primary text-primary-foreground hover:opacity-90", children: [
          "Atualizar ",
          text ? `(${parse().length})` : ""
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductsPage as component
};
