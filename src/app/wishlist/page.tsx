"use client";

import { useAppContext } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { state } = useAppContext();
  const { wishlist } = state;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Your Wishlist</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Products you love, all in one place.
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your wishlist is empty</h3>
          <p className="mt-2 text-muted-foreground">
            Start browsing to find products you&apos;ll love.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
