"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, slug, price, image: imageId } = product;
  const productImage = placeholderImages.find(p => p.id === imageId);
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <Card className="group relative overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-lg">
      <Link href={`/products/${slug}`} className="block">
        <CardContent className="p-0">
          <div className="aspect-square w-full overflow-hidden bg-muted">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={name}
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-headline font-semibold leading-tight truncate">{name}</h3>
            <p className="mt-2 text-base font-semibold text-foreground">
              ${price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Link>
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="icon" variant="secondary" className="rounded-full h-9 w-9" onClick={handleToggleWishlist}>
           <Heart className={cn("h-4 w-4", inWishlist ? "fill-primary text-primary" : "text-foreground")} />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full h-9 w-9" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4 text-foreground" />
        </Button>
      </div>
    </Card>
  );
}
