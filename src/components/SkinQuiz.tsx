"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';
import type { SkinType, SkinConcern } from '@/lib/types';

const quizQuestions = [
  {
    id: 'skinType',
    question: 'Bagaimana rasanya kulit Anda satu jam setelah dicuci?',
    options: [
      { label: 'Kencang dan bersisik', value: 'dry' },
      { label: 'Mengkilap dan licin', value: 'oily' },
      { label: 'Sedikit keduanya (mis., zona-T berminyak)', value: 'combination' },
      { label: 'Nyaman, tapi mudah iritasi', value: 'sensitive' },
    ],
  },
  {
    id: 'skinConcern',
    question: 'Apa masalah utama kulit Anda?',
    options: [
      { label: 'Jerawat dan bruntusan', value: 'acne' },
      { label: 'Kulit kusam dan terlihat lelah', value: 'dullness' },
      { label: 'Garis halus dan kerutan', value: 'aging' },
      { label: 'Warna kulit tidak merata atau noda hitam', value: 'dark spots' },
      { label: 'Pori-pori terlihat besar', value: 'large pores' },
    ],
  },
   {
    id: 'sensitivity',
    question: 'Seberapa sensitif kulit Anda terhadap produk baru?',
    options: [
      { label: 'Sangat sensitif, sering bereaksi', value: 'high' },
      { label: 'Agak sensitif', value: 'medium' },
      { label: 'Tidak sensitif sama sekali', value: 'low' },
    ],
  },
];

type Answers = {
  skinType?: SkinType;
  skinConcern?: SkinConcern;
  sensitivity?: 'high' | 'medium' | 'low';
};

export function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [recommendations, setRecommendations] = useState<typeof products>([]);

  const handleAnswer = (questionId: keyof Answers, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < quizQuestions.length) {
      setStep(step + 1);
    }
  };

  const calculateRecommendations = () => {
    const { skinType, skinConcern } = answers;
    
    if (!skinType || !skinConcern) {
      setRecommendations([]);
      return;
    }
    
    const filtered = products.filter(p => {
      const typeMatch = p.skinTypes.includes(skinType);
      const concernMatch = p.skinConcerns.includes(skinConcern);
      return typeMatch && concernMatch;
    });

    const categoriesInResults: string[] = [];
    const uniqueCategoryProducts = filtered.filter(p => {
        if (!categoriesInResults.includes(p.category)) {
            categoriesInResults.push(p.category);
            return true;
        }
        return false;
    });
    
    setRecommendations(uniqueCategoryProducts.slice(0, 4));
    setStep(step + 1); // Move to results view
  };

  const restartQuiz = () => {
    setStep(0);
    setAnswers({});
    setRecommendations([]);
  }

  const progress = (step / quizQuestions.length) * 100;

  if (step > quizQuestions.length) {
    return (
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Rekomendasi Pribadi Anda</CardTitle>
          <CardDescription>Berdasarkan jawaban Anda, berikut adalah beberapa produk yang kami pikir akan Anda sukai.</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <p className="text-center text-muted-foreground">Maaf, kami tidak dapat menemukan rekomendasi spesifik. Coba jelajahi semua produk!</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={restartQuiz}>Ulangi Kuis</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <Progress value={progress} className="w-full mb-4" />
        <CardTitle className="text-3xl font-headline text-center">
          {step < quizQuestions.length ? `Pertanyaan ${step + 1}` : 'Siap untuk hasil Anda?'}
        </CardTitle>
        <CardDescription className="text-center text-lg">
          {step < quizQuestions.length ? quizQuestions[step].question : "Kami telah menganalisis jawaban Anda. Mari kita lihat kecocokan Anda!"}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[150px] flex items-center">
        {step < quizQuestions.length ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quizQuestions[step].options.map(option => (
              <Button
                key={option.value}
                variant="outline"
                className="h-auto py-4 text-base whitespace-normal"
                onClick={() => handleAnswer(quizQuestions[step].id as keyof Answers, option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="w-full text-center">
            <Button size="lg" onClick={calculateRecommendations}>Lihat Produk Saya</Button>
          </div>
        )}
      </CardContent>
      {step > 0 && step <= quizQuestions.length && (
         <CardFooter>
            <Button variant="link" onClick={() => setStep(step - 1)}>Kembali</Button>
        </CardFooter>
      )}
    </Card>
  );
}
