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
      error: 'Harap jelaskan masalah kulit Anda.',
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
        error: 'Tidak dapat menghasilkan rekomendasi.'
    }
  } catch (error) {
    console.error('Kesalahan Penasihat Kulit AI:', error);
    return {
      recommendations: null,
      error: 'Terjadi kesalahan tak terduga. Silakan coba lagi nanti.',
    };
  }
}
