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
    question: 'How does your skin feel an hour after washing?',
    options: [
      { label: 'Tight and flaky', value: 'dry' },
      { label: 'Shiny and slick', value: 'oily' },
      { label: 'A bit of both (e.g., oily T-zone)', value: 'combination' },
      { label: 'Comfortable, but easily irritated', value: 'sensitive' },
    ],
  },
  {
    id: 'skinConcern',
    question: 'What is your primary skin concern?',
    options: [
      { label: 'Pimples and breakouts', value: 'acne' },
      { label: 'Dull, tired-looking skin', value: 'dullness' },
      { label: 'Fine lines and wrinkles', value: 'aging' },
      { label: 'Uneven tone or dark spots', value: 'dark spots' },
      { label: 'Visible, large pores', value: 'large pores' },
    ],
  },
   {
    id: 'sensitivity',
    question: 'How sensitive is your skin to new products?',
    options: [
      { label: 'Very sensitive, reacts often', value: 'high' },
      { label: 'Somewhat sensitive', value: 'medium' },
      { label: 'Not sensitive at all', value: 'low' },
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
          <CardTitle className="text-3xl font-headline">Your Personalized Recommendations</CardTitle>
          <CardDescription>Based on your answers, here are some products we think you&apos;ll love.</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <p className="text-center text-muted-foreground">Sorry, we couldn&apos;t find any specific recommendations. Try exploring all products!</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={restartQuiz}>Take Quiz Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <Progress value={progress} className="w-full mb-4" />
        <CardTitle className="text-3xl font-headline text-center">
          {step < quizQuestions.length ? `Question ${step + 1}` : 'Ready for your results?'}
        </CardTitle>
        <CardDescription className="text-center text-lg">
          {step < quizQuestions.length ? quizQuestions[step].question : "We've analyzed your answers. Let's see your matches!"}
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
            <Button size="lg" onClick={calculateRecommendations}>View My Products</Button>
          </div>
        )}
      </CardContent>
      {step > 0 && step <= quizQuestions.length && (
         <CardFooter>
            <Button variant="link" onClick={() => setStep(step - 1)}>Back</Button>
        </CardFooter>
      )}
    </Card>
  );
}
