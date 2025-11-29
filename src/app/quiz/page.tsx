import { SkinQuiz } from '@/components/SkinQuiz';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export const metadata = {
    title: 'Kuis Kulit | Skincare Savior',
    description: 'Ikuti kuis singkat kami untuk mendapatkan rekomendasi perawatan kulit yang dipersonalisasi.',
};

export default function QuizPage() {
  const bgImage = placeholderImages.find(p => p.id === 'quiz-bg');
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="relative w-full max-w-2xl">
        <SkinQuiz />
      </div>
    </div>
  );
}
