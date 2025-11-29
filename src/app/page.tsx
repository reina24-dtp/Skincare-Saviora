import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { placeholderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = placeholderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full bg-card py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl font-headline font-bold tracking-tight text-card-foreground sm:text-5xl lg:text-6xl">
                Penyelamat Perawatan Kulit Pribadi Anda
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Bingung soal perawatan kulit? Ikuti kuis singkat kami untuk menemukan produk yang sempurna untuk jenis dan masalah kulit unik Anda.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center md:justify-start">
                <Button asChild size="lg" className="font-headline">
                  <Link href="/quiz">
                    Ikuti Kuis Kulit <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="font-headline">
                  <Link href="/products">Lihat Semua Produk</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 w-full md:h-auto md:aspect-square rounded-lg overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Produk Unggulan</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Pilihan terbaik yang disukai oleh komunitas kami.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/products">Lihat Semua Produk</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-3 items-center text-center">
            <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold">Penasihat Kulit AI</h3>
                <p className="text-muted-foreground">Dapatkan rekomendasi produk instan dari AI kami untuk masalah kulit spesifik Anda.</p>
                <Button asChild variant="link" className="text-primary">
                    <Link href="/ai-advisor">Coba Sekarang <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold">Daur Ulang & Dapatkan Poin</h3>
                <p className="text-muted-foreground">Ubah wadah produk kosong Anda menjadi voucher diskon untuk pembelian berikutnya.</p>
                <Button asChild variant="link" className="text-primary">
                    <Link href="/vouchers">Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold">Disesuaikan Untuk Anda</h3>
                <p className="text-muted-foreground">Temukan rutinitas yang berhasil, dengan produk yang difilter untuk jenis kulit Anda.</p>
                <Button asChild variant="link" className="text-primary">
                    <Link href="/products">Jelajahi Produk <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
