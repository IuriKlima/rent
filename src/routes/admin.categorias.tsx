import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore } from "@/store/admin";
import type { CategorySlug } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categorias")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories, products, addCategory, updateCategory, removeCategory } =
    useAdminStore();
  const [editingSlug, setEditingSlug] = useState<CategorySlug | null>(null);
  const [draft, setDraft] = useState({ label: "", short: "", description: "" });

  function startEdit(slug: CategorySlug) {
    const c = categories.find((x) => x.slug === slug);
    if (!c) return;
    setEditingSlug(slug);
    setDraft({ label: c.label, short: c.short, description: c.description });
  }

  function save() {
    if (!editingSlug) return;
    updateCategory(editingSlug, draft);
    setEditingSlug(null);
    toast.success("Categoria atualizada");
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Organização
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Categorias
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Linhas de produtos que aparecem no catálogo público.
          </p>
        </div>
        <NewCategoryDialog
          onSubmit={(c) => {
            addCategory(c);
            toast.success("Categoria criada");
          }}
        />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          const isEditing = editingSlug === c.slug;

          return (
            <div
              key={c.slug}
              className="rounded-2xl border border-border bg-card p-5"
            >
              {isEditing ? (
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label className="text-xs">Nome</Label>
                    <Input
                      value={draft.label}
                      onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Subtítulo</Label>
                    <Input
                      value={draft.short}
                      onChange={(e) => setDraft({ ...draft, short: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Descrição</Label>
                    <Textarea
                      rows={3}
                      value={draft.description}
                      onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-1.5">
                    <Button size="sm" variant="ghost" onClick={() => setEditingSlug(null)}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={save}
                      className="bg-primary text-primary-foreground hover:opacity-90"
                    >
                      <Check className="mr-1 h-3.5 w-3.5" /> Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {c.short}
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight">{c.label}</h3>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {count} {count === 1 ? "produto" : "produtos"}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {c.description}
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                    slug: <code className="rounded bg-muted px-1">{c.slug}</code>
                  </p>
                  <div className="mt-4 flex justify-end gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => startEdit(c.slug)}
                    >
                      <Pencil className="mr-1 h-3 w-3" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => {
                        if (count > 0) {
                          if (
                            !confirm(
                              `Existem ${count} produto(s) nesta categoria. Excluir mesmo assim?`,
                            )
                          )
                            return;
                        } else if (!confirm(`Excluir a categoria "${c.label}"?`)) {
                          return;
                        }
                        removeCategory(c.slug);
                        toast.message("Categoria removida");
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewCategoryDialog({
  onSubmit,
}: {
  onSubmit: (c: { slug: string; label: string; short: string; description: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [slug, setSlug] = useState("");
  const [short, setShort] = useState("");
  const [description, setDescription] = useState("");

  function reset() {
    setLabel("");
    setSlug("");
    setShort("");
    setDescription("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary text-primary-foreground hover:opacity-90">
          <Plus className="mr-1.5 h-4 w-4" /> Nova categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            As categorias agrupam os produtos no catálogo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="nc-label">Nome</Label>
            <Input id="nc-label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex: Linha Premium" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="nc-slug">Slug (opcional)</Label>
            <Input id="nc-slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="linha-premium" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="nc-short">Subtítulo</Label>
            <Input id="nc-short" value={short} onChange={(e) => setShort(e.target.value)} placeholder="Equipamentos top de linha" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="nc-desc">Descrição</Label>
            <Textarea id="nc-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (!label.trim()) {
                toast.error("Informe o nome");
                return;
              }
              onSubmit({
                slug: slug.trim() || label.trim(),
                label: label.trim(),
                short: short.trim(),
                description: description.trim(),
              });
              setOpen(false);
              reset();
            }}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
