import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore } from "@/store/admin";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lock, LogOut, Pencil, Check, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — Rent Fitness" },
      { name: "description", content: "Gestão de catálogo (MVP)." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const unlocked = useAdminStore((s) => s.unlocked);
  return unlocked ? <AdminDashboard /> : <AdminGate />;
}

function AdminGate() {
  const unlock = useAdminStore((s) => s.unlock);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = unlock(password);
    if (!ok) {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
          Painel administrativo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesso restrito. Informe a senha para continuar.
        </p>

        <div className="mt-6 grid gap-1.5">
          <Label htmlFor="pw">Senha</Label>
          <Input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="••••••••"
            className={cn(error && "border-destructive")}
            autoFocus
          />
          {error && (
            <p className="text-xs text-destructive">Senha incorreta.</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Dica MVP: <code className="rounded bg-muted px-1">rentfit2026</code>
          </p>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const { products, lock, updateProduct, toggleActive, reset } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftRent, setDraftRent] = useState<string>("");

  function startEdit(id: string, name: string, rent?: number) {
    setEditingId(id);
    setDraftName(name);
    setDraftRent(rent?.toString() ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftName("");
    setDraftRent("");
  }

  function saveEdit(id: string) {
    const rent = draftRent ? Number(draftRent) : undefined;
    updateProduct(id, {
      name: draftName.trim() || undefined,
      monthlyRent: Number.isFinite(rent) ? rent : undefined,
    });
    cancelEdit();
    toast.success("Produto atualizado", {
      description: "Alteração salva apenas em memória (MVP).",
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Admin
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Catálogo de equipamentos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edite nome e valor de locação ou inative produtos. Mudanças
            persistem somente nesta sessão.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              reset();
              toast.message("Catálogo restaurado");
            }}
            className="rounded-full"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Restaurar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={lock}
            className="rounded-full"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            Sair
          </Button>
        </div>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
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
            {products.map((p) => {
              const cat =
                categories.find((c) => c.slug === p.category)?.label ?? p.category;
              const isEditing = editingId === p.id;
              const active = p.active ?? true;
              return (
                <TableRow
                  key={p.id}
                  className={cn(!active && "opacity-50")}
                >
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      <div className="font-medium">{p.name}</div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {cat}
                  </TableCell>
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
                        active
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {active ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <div className="inline-flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => saveEdit(p.id)}
                          className="h-8 px-2"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={cancelEdit}
                          className="h-8 px-2"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="inline-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(p.id, p.name, p.monthlyRent)}
                          className="h-8 rounded-full"
                        >
                          <Pencil className="mr-1 h-3 w-3" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant={active ? "outline" : "default"}
                          onClick={() => {
                            toggleActive(p.id);
                            toast.message(
                              active ? "Produto inativado" : "Produto ativado",
                            );
                          }}
                          className={cn(
                            "h-8 rounded-full",
                            !active &&
                              "bg-primary text-primary-foreground hover:opacity-90",
                          )}
                        >
                          {active ? "Inativar" : "Ativar"}
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
