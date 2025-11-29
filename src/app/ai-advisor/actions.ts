"use server";

import { aiSkinAdvisor } from '@/ai/flows/ai-skin-advisor';

interface FormState {
  recommendations: string | null;
  error: string | null;
}

export async function getSkincareAdvice(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const userInput = formData.get('userInput') as string;

  if (!userInput) {
    return {
      recommendations: null,
      error: 'Please describe your skin concerns.',
    };
  }

  try {
    const result = await aiSkinAdvisor({ userInput });
    if (result?.productRecommendations) {
      return {
        recommendations: result.productRecommendations,
        error: null,
      };
    }
    return {
        recommendations: null,
        error: 'Could not generate recommendations.'
    }
  } catch (error) {
    console.error('AI Skin Advisor error:', error);
    return {
      recommendations: null,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
