"use client";

import { useState } from 'react';
import { products } from '@/lib/products';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductGrid } from '@/components/ProductGrid';
import { SkinConcern, SkinType, ProductCategory } from '@/lib/types';

const allSkinTypes = [...new Set(products.flatMap(p => p.skinTypes))] as SkinType[];
const allSkinConcerns = [...new Set(products.flatMap(p => p.skinConcerns))] as SkinConcern[];
const allCategories = [...new Set(products.map(p => p.category))] as ProductCategory[];
const allBrands = [...new Set(products.map(p => p.brand))];

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    skinTypes: [],
    skinConcerns: [],
    brands: [],
  });

  const handleFilterChange = (filterType: keyof typeof filters, value: string | string[]) => {
    setFilters(prev => ({
        ...prev,
        [filterType]: value
    }));
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          Temukan Perawatan Kulit Sempurna Anda
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Filter berdasarkan kebutuhan Anda untuk menemukan produk yang benar-benar cocok untuk Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilters 
            skinTypes={allSkinTypes}
            skinConcerns={allSkinConcerns}
            categories={allCategories}
            brands={allBrands}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <main className="lg:col-span-3">
          <ProductGrid allProducts={products} filters={filters} />
        </main>
      </div>
    </div>
  );
}
