import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { ProductPlaceholder } from "./ProductPlaceholder";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const categoryLabel =
    categories.find((c) => c.slug === product.category)?.label ?? product.category;

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      categoryLabel,
    });
    toast.success("Adicionado ao orçamento", {
      description: product.name,
      action: {
        label: "Ver",
        onClick: () => setOpen(true),
      },
    });
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl"
    >
      <Link
        to="/produto/$id"
        params={{ id: product.id }}
        className="block"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        {product.image ? (
          <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <ProductPlaceholder category={product.category} className="rounded-none" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {categoryLabel}
        </span>
        <h3 className="mt-1 text-lg font-bold tracking-tight">
          <Link
            to="/produto/$id"
            params={{ id: product.id }}
            className="hover:text-primary transition"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <Link to="/produto/$id" params={{ id: product.id }}>
              Detalhes <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={handleAdd}
            className="ml-auto rounded-full bg-primary text-primary-foreground hover:opacity-90"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Orçar
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
