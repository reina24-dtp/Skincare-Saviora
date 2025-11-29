"use client";

import Link from 'next/link';
import { Heart, Menu, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';

const navLinks = [
  { href: '/products', label: 'Produk' },
  { href: '/quiz', label: 'Kuis Kulit' },
  { href: '/ai-advisor', label: 'Penasihat AI' },
  { href: '/vouchers', label: 'Voucher' },
];

export function Header() {
  const { state } = useAppContext();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = state.wishlist.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Skincare Savior
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Buka Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setSheetOpen(false)}>
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">Skincare Savior</span>
            </Link>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground"
                  onClick={() => setSheetOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center gap-2">
             <Button asChild variant="ghost" size="icon">
                <Link href="/wishlist">
                    <div className="relative">
                        <Heart className="h-5 w-5" />
                        {wishlistItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {wishlistItemCount}
                            </span>
                        )}
                    </div>
                    <span className="sr-only">Daftar Keinginan</span>
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
                <Link href="/cart">
                    <div className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                    <span className="sr-only">Keranjang Belanja</span>
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
