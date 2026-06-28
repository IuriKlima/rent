import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore } from "@/store/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Category } from "@/data/products";

export const Route = createFileRoute("/admin/categorias")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories, products, addCategory, updateCategory, removeCategory } =
    useAdminStore();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", image_url: "" });

  function startEdit(slug: string) {
    const c = categories.find((x) => x.slug === slug);
    if (!c) return;
    setEditingSlug(slug);
    setDraft({ name: c.name, image_url: c.image_url || "" });
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
            addCategory({ id: crypto.randomUUID(), slug: "", ...c });
            toast.success("Categoria criada");
          }}
        />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.name).length;
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
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">URL da Imagem</Label>
                    <Input
                      value={draft.image_url}
                      onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
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
                      <h3 className="mt-1 text-lg font-bold tracking-tight">{c.name}</h3>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {count} {count === 1 ? "produto" : "produtos"}
                    </span>
                  </div>
                  {c.image_url && (
                    <img src={c.image_url} alt={c.name} className="mt-3 h-20 w-full object-cover rounded-md" />
                  )}
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
                        } else if (!confirm(`Excluir a categoria "${c.name}"?`)) {
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
  onSubmit: (c: { name: string; image_url: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function reset() {
    setName("");
    setImageUrl("");
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
            <Label htmlFor="nc-name">Nome</Label>
            <Input id="nc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Linha Premium" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="nc-image">URL da Imagem</Label>
            <Input id="nc-image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (!name.trim()) {
                toast.error("Informe o nome");
                return;
              }
              onSubmit({
                name: name.trim(),
                image_url: imageUrl.trim(),
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
