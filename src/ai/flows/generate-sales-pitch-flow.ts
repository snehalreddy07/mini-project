'use server';
/**
 * @fileOverview A sales pitch generation AI agent.
 *
 * - generateSalesPitch - A function that generates a personalized sales pitch.
 * - GenerateSalesPitchInput - The input type for the generateSalesPitch function.
 * - GenerateSalesPitchOutput - The return type for the generateSalesPitch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSalesPitchInputSchema = z.object({
  customerDetails: z
    .string()
    .describe('Detailed information about the target customer or prospect.'),
  productDetails: z
    .string()
    .describe('Detailed information about the product or service being pitched.'),
});
export type GenerateSalesPitchInput = z.infer<typeof GenerateSalesPitchInputSchema>;

const GenerateSalesPitchOutputSchema = z.object({
  elevatorPitch: z
    .string()
    .describe('A concise, 30-second elevator pitch for the product.'),
  valueProposition: z
    .string()
    .describe('A clear and compelling value proposition.'),
  keyDifferentiators: z
    .string()
    .describe('Key differentiators that address the customer\'s pain points and set the product apart.'),
});
export type GenerateSalesPitchOutput = z.infer<typeof GenerateSalesPitchOutputSchema>;

export async function generateSalesPitch(
  input: GenerateSalesPitchInput
): Promise<GenerateSalesPitchOutput> {
  return generateSalesPitchFlow(input);
}

const generateSalesPitchPrompt = ai.definePrompt({
  name: 'generateSalesPitchPrompt',
  input: {schema: GenerateSalesPitchInputSchema},
  output: {schema: GenerateSalesPitchOutputSchema},
  prompt: `You are an expert sales representative tasked with creating a personalized and compelling sales pitch.

Generate the following components of a sales pitch based on the provided product and customer details:
1.  A concise, 30-second elevator pitch.
2.  A clear value proposition.
3.  Key differentiators that highlight how the product addresses the customer's pain points and stands out from competitors.

Customer Details: {{{customerDetails}}}
Product Details: {{{productDetails}}}

Ensure the pitch is tailored to the customer and emphasizes the unique benefits of the product.`,
});

const generateSalesPitchFlow = ai.defineFlow(
  {
    name: 'generateSalesPitchFlow',
    inputSchema: GenerateSalesPitchInputSchema,
    outputSchema: GenerateSalesPitchOutputSchema,
  },
  async input => {
    const {output} = await generateSalesPitchPrompt(input);
    return output!;
  }
);
