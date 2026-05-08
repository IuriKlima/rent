import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  type Product,
} from "@/data/products";
import { supabase } from "@/lib/supabase";
import { useAdminStore } from "@/store/admin";
import { ProductPlaceholder } from "@/components/product/ProductPlaceholder";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { ArrowLeft, Plus, Check, BadgeDollarSign } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$id")({
  loader: async ({ params }) => {
    const { data: p, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !p) throw notFound();

    const product: Product = {
      id: p.id,
      name: p.name,
      category: p.category,
      shortDescription: p.short_description,
      description: p.description,
      specs: p.specs,
      relatedIds: p.related_ids,
      active: p.active,
      monthlyRent: p.monthly_rent,
      image: p.image
    };

    // Fetch related
    const { data: relatedData } = await supabase
      .from('products')
      .select('*')
      .in('id', product.relatedIds);

    const related: Product[] = (relatedData?.map(rp => ({
      id: rp.id,
      name: rp.name,
      category: rp.category,
      shortDescription: rp.short_description,
      description: rp.description,
      specs: rp.specs,
      relatedIds: rp.related_ids,
      active: rp.active,
      monthlyRent: rp.monthly_rent,
      image: rp.image
    })) as Product[]) || [];

    // Fetch categories for head/label
    const { data: cats } = await supabase.from('categories').select('*');

    return { product, related, categories: (cats as any[]) || [] };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const categories = loaderData?.categories;
    if (!product) {
      return {
        meta: [{ title: "Produto não encontrado — Rent Fitness" }],
      };
    }
    const categoryLabel =
      categories?.find((c: any) => c.slug === product.category)?.label ?? "";
    const title = `${product.name} — Rent Fitness`;
    const description = `${product.shortDescription} ${categoryLabel}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold">Produto não encontrado</h1>
      <p className="mt-3 text-muted-foreground">
        O equipamento que você procura não está mais disponível.
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link to="/produtos">Voltar para o catálogo</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold">Algo deu errado</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-6 rounded-full">
        Tentar novamente
      </Button>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product, related, categories } = Route.useLoaderData();
  const categoryLabel =
    categories.find((c: any) => c.slug === product.category)?.label ?? "";
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const inCart = useCart((s) => s.items.some((i) => i.id === product.id));

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      categoryLabel,
    });
    toast.success("Adicionado ao orçamento", {
      description: product.name,
      action: { label: "Ver", onClick: () => setOpen(true) },
    });
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/produtos"
          search={{ categoria: product.category }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para {categoryLabel}
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full rounded-2xl object-cover border border-border"
              />
            ) : (
              <ProductPlaceholder
                category={product.category}
                iconSize={160}
                className="aspect-square"
              />
            )}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {categoryLabel}
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
              {product.name}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {product.description}
            </p>

            {product.monthlyRent && (
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-muted/40 px-5 py-3">
                <BadgeDollarSign className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Locação mensal
                  </p>
                  <p className="text-lg font-extrabold tracking-tight">
                    R${" "}
                    {product.monthlyRent.toLocaleString("pt-BR", {
                      maximumFractionDigits: 0,
                    })}
                    <span className="text-sm font-medium text-muted-foreground">
                      {" "}
                      / mês
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8">
              <Button
                size="lg"
                onClick={handleAdd}
                className="w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto"
              >
                {inCart ? (
                  <>
                    <Check className="mr-1.5 h-4 w-4" />
                    Adicionar mais 1 ao orçamento
                  </>
                ) : (
                  <>
                    <Plus className="mr-1.5 h-4 w-4" />
                    Adicionar à lista de locação
                  </>
                )}
              </Button>
            </div>

            {/* Especificações */}
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Especificações técnicas
              </h2>
              <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                {product.specs.map((s: { label: string; value: string }) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between gap-4 px-5 py-3"
                  >
                    <dt className="text-sm text-muted-foreground">{s.label}</dt>
                    <dd className="text-sm font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-SELL */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Equipamentos da mesma linha
            </h2>
            <Link
              to="/produtos"
              search={{ categoria: product.category }}
              className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
            >
              Ver tudo
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
