import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAdminStore } from "@/store/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Check,
  X,
  Trash2,
  Search,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/produtos")({
  component: ProductsPage,
});

function ProductsPage() {
  const {
    products,
    categories,
    updateProduct,
    toggleActive,
    addProduct,
    addProductsBulk,
    removeProduct,
  } = useAdminStore();

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "all" || p.category === filterCat;
      return matchSearch && matchCat;
    });
  }, [products, search, filterCat]);

  // edit-in-place
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftRent, setDraftRent] = useState("");

  function startEdit(id: string, name: string, rent?: number) {
    setEditingId(id);
    setDraftName(name);
    setDraftRent(rent?.toString() ?? "");
  }
  function cancelEdit() {
    setEditingId(null);
  }
  function saveEdit(id: string) {
    const rent = draftRent ? Number(draftRent) : undefined;
    updateProduct(id, {
      name: draftName.trim() || undefined,
      monthlyRent: Number.isFinite(rent) ? rent : undefined,
    });
    cancelEdit();
    toast.success("Produto atualizado");
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Catálogo
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Produtos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie os equipamentos disponíveis para locação. Total:{" "}
            <strong>{products.length}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <BulkCreateDialog
            categories={categories}
            onSubmit={(items) => {
              const created = addProductsBulk(items);
              toast.success(`${created} produto(s) criado(s) em massa`);
            }}
          />
          <SingleCreateDialog
            categories={categories}
            onSubmit={(p) => {
              addProduct(p);
              toast.success("Produto criado");
            }}
          />
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Locação / mês</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((p) => {
              const cat = categories.find((c) => c.slug === p.category)?.label ?? p.category;
              const isEditing = editingId === p.id;
              const active = p.active ?? true;
              return (
                <TableRow key={p.id} className={cn(!active && "opacity-50")}>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      <div>
                        <div className="font-medium">{p.name}</div>
                        {p.shortDescription && (
                          <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                            {p.shortDescription}
                          </div>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{cat}</TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={draftRent}
                        onChange={(e) => setDraftRent(e.target.value)}
                        className="ml-auto h-8 w-28 text-right"
                      />
                    ) : p.monthlyRent ? (
                      `R$ ${p.monthlyRent.toLocaleString("pt-BR")}`
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                        active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {active ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => saveEdit(p.id)} className="h-8 px-2">
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit} className="h-8 px-2">
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="inline-flex flex-wrap justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(p.id, p.name, p.monthlyRent)}
                          className="h-8 rounded-full"
                        >
                          <Pencil className="mr-1 h-3 w-3" /> Editar
                        </Button>
                        <Button
                          size="sm"
                          variant={active ? "outline" : "default"}
                          onClick={() => {
                            toggleActive(p.id);
                            toast.message(active ? "Produto inativado" : "Produto ativado");
                          }}
                          className={cn(
                            "h-8 rounded-full",
                            !active && "bg-primary text-primary-foreground hover:opacity-90",
                          )}
                        >
                          {active ? "Inativar" : "Ativar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm(`Excluir "${p.name}"? Essa ação não pode ser desfeita.`)) {
                              removeProduct(p.id);
                              toast.message("Produto removido");
                            }
                          }}
                          className="h-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* =========== Single create =========== */
function SingleCreateDialog({
  categories,
  onSubmit,
}: {
  categories: { slug: string; label: string }[];
  onSubmit: (p: {
    name: string;
    category: never;
    shortDescription?: string;
    monthlyRent?: number;
    description?: string;
  }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(categories[0]?.slug ?? "");
  const [shortDescription, setShortDescription] = useState("");
  const [rent, setRent] = useState("");

  function reset() {
    setName("");
    setCategory(categories[0]?.slug ?? "");
    setShortDescription("");
    setRent("");
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
          <Plus className="mr-1.5 h-4 w-4" /> Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo produto</DialogTitle>
          <DialogDescription>Adicione um equipamento ao catálogo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="np-name">Nome</Label>
            <Input id="np-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Leg Press 45° Evo" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="np-cat">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="np-cat">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="np-short">Descrição curta</Label>
            <Input id="np-short" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Frase de destaque" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="np-rent">Locação mensal (R$)</Label>
            <Input id="np-rent" type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="890" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (!name.trim() || !category) {
                toast.error("Preencha nome e categoria");
                return;
              }
              const r = rent ? Number(rent) : undefined;
              onSubmit({
                name: name.trim(),
                category: category as never,
                shortDescription: shortDescription.trim(),
                monthlyRent: Number.isFinite(r) ? r : undefined,
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

/* =========== Bulk create =========== */
function BulkCreateDialog({
  categories,
  onSubmit,
}: {
  categories: { slug: string; label: string }[];
  onSubmit: (
    items: { name: string; category: never; shortDescription?: string; monthlyRent?: number }[],
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const example = `Nome do equipamento, categoria, descrição curta, valor
Leg Press 45° Evo, evo, Leg Press com curva otimizada, 890
Esteira Pro Silent, cardio, Esteira silenciosa premium, 1290`;

  function parse(): { name: string; category: never; shortDescription?: string; monthlyRent?: number }[] {
    const validCats = new Set(categories.map((c) => c.slug));
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const items: { name: string; category: never; shortDescription?: string; monthlyRent?: number }[] = [];
    for (const line of lines) {
      // pula header
      if (/^nome[\s,]/i.test(line)) continue;
      const parts = line.split(",").map((p) => p.trim());
      const [name, category, shortDescription, valueStr] = parts;
      if (!name || !category) continue;
      if (!validCats.has(category)) continue;
      const monthlyRent = valueStr ? Number(valueStr) : undefined;
      items.push({
        name,
        category: category as never,
        shortDescription,
        monthlyRent: Number.isFinite(monthlyRent) ? monthlyRent : undefined,
      });
    }
    return items;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setText("");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <FileSpreadsheet className="mr-1.5 h-4 w-4" /> Criação em massa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criação em massa</DialogTitle>
          <DialogDescription>
            Cole as linhas no formato CSV: <code>nome, categoria, descrição curta, valor</code>.
            Categorias disponíveis: <strong>{categories.map((c) => c.slug).join(", ")}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={example}
          rows={10}
          className="font-mono text-xs"
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              const items = parse();
              if (items.length === 0) {
                toast.error("Nenhuma linha válida encontrada");
                return;
              }
              onSubmit(items);
              setOpen(false);
              setText("");
            }}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            Importar {`(${parse().length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
