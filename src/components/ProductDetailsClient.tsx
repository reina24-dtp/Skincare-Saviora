"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-medium">Quantity</label>
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="h-10 w-10">
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-10 w-16 text-center border-0 focus-visible:ring-0"
            min="1"
          />
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="h-10 w-10">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="flex-1" onClick={() => addToCart(product, quantity)}>
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => toggleWishlist(product)}>
           <Heart className={cn("mr-2 h-5 w-5", inWishlist && "fill-primary text-primary")} />
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>
    </div>
  );
}
