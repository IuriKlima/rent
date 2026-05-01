import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuotes, type Quote } from "@/store/quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building2,
  MessageCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { buildWhatsappUrl } from "@/store/cart";

export const Route = createFileRoute("/admin/orcamentos")({
  component: QuotesPage,
});

const STATUS_LABEL: Record<Quote["status"], string> = {
  novo: "Novo",
  "em-contato": "Em contato",
  fechado: "Fechado",
  descartado: "Descartado",
};

const STATUS_STYLE: Record<Quote["status"], string> = {
  novo: "bg-primary/10 text-primary",
  "em-contato": "bg-blue-500/10 text-blue-600",
  fechado: "bg-emerald-500/10 text-emerald-600",
  descartado: "bg-muted text-muted-foreground",
};

function QuotesPage() {
  const { quotes, updateStatus, removeQuote } = useQuotes();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Quote | null>(null);

  const filtered = useMemo(() => {
    return quotes.filter((q) => {
      const matchSearch =
        q.lead.name.toLowerCase().includes(search.toLowerCase()) ||
        q.lead.condominio.toLowerCase().includes(search.toLowerCase()) ||
        q.lead.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filter === "all" || q.status === filter;
      return matchSearch && matchStatus;
    });
  }, [quotes, search, filter]);

  return (
    <div className="space-y-6">
      <header>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Pipeline
        </span>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Orçamentos
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pedidos de cotação enviados pelo site. Total:{" "}
          <strong>{quotes.length}</strong>.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, condomínio ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {(Object.keys(STATUS_LABEL) as Quote["status"][]).map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-4 text-sm font-medium">Nenhum orçamento por aqui.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Os pedidos enviados pelo site aparecem nessa lista.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {filtered.map((q) => (
            <li
              key={q.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{q.lead.name}</p>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        STATUS_STYLE[q.status],
                      )}
                    >
                      {STATUS_LABEL[q.status]}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" /> {q.lead.condominio}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {q.totalItems} item(ns) ·{" "}
                    {new Date(q.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    value={q.status}
                    onValueChange={(v) => updateStatus(q.id, v as Quote["status"])}
                  >
                    <SelectTrigger className="h-9 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(STATUS_LABEL) as Quote["status"][]).map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setSelected(q)}
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" /> Detalhes
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      if (confirm("Excluir este orçamento?")) {
                        removeQuote(q.id);
                        toast.message("Orçamento excluído");
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Detail drawer */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.lead.name}</SheetTitle>
                <SheetDescription>
                  Recebido em {new Date(selected.createdAt).toLocaleString("pt-BR")}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5 px-1">
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Contato
                  </h3>
                  <p className="flex items-center gap-2 text-sm">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    {selected.lead.condominio}
                  </p>
                  <a
                    href={`tel:${selected.lead.phone}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    {selected.lead.phone}
                  </a>
                  <a
                    href={`mailto:${selected.lead.email}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    {selected.lead.email}
                  </a>
                </section>

                <section>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Equipamentos solicitados ({selected.totalItems})
                  </h3>
                  <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
                    {selected.items.map((it) => (
                      <li key={it.id} className="flex items-center justify-between px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{it.name}</p>
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                            {it.categoryLabel}
                          </p>
                        </div>
                        <span className="ml-3 shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold">
                          {it.quantity}x
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <a
                  href={buildWhatsappUrl(selected.items, selected.lead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Reenviar pelo WhatsApp
                </a>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
