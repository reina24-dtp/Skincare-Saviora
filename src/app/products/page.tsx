import { products } from '@/lib/products';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductGrid } from '@/components/ProductGrid';
import { SkinConcern, SkinType, ProductCategory } from '@/lib/types';

export const metadata = {
  title: 'All Products | Skincare Savior',
  description: 'Browse our full collection of skincare products.',
};

const skinTypes = [...new Set(products.flatMap(p => p.skinTypes))] as SkinType[];
const skinConcerns = [...new Set(products.flatMap(p => p.skinConcerns))] as SkinConcern[];
const categories = [...new Set(products.map(p => p.category))] as ProductCategory[];
const brands = [...new Set(products.map(p => p.brand))];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          Discover Your Perfect Skincare
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Filter by your needs to find products that truly work for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilters 
            skinTypes={skinTypes}
            skinConcerns={skinConcerns}
            categories={categories}
            brands={brands}
          />
        </aside>
        <main className="lg:col-span-3">
          <ProductGrid allProducts={products} />
        </main>
      </div>
    </div>
  );
}
