import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Wrench, RefreshCw, TrendingDown, Wallet } from "lucide-react";
import { P as ProductPlaceholder } from "./ProductPlaceholder-DYPqJKX8.js";
import { u as useAdminStore, B as Button } from "./router-dGa2FNW3.js";
import { useState, useEffect } from "react";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "zod";
import "sonner";
import "@tanstack/zod-adapter";
const heroAcademia = "/assets/hero-rent-fitness-BOc_wZsi.webp";
const benefits = [{
  icon: Wrench,
  title: "Manutenção inclusa",
  description: "Equipe técnica especializada cuida de toda a manutenção preventiva e corretiva."
}, {
  icon: RefreshCw,
  title: "Atualização de equipamentos",
  description: "Renove a sua academia periodicamente com modelos mais novos sem custo adicional."
}, {
  icon: TrendingDown,
  title: "Sem depreciação",
  description: "Esqueça o desgaste e a perda de valor — você usa, nós cuidamos do ativo."
}, {
  icon: Wallet,
  title: "Custo fixo mensal",
  description: "Previsibilidade orçamentária para o condomínio, sem surpresas no caixa."
}];
function HomePage() {
  const storeHeroImage = useAdminStore((s) => s.heroImage);
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const heroImage = mounted && storeHeroImage ? storeHeroImage : heroAcademia;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden min-h-[600px] lg:min-h-[700px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx("img", { src: heroImage, alt: "Academia premium projetada e instalada pela Rent Fitness em condomínio de alto padrão", width: 1920, height: 1080, fetchPriority: "high", decoding: "async", className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "max-w-2xl relative z-10", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
            "Locação premium para condomínios"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl", children: [
            "Eleve o padrão do seu condomínio com uma",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "academia profissional" }),
            "."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg text-white/80", children: "Equipamentos de alto padrão sob locação, com manutenção inclusa e atualização periódica. Custo fixo, zero depreciação e a experiência de uma academia high-end no seu empreendimento." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "rounded-full bg-primary text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/produtos", children: [
              "Montar projeto / catálogo",
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white", children: /* @__PURE__ */ jsx(Link, { to: "/contato", children: "Falar com consultor" }) })
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-wide text-white/60", children: "Linhas" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-2xl font-extrabold tracking-tight text-white", children: "4" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-wide text-white/60", children: "Equipamentos" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-2xl font-extrabold tracking-tight text-white", children: products.length > 0 ? `${products.length}+` : "20+" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-wide text-white/60", children: "Manutenção" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-2xl font-extrabold tracking-tight text-white", children: "Inclusa" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.2
        }, className: "mt-12 relative z-10 inline-flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 shadow-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-primary" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-white/90", children: "Projeto entregue pela Rent Fitness — academia panorâmica em condomínio de alto padrão." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Por que locar?" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl", children: "Vantagens reais para o síndico e o condomínio." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Um modelo pensado para entregar valor percebido aos moradores sem comprometer o caixa do condomínio." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: benefits.map((b, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        amount: 0.3
      }, transition: {
        duration: 0.4,
        delay: i * 0.05
      }, className: "rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(b.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-bold tracking-tight", children: b.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: b.description })
      ] }, b.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-muted/40 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Categorias" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl", children: "Linhas em destaque." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "rounded-full", children: /* @__PURE__ */ jsxs(Link, { to: "/produtos", children: [
          "Ver catálogo completo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: categories.map((c, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        amount: 0.3
      }, transition: {
        duration: 0.4,
        delay: i * 0.05
      }, children: /* @__PURE__ */ jsxs(Link, { to: "/produtos", search: {
        categoria: c.slug
      }, className: "group block overflow-hidden rounded-3xl border border-border bg-card transition hover:shadow-xl", children: [
        /* @__PURE__ */ jsx(ProductPlaceholder, { category: c.slug, className: "rounded-none transition group-hover:scale-[1.02]" }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary", children: c.short }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold tracking-tight", children: c.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: c.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center text-sm font-semibold text-primary", children: [
            "Explorar ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-3.5 w-3.5" })
          ] })
        ] })
      ] }) }, c.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[2rem] bg-secondary px-8 py-16 text-secondary-foreground sm:px-16", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-2xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold tracking-tight sm:text-4xl", children: "Pronto para transformar a academia do seu condomínio?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-white/70", children: "Monte seu catálogo personalizado e receba uma proposta sob medida pelo WhatsApp em poucos minutos." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "rounded-full bg-primary text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/produtos", children: [
            "Montar catálogo ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white", children: /* @__PURE__ */ jsx(Link, { to: "/contato", children: "Falar com consultor" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
