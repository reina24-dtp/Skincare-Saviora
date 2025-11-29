"use client";

import React, { useActionState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSkincareAdvice } from '@/app/ai-advisor/actions';
import { useFormStatus } from 'react-dom';

const initialState = {
  recommendations: '',
  error: null,
};

export function AiAdvisor() {
  const [state, formAction] = useActionState(getSkincareAdvice, initialState);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Describe Your Skin</CardTitle>
        <CardDescription>
          For example: "I have very oily skin with frequent breakouts on my chin. My pores look huge."
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <Textarea
            name="userInput"
            placeholder="Tell us about your oily skin concerns..."
            rows={4}
            required
            className="text-base"
          />
          <SubmitButton />
        </form>

        {state.recommendations && (
           <Card className="mt-6 bg-background">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wand2 className="h-6 w-6 text-primary"/>
                        Your AI-Powered Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm md:prose-base max-w-none text-foreground whitespace-pre-wrap font-body">
                      {state.recommendations}
                    </div>
                </CardContent>
           </Card>
        )}

        {state.error && (
            <div className="mt-6 text-destructive text-center">
                <p>Sorry, something went wrong. Please try again.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Get Advice
        </Button>
    )
}
