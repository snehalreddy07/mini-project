'use server';
/**
 * @fileOverview A lead qualification and scoring AI agent.
 *
 * - scoreLeadQualification - A function that handles the lead scoring process.
 * - ScoreLeadQualificationInput - The input type for the scoreLeadQualification function.
 * - ScoreLeadQualificationOutput - The return type for the scoreLeadQualification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreLeadQualificationInputSchema = z.object({
  budget: z.string().describe('The budget provided by the potential customer, e.g., "$50,000 budget".'),
  implementationNeeds: z
    .string()
    .describe('The stated implementation needs of the potential customer, e.g., "immediate implementation needs".'),
  urgency: z.string().describe('The urgency level expressed by the potential customer, e.g., "high urgency".'),
  customerDetails: z
    .string()
    .optional()
    .describe('Any other relevant details about the potential customer or their inquiry.'),
});
export type ScoreLeadQualificationInput = z.infer<typeof ScoreLeadQualificationInputSchema>;

const ScoreLeadQualificationOutputSchema = z.object({
  leadScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A quantified score from 0-100, indicating the quality and potential of the lead.'),
  reasoning: z
    .string()
    .describe('Detailed reasoning and justification for the assigned lead score, covering key attributes.'),
  probabilityOfConversion: z
    .number()
    .min(0)
    .max(100)
    .describe('The estimated probability (0-100%) that this lead will convert into a customer.'),
});
export type ScoreLeadQualificationOutput = z.infer<typeof ScoreLeadQualificationOutputSchema>;

export async function scoreLeadQualification(
  input: ScoreLeadQualificationInput
): Promise<ScoreLeadQualificationOutput> {
  return scoreLeadQualificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreLeadQualificationPrompt',
  input: {schema: ScoreLeadQualificationInputSchema},
  output: {schema: ScoreLeadQualificationOutputSchema},
  prompt: `You are an expert in sales and lead qualification, specializing in B2B software solutions.
Your task is to analyze lead attributes and provide a comprehensive assessment, including a quantified lead score, detailed reasoning, and the probability of conversion.

Analyze the following lead attributes:
Budget: {{{budget}}}
Implementation Needs: {{{implementationNeeds}}}
Urgency: {{{urgency}}}
{{#if customerDetails}}Other Customer Details: {{{customerDetails}}}{{/if}}

Based on these attributes, provide:
1. A 'leadScore' from 0-100, where 100 is an extremely high-quality lead.
2. 'reasoning' that explains why the lead received this score, highlighting the positive and negative aspects.
3. A 'probabilityOfConversion' from 0-100%, representing the likelihood of this lead closing.`,
});

const scoreLeadQualificationFlow = ai.defineFlow(
  {
    name: 'scoreLeadQualificationFlow',
    inputSchema: ScoreLeadQualificationInputSchema,
    outputSchema: ScoreLeadQualificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get lead qualification output from the model.');
    }
    return output;
  }
);
