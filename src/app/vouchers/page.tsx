import { Gift, Recycle, UploadCloud } from 'lucide-react';
import { VoucherProgram } from '@/components/VoucherProgram';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Program Voucher | Skincare Savior',
  description: 'Daur ulang wadah kosong Anda dan dapatkan hadiah.',
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
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Daur Ulang & Dapatkan Voucher</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Bergabunglah dengan program keberlanjutan kami. Ubah barang kosong Anda menjadi diskon untuk pembelian berikutnya.
            </p>
         </div>
       </section>

       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                 <h2 className="text-3xl font-headline font-bold">Cara Kerjanya</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UploadCloud className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">1. Unggah Foto</h3>
                    <p className="text-muted-foreground">Kirim foto wadah produk kosong Anda menggunakan formulir di bawah ini.</p>
                </div>
                <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Recycle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">2. Kami Verifikasi</h3>
                    <p className="text-muted-foreground">Tim kami akan memverifikasi kiriman Anda dalam 24-48 jam.</p>
                </div>
                <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Gift className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">3. Dapatkan Voucher Anda</h3>
                    <p className="text-muted-foreground">Setelah disetujui, voucher diskon akan ditambahkan ke akun Anda.</p>
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
