"use client";

import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { state, removeFromCart, updateCartQuantity, clearCart } = useAppContext();
  const { cart } = state;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 5.00; // Flat rate shipping
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Keranjang Belanja</h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => {
              const productImage = placeholderImages.find(p => p.id === item.product.image);
              return (
                <Card key={item.product.id} className="flex items-center p-4">
                  <div className="flex-1 flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                    <div className="w-24 h-24 aspect-square rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {productImage && (
                        <Image
                          src={productImage.imageUrl}
                          alt={item.product.name}
                          width={100}
                          height={100}
                          className="object-cover h-full w-full"
                          data-ai-hint={productImage.imageHint}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">{item.product.name}</Link>
                      <p className="text-muted-foreground text-sm">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2 sm:hidden">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input type="number" value={item.quantity} className="w-14 h-8 text-center" readOnly/>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={item.quantity} className="w-14 h-8 text-center" readOnly/>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold w-20 text-right mx-4 hidden md:block">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </Card>
              );
            })}
             <Button variant="outline" onClick={clearCart}>Kosongkan Keranjang</Button>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-20 shadow-lg">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pengiriman</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full">Lanjutkan ke Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Keranjang Anda kosong</h3>
          <p className="mt-2 text-muted-foreground">
            Sepertinya Anda belum menambahkan produk apa pun.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Mulai Belanja</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
