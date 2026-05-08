import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { u as useAdminStore, d as useAnalytics, a as useQuotes, B as Button } from "./router-jv7vIj3S.js";
import { Eye, FileText, Package, Tags, ImageIcon, Upload, Trash2, ArrowRight, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
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
import "sonner";
import "@tanstack/zod-adapter";
const heroAcademia = "/assets/hero-academia-CkwYJxkY.jpg";
function DashboardPage() {
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const heroImage = useAdminStore((s) => s.heroImage);
  const setHeroImage = useAdminStore((s) => s.setHeroImage);
  const clearHeroImage = useAdminStore((s) => s.clearHeroImage);
  const visits = useAnalytics((s) => s.visits);
  const quotes = useQuotes((s) => s.quotes);
  async function handleHeroUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const image = await resizeImage(file, 1920, 1080, 0.82);
    setHeroImage(image);
  }
  const activeProducts = products.filter((p) => p.active ?? true).length;
  const newQuotes = quotes.filter((q) => q.status === "novo").length;
  const chartData = useMemo(() => {
    const days = [];
    const today = /* @__PURE__ */ new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        date: key,
        label: d.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit"
        }),
        visits: 0,
        quotes: 0
      });
    }
    const idx = new Map(days.map((d, i) => [d.date, i]));
    for (const v of visits) {
      const k = v.at.slice(0, 10);
      const i = idx.get(k);
      if (i !== void 0) days[i].visits++;
    }
    for (const q of quotes) {
      const k = q.createdAt.slice(0, 10);
      const i = idx.get(k);
      if (i !== void 0) days[i].quotes++;
    }
    return days;
  }, [visits, quotes]);
  const topPaths = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const v of visits) map.set(v.path, (map.get(v.path) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [visits]);
  const stats = [{
    label: "Visitas totais",
    value: visits.length,
    icon: Eye,
    hint: "desde o primeiro acesso"
  }, {
    label: "Orçamentos",
    value: quotes.length,
    icon: FileText,
    hint: `${newQuotes} novo(s)`
  }, {
    label: "Produtos ativos",
    value: activeProducts,
    icon: Package,
    hint: `${products.length} no total`
  }, {
    label: "Categorias",
    value: categories.length,
    icon: Tags,
    hint: "linhas de produtos"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Visão geral" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl", children: "Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Acompanhe o tráfego do site e os pedidos de orçamento." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "grid gap-4 rounded-2xl border border-border bg-card p-5 lg:grid-cols-[minmax(0,1fr)_280px]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
          /* @__PURE__ */ jsx(ImageIcon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold uppercase tracking-wider", children: "Banner da Home" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: "Troque a imagem de fundo da hero sem mexer no código. Use JPG, PNG ou WebP até 3MB." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "rounded-full bg-primary text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx(Upload, { className: "mr-1.5 h-4 w-4" }),
            "Enviar imagem",
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "sr-only", onChange: handleHeroUpload })
          ] }) }),
          heroImage && /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "rounded-full", onClick: clearHeroImage, children: [
            /* @__PURE__ */ jsx(Trash2, { className: "mr-1.5 h-4 w-4" }),
            "Usar padrão"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { src: heroImage ?? heroAcademia, alt: "Prévia do banner da página inicial", className: "h-40 w-full rounded-xl object-cover", loading: "lazy" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-3xl font-extrabold tracking-tight", children: s.value }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: s.hint })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-bold tracking-tight", children: "Atividade — últimos 14 dias" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Visitas e orçamentos recebidos por dia." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }),
            " Visitas"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-foreground" }),
            " Orçamentos"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 h-72 w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: chartData, margin: {
        top: 10,
        right: 10,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: "visitsGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--color-primary)", stopOpacity: 0.4 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--color-primary)", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "quotesGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--color-foreground)", stopOpacity: 0.25 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--color-foreground)", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "label", tick: {
          fontSize: 11
        }, stroke: "var(--color-muted-foreground)" }),
        /* @__PURE__ */ jsx(YAxis, { allowDecimals: false, tick: {
          fontSize: 11
        }, stroke: "var(--color-muted-foreground)" }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
          borderRadius: 12,
          border: "1px solid var(--color-border)",
          background: "var(--color-card)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "visits", stroke: "var(--color-primary)", strokeWidth: 2, fill: "url(#visitsGrad)" }),
        /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "quotes", stroke: "var(--color-foreground)", strokeWidth: 2, fill: "url(#quotesGrad)" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-bold tracking-tight", children: "Últimos orçamentos" }),
          /* @__PURE__ */ jsxs(Link, { to: "/admin/orcamentos", className: "inline-flex items-center text-xs font-semibold text-primary hover:underline", children: [
            "Ver todos ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-3 w-3" })
          ] })
        ] }),
        quotes.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-muted-foreground", children: "Nenhum orçamento recebido ainda." }) : /* @__PURE__ */ jsx("ul", { className: "mt-4 divide-y divide-border", children: quotes.slice(0, 5).map((q) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between py-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: q.lead.name }),
            /* @__PURE__ */ jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
              q.lead.condominio,
              " · ",
              q.totalItems,
              " item(ns)"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "ml-3 shrink-0 text-xs text-muted-foreground", children: new Date(q.createdAt).toLocaleDateString("pt-BR") })
        ] }, q.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-bold tracking-tight", children: "Páginas mais visitadas" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        topPaths.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-muted-foreground", children: "Sem dados de visitas ainda." }) : /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: topPaths.map(([path, count]) => {
          const max = topPaths[0][1];
          const pct = count / max * 100;
          return /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate font-mono text-foreground", children: path }),
              /* @__PURE__ */ jsx("span", { className: "ml-3 shrink-0 font-semibold", children: count })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary", style: {
              width: `${pct}%`
            } }) })
          ] }, path);
        }) })
      ] })
    ] })
  ] });
}
function resizeImage(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Imagem inválida."));
      img.onload = () => {
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
export {
  DashboardPage as component
};
