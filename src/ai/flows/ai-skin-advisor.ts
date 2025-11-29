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
    .describe('The user input describing their skincare needs and preferences.'),
});
export type AISkinAdvisorInput = z.infer<typeof AISkinAdvisorInputSchema>;

const AISkinAdvisorOutputSchema = z.object({
  productRecommendations: z
    .string()
    .describe(
      'A list of skincare product recommendations suitable for oily skin, based on the user input.'
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
  prompt: `You are a skincare advisor specializing in oily skin. Based on the user's input, recommend 3-5 skincare products that would be suitable for their skin type and concerns. Explain why each product is recommended.

User Input: {{{userInput}}}`,
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
