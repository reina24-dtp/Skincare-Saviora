import { Gift, Recycle, UploadCloud } from 'lucide-react';
import { VoucherProgram } from '@/components/VoucherProgram';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Voucher Program | Skincare Savior',
  description: 'Recycle your empty containers and earn rewards.',
};

export default function VouchersPage() {
  const bannerImage = placeholderImages.find(p => p.id === 'voucher-banner');
  return (
    <div>
       <section className="relative bg-card py-20 md:py-28 text-center">
         {bannerImage && (
            <Image 
                src={bannerImage.imageUrl}
                alt={bannerImage.description}
                layout="fill"
                objectFit="cover"
                className="opacity-10"
                data-ai-hint={bannerImage.imageHint}
            />
         )}
         <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Recycle & Earn Vouchers</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Join our sustainability program. Turn your empties into discounts for your next purchase.
            </p>
         </div>
       </section>

       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                 <h2 className="text-3xl font-headline font-bold">How It Works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UploadCloud className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">1. Upload a Photo</h3>
                    <p className="text-muted-foreground">Submit a photo of your empty product container using the form below.</p>
                </div>
                <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Recycle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">2. We Verify</h3>
                    <p className="text-muted-foreground">Our team will verify your submission within 24-48 hours.</p>
                </div>
                <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Gift className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">3. Get Your Voucher</h3>
                    <p className="text-muted-foreground">Once approved, a discount voucher will be added to your account.</p>
                </div>
            </div>
        </div>
       </section>

      <div className="container mx-auto max-w-4xl px-4 pb-20">
        <VoucherProgram />
      </div>
    </div>
  );
}
