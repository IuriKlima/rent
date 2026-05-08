import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wrench,
  RefreshCw,
  TrendingDown,
  Wallet,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ProductPlaceholder } from "@/components/product/ProductPlaceholder";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroAcademia from "@/assets/hero-rent-fitness.webp";
import { useAdminStore } from "@/store/admin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rent Fitness — Academia premium sob locação para condomínios" },
      {
        name: "description",
        content:
          "Eleve o padrão do seu condomínio com uma academia profissional. Equipamentos premium, manutenção inclusa e atualização contínua, com custo fixo mensal.",
      },
      {
        property: "og:title",
        content: "Rent Fitness — Academia premium sob locação",
      },
      {
        property: "og:description",
        content:
          "Locação de academias profissionais para condomínios de alto padrão.",
      },
    ],
  }),
  component: HomePage,
});

const benefits = [
  {
    icon: Wrench,
    title: "Manutenção inclusa",
    description:
      "Equipe técnica especializada cuida de toda a manutenção preventiva e corretiva.",
  },
  {
    icon: RefreshCw,
    title: "Atualização de equipamentos",
    description:
      "Renove a sua academia periodicamente com modelos mais novos sem custo adicional.",
  },
  {
    icon: TrendingDown,
    title: "Sem depreciação",
    description:
      "Esqueça o desgaste e a perda de valor — você usa, nós cuidamos do ativo.",
  },
  {
    icon: Wallet,
    title: "Custo fixo mensal",
    description:
      "Previsibilidade orçamentária para o condomínio, sem surpresas no caixa.",
  },
];

function HomePage() {
  const storeHeroImage = useAdminStore((s) => s.heroImage);
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always show the built-in hero. Only override with store version after mount.
  const heroImage = (mounted && storeHeroImage) ? storeHeroImage : heroAcademia;

  return (
    <div>
      {/* HERO com banner */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
        {/* Background image — always rendered */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Academia premium projetada e instalada pela Rent Fitness em condomínio de alto padrão"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {/* Overlays para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl relative z-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Locação premium para condomínios
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Eleve o padrão do seu condomínio com uma{" "}
              <span className="text-primary">academia profissional</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Equipamentos de alto padrão sob locação, com manutenção inclusa
              e atualização periódica. Custo fixo, zero depreciação e a
              experiência de uma academia high-end no seu empreendimento.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:opacity-90"
              >
                <Link to="/produtos">
                  Montar projeto / catálogo{" "}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                <Link to="/contato">Falar com consultor</Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">
                  Linhas
                </dt>
                <dd className="mt-1 text-2xl font-extrabold tracking-tight text-white">4</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">
                  Equipamentos
                </dt>
                <dd className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                  {products.length > 0 ? `${products.length}+` : '20+'}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">
                  Manutenção
                </dt>
                <dd className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                  Inclusa
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Caption flutuante destacando que é projeto Rent Fitness */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 relative z-10 inline-flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 shadow-xl"
          >
            <div className="h-2 w-2 rounded-full bg-primary" />
            <p className="text-sm font-medium text-white/90">
              Projeto entregue pela Rent Fitness — academia panorâmica em
              condomínio de alto padrão.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY RENT */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Por que locar?
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Vantagens reais para o síndico e o condomínio.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Um modelo pensado para entregar valor percebido aos moradores sem
            comprometer o caixa do condomínio.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">
                {b.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Categorias
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Linhas em destaque.
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/produtos">
                Ver catálogo completo <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => {
              const firstProduct = products.find((p) => p.category === c.slug && p.image);

              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to="/produtos"
                    search={{ categoria: c.slug }}
                    className="group block overflow-hidden rounded-3xl border border-border bg-card transition hover:shadow-xl"
                  >
                    {firstProduct?.image ? (
                      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                        <img
                          src={firstProduct.image}
                          alt={c.label}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <ProductPlaceholder
                        category={c.slug}
                        className="rounded-none transition group-hover:scale-[1.02]"
                      />
                    )}
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {c.short}
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight">
                        {c.label}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {c.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                        Explorar <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Equipamentos
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Destaques do Catálogo.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/produtos">
                Ver todos os equipamentos <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-secondary px-8 py-16 text-secondary-foreground sm:px-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Pronto para transformar a academia do seu condomínio?
            </h2>
            <p className="mt-4 text-white/70">
              Monte seu catálogo personalizado e receba uma proposta sob medida
              pelo WhatsApp em poucos minutos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:opacity-90"
              >
                <Link to="/produtos">
                  Montar catálogo <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/contato">Falar com consultor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
