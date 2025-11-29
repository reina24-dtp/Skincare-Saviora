"use client";

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface ProductGridProps {
  allProducts: Product[];
  filters: {
    search: string;
    categories: string[];
    skinTypes: string[];
    skinConcerns: string[];
    brands: string[];
  }
}

export function ProductGrid({ allProducts, filters }: ProductGridProps) {
  const [sortOrder, setSortOrder] = useState('featured');

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(p => {
        if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
            return false;
        }
        if (filters.skinTypes.length > 0 && !p.skinTypes.some(st => filters.skinTypes.includes(st))) {
            return false;
        }
        if (filters.skinConcerns.length > 0 && !p.skinConcerns.some(sc => filters.skinConcerns.includes(sc))) {
            return false;
        }
        if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
            return false;
        }
        return true;
    });

    let sorted = [...products];
    if (sortOrder === 'price-asc') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [allProducts, filters, sortOrder]);
  
  const handleSortChange = (value: string) => {
    setSortOrder(value);
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
