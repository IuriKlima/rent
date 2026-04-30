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
import { categories, products } from "@/data/products";
import { ProductPlaceholder } from "@/components/product/ProductPlaceholder";
import { Button } from "@/components/ui/button";

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
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/40" />
        <div className="absolute -top-40 right-0 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Locação premium para condomínios
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Eleve o padrão do seu condomínio com uma{" "}
                <span className="text-primary">academia profissional</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
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
                  className="rounded-full"
                >
                  <Link to="/contato">Falar com consultor</Link>
                </Button>
              </div>

              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Linhas
                  </dt>
                  <dd className="mt-1 text-2xl font-extrabold tracking-tight">
                    4
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Equipamentos
                  </dt>
                  <dd className="mt-1 text-2xl font-extrabold tracking-tight">
                    {products.length}+
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Manutenção
                  </dt>
                  <dd className="mt-1 text-2xl font-extrabold tracking-tight">
                    Inclusa
                  </dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <ProductPlaceholder category="cardio" className="aspect-[3/4]" />
                <div className="space-y-4 pt-10">
                  <ProductPlaceholder category="evo" />
                  <ProductPlaceholder category="select" variant="alt" />
                </div>
              </div>
              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl glass px-5 py-4 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  A partir de
                </p>
                <p className="text-lg font-extrabold tracking-tight">
                  Projetos sob medida para o seu condomínio
                </p>
              </div>
            </motion.div>
          </div>
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
            {categories.map((c, i) => (
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
                  <ProductPlaceholder
                    category={c.slug}
                    className="rounded-none transition group-hover:scale-[1.02]"
                  />
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
            ))}
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
