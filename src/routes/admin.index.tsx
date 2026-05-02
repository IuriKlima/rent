import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useAdminStore } from "@/store/admin";
import { useAnalytics } from "@/store/analytics";
import { useQuotes } from "@/store/quotes";
import {
  Eye,
  FileText,
  Package,
  Tags,
  TrendingUp,
  ArrowRight,
  ImageIcon,
  Upload,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAcademia from "@/assets/hero-academia.jpg";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const heroImage = useAdminStore((s) => s.heroImage);
  const setHeroImage = useAdminStore((s) => s.setHeroImage);
  const clearHeroImage = useAdminStore((s) => s.clearHeroImage);
  const visits = useAnalytics((s) => s.visits);
  const quotes = useQuotes((s) => s.quotes);

  function handleHeroUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 3 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setHeroImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const activeProducts = products.filter((p) => p.active ?? true).length;
  const newQuotes = quotes.filter((q) => q.status === "novo").length;

  // últimos 14 dias
  const chartData = useMemo(() => {
    const days: { date: string; label: string; visits: number; quotes: number }[] = [];
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        date: key,
        label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        visits: 0,
        quotes: 0,
      });
    }
    const idx = new Map(days.map((d, i) => [d.date, i]));
    for (const v of visits) {
      const k = v.at.slice(0, 10);
      const i = idx.get(k);
      if (i !== undefined) days[i].visits++;
    }
    for (const q of quotes) {
      const k = q.createdAt.slice(0, 10);
      const i = idx.get(k);
      if (i !== undefined) days[i].quotes++;
    }
    return days;
  }, [visits, quotes]);

  const topPaths = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of visits) map.set(v.path, (map.get(v.path) ?? 0) + 1);
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [visits]);

  const stats = [
    { label: "Visitas totais", value: visits.length, icon: Eye, hint: "desde o primeiro acesso" },
    { label: "Orçamentos", value: quotes.length, icon: FileText, hint: `${newQuotes} novo(s)` },
    { label: "Produtos ativos", value: activeProducts, icon: Package, hint: `${products.length} no total` },
    { label: "Categorias", value: categories.length, icon: Tags, hint: "linhas de produtos" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Visão geral
        </span>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe o tráfego do site e os pedidos de orçamento.
        </p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-border bg-card p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <ImageIcon className="h-4 w-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Banner da Home</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Troque a imagem de fundo da hero sem mexer no código. Use JPG, PNG ou WebP até 3MB.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:opacity-90">
              <label>
                <Upload className="mr-1.5 h-4 w-4" />
                Enviar imagem
                <input type="file" accept="image/*" className="sr-only" onChange={handleHeroUpload} />
              </label>
            </Button>
            {heroImage && (
              <Button variant="outline" className="rounded-full" onClick={clearHeroImage}>
                <Trash2 className="mr-1.5 h-4 w-4" />
                Usar padrão
              </Button>
            )}
          </div>
        </div>
        <img
          src={heroImage ?? heroAcademia}
          alt="Prévia do banner da página inicial"
          className="h-40 w-full rounded-xl object-cover"
          loading="lazy"
        />
      </section>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight">
              Atividade — últimos 14 dias
            </h2>
            <p className="text-xs text-muted-foreground">
              Visitas e orçamentos recebidos por dia.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" /> Visitas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-foreground" /> Orçamentos
            </span>
          </div>
        </div>

        <div className="mt-5 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="quotesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-foreground)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#visitsGrad)"
              />
              <Area
                type="monotone"
                dataKey="quotes"
                stroke="var(--color-foreground)"
                strokeWidth={2}
                fill="url(#quotesGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent + top pages */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold tracking-tight">Últimos orçamentos</h2>
            <Link
              to="/admin/orcamentos"
              className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
            >
              Ver todos <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          {quotes.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Nenhum orçamento recebido ainda.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {quotes.slice(0, 5).map((q) => (
                <li key={q.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{q.lead.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {q.lead.condominio} · {q.totalItems} item(ns)
                    </p>
                  </div>
                  <span className="ml-3 shrink-0 text-xs text-muted-foreground">
                    {new Date(q.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold tracking-tight">Páginas mais visitadas</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          {topPaths.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Sem dados de visitas ainda.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {topPaths.map(([path, count]) => {
                const max = topPaths[0][1];
                const pct = (count / max) * 100;
                return (
                  <li key={path}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate font-mono text-foreground">{path}</span>
                      <span className="ml-3 shrink-0 font-semibold">{count}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
