"use client";

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ProductGridProps {
  allProducts: Product[];
}

export function ProductGrid({ allProducts }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [sortOrder, setSortOrder] = useState('featured');

  // Placeholder for filter state
  const [filters, setFilters] = useState({
    search: '',
    // Add other filters like category, skinType etc.
  });

  // A more complex filtering logic would go here
  // For now, we'll just show all products.
  
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    let sorted = [...filteredProducts];
    if (value === 'price-asc') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (value === 'name-asc') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sorted);
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
            <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="text-sm">Sort by:</Label>
                <Select value={sortOrder} onValueChange={handleSortChange}>
                    <SelectTrigger id="sort-by" className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Alphabetical</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <h3 className="text-2xl font-semibold">No products found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
        )}
    </div>
  );
}
