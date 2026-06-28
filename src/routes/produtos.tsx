import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { type Category } from "@/data/products";
import { useAdminStore } from "@/store/admin";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const searchSchema = z.object({
  categoria: fallback(z.string(), "todos").default("todos"),
});

export const Route = createFileRoute("/produtos")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Catálogo de equipamentos — Rent Fitness" },
      {
        name: "description",
        content:
          "Explore o catálogo completo de equipamentos para locação: linhas Evo, Select, Peso Livre e Cárdio.",
      },
      {
        property: "og:title",
        content: "Catálogo de equipamentos — Rent Fitness",
      },
      {
        property: "og:description",
        content: "Linhas Evo, Select, Peso Livre e Cárdio para condomínios premium.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const { categoria } = Route.useSearch();

  const filters = [
    { slug: "todos", label: "Todos" },
    ...categories.map((c) => ({ slug: c.slug, label: c.name })),
  ];

  const filtered =
    categoria === "todos"
      ? products
      : products.filter((p) => p.category === categoria);

  const activeCategory = categories.find((c) => c.slug === categoria);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Catálogo
        </span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {activeCategory ? activeCategory.name : "Equipamentos premium"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Equipamentos profissionais para todos os perfis de condomínio. Filtre por linha e monte seu projeto.
        </p>
      </header>

      {/* FILTROS */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f.slug === categoria;
          return (
            <Link
              key={f.slug}
              to="/produtos"
              search={{ categoria: f.slug }}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                active
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          Nenhum equipamento nessa linha por enquanto.
        </p>
      )}
    </div>
  );
}
