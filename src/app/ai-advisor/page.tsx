import { Sparkles } from 'lucide-react';
import { AiAdvisor } from '@/components/AiAdvisor';

export const metadata = {
  title: 'Penasihat Kulit AI | Skincare Savior',
  description: 'Dapatkan rekomendasi perawatan kulit instan bertenaga AI untuk kulit berminyak.',
};

export default function AiAdvisorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          Penasihat Kulit AI
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Jelaskan masalah kulit Anda, dan AI kami akan menyarankan produk terbaik untuk Anda.
          Saat ini dioptimalkan untuk <span className="font-semibold text-primary">kulit berminyak</span>.
        </p>
      </div>

      <AiAdvisor />

    </div>
  );
}
