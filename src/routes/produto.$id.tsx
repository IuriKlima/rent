import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  type Product,
} from "@/data/products";
import { supabase } from "@/lib/supabase";
import { ProductPlaceholder } from "@/components/product/ProductPlaceholder";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { ArrowLeft, Plus, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$id")({
  loader: async ({ params }) => {
    const { data: p, error } = await supabase
      .from('rss_products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !p) throw notFound();

    const product: Product = {
      id: p.id,
      sku: p.sku || '',
      title: p.title,
      category: p.category,
      subcategory: p.subcategory || '',
      description: p.description,
      imageUrl: p.imageUrl
    };

    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return {
        meta: [{ title: "Produto não encontrado — Rent Fitness" }],
      };
    }
    const categoryLabel = product.category;
    const title = `${product.title} — Rent Fitness`;
    const description = `${product.description} ${categoryLabel}.`;
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
  const { product } = Route.useLoaderData();
  const categoryLabel = product.category;
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const inCart = useCart((s) => s.items.some((i) => i.id === product.id));

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.title,
      category: product.category,
      categoryLabel,
    });
    toast.success("Adicionado ao orçamento", {
      description: product.title,
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
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
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
              {product.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {product.description}
            </p>

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
          </div>
        </div>
      </section>
    </div>
  );
}
