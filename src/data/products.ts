export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
};

export type Product = {
  id: string;
  sku: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
};

export const categories: Category[] = [];
export const products: Product[] = [];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
