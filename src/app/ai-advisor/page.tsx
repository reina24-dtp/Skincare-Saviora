import { Sparkles } from 'lucide-react';
import { AiAdvisor } from '@/components/AiAdvisor';

export const metadata = {
  title: 'AI Skin Advisor | Skincare Savior',
  description: 'Get instant, AI-powered skincare recommendations for oily skin.',
};

export default function AiAdvisorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          AI Skin Advisor
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Describe your skin concerns, and our AI will suggest the best products for you. 
          Currently optimized for <span className="font-semibold text-primary">oily skin</span>.
        </p>
      </div>

      <AiAdvisor />

    </div>
  );
}
