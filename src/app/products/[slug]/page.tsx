import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductDetailsClient } from '@/components/ProductDetailsClient';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) {
    return { title: 'Produk Tidak Ditemukan' };
  }
  return {
    title: `${product.name} | Skincare Savior`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const productImage = placeholderImages.find(p => p.id === product.image);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
       <div className="text-sm mb-6 flex items-center space-x-2 text-muted-foreground">
        <Link href="/" className="hover:text-primary">Beranda</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">Produk</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted shadow-lg">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
              data-ai-hint={productImage.imageHint}
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="space-y-4">
            <Badge variant="secondary" className="capitalize">{product.category}</Badge>
            <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
            <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-8">
            <ProductDetailsClient product={product} />
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible defaultValue='how-to-use' className="w-full">
              <AccordionItem value="how-to-use">
                <AccordionTrigger className="text-lg font-headline">Cara Penggunaan</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {product.howToUse}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger className="text-lg font-headline">Bahan-bahan</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {product.ingredients.join(', ')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="skin-concerns">
                <AccordionTrigger className="text-lg font-headline">Cocok Untuk</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                        {[...product.skinTypes, ...product.skinConcerns].map(tag => (
                            <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
                        ))}
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
