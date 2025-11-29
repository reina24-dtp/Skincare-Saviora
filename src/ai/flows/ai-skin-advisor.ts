'use server';

/**
 * @fileOverview This file defines the AI Skin Advisor flow, which provides product recommendations for users with oily skin.
 *
 * @exports aiSkinAdvisor - A function that takes user input and returns skincare product recommendations.
 * @exports AISkinAdvisorInput - The input type for the aiSkinAdvisor function.
 * @exports AISkinAdvisorOutput - The output type for the aiSkinAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISkinAdvisorInputSchema = z.object({
  userInput: z
    .string()
    .describe('Masukan pengguna yang menjelaskan kebutuhan dan preferensi perawatan kulit mereka.'),
});
export type AISkinAdvisorInput = z.infer<typeof AISkinAdvisorInputSchema>;

const AISkinAdvisorOutputSchema = z.object({
  productRecommendations: z
    .string()
    .describe(
      'Daftar rekomendasi produk perawatan kulit yang cocok untuk kulit berminyak, berdasarkan masukan pengguna.'
    ),
});
export type AISkinAdvisorOutput = z.infer<typeof AISkinAdvisorOutputSchema>;

export async function aiSkinAdvisor(input: AISkinAdvisorInput): Promise<AISkinAdvisorOutput> {
  return aiSkinAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSkinAdvisorPrompt',
  input: {schema: AISkinAdvisorInputSchema},
  output: {schema: AISkinAdvisorOutputSchema},
  prompt: `Anda adalah seorang penasihat perawatan kulit yang berspesialisasi pada kulit berminyak. Berdasarkan masukan pengguna, rekomendasikan 3-5 produk perawatan kulit yang sesuai dengan jenis dan masalah kulit mereka. Jelaskan mengapa setiap produk direkomendasikan. Jawab dalam Bahasa Indonesia.

Masukan Pengguna: {{{userInput}}}`,
});

const aiSkinAdvisorFlow = ai.defineFlow(
  {
    name: 'aiSkinAdvisorFlow',
    inputSchema: AISkinAdvisorInputSchema,
    outputSchema: AISkinAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
