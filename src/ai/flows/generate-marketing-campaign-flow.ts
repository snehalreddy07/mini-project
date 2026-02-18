'use server';
/**
 * @fileOverview A marketing campaign generator AI agent.
 *
 * - generateMarketingCampaign - A function that handles the marketing campaign generation process.
 * - GenerateMarketingCampaignInput - The input type for the generateMarketingCampaign function.
 * - GenerateMarketingCampaignOutput - The return type for the generateMarketingCampaign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateMarketingCampaignInputSchema = z.object({
  productDetails: z.string().describe('Detailed description of the product or service.'),
  targetAudience: z.string().describe('Detailed description of the target audience demographics and psychographics.'),
  platform: z.string().optional().describe('The marketing platform (e.g., LinkedIn, Instagram, Google Ads).'),
  marketingObjective: z.string().optional().describe('The primary objective of the campaign (e.g., lead generation, brand awareness, sales).')
});
export type GenerateMarketingCampaignInput = z.infer<typeof GenerateMarketingCampaignInputSchema>;

// Output Schema
const GenerateMarketingCampaignOutputSchema = z.object({
  campaignObjectives: z.array(z.string()).describe('A list of clear, measurable campaign objectives.'),
  contentIdeas: z.array(z.string()).describe('Five targeted content ideas suitable for the campaign.'),
  adCopyVariations: z.array(z.string()).describe('Three compelling ad copy variations.'),
  callToActionSuggestions: z.array(z.string()).describe('Specific call-to-action suggestions tailored to the campaign and platform.')
});
export type GenerateMarketingCampaignOutput = z.infer<typeof GenerateMarketingCampaignOutputSchema>;

// Tool Definition
const getMarketingContextTool = ai.defineTool(
  {
    name: 'getMarketingContext',
    description: 'Provides expert advice and best practices for marketing campaigns based on platform, target audience, or objective. Use this tool if you need more tailored guidance to create an effective campaign.',
    inputSchema: z.object({
      platform: z.string().optional().describe('The marketing platform (e.g., LinkedIn, Instagram, Google Ads).'),
      targetAudience: z.string().optional().describe('The target audience for the campaign.'),
      marketingObjective: z.string().optional().describe('The primary objective of the campaign.')
    }),
    outputSchema: z.string().describe('Contextual marketing advice and best practices.')
  },
  async (input) => {
    // This is a dummy implementation for the tool. In a real scenario, this would
    // call an internal service or a database to fetch specific marketing guidelines.
    let advice = 'Consider the following best practices:\n';
    if (input.platform === 'LinkedIn') {
      advice += '- For LinkedIn, focus on professional networking, thought leadership, and B2B specific content. Use high-quality visuals and leverage Sales Navigator.\n';
    } else if (input.platform === 'Instagram') {
      advice += '- For Instagram, emphasize visual storytelling, use high-quality images/videos, engaging stories, and relevant hashtags. Consider influencer marketing.\n';
    }
    if (input.targetAudience) {
      advice += `- When targeting "${input.targetAudience}", understand their pain points, preferred communication channels, and decision-making process. Tailor language and benefits to their specific needs.\n`;
    }
    if (input.marketingObjective === 'lead generation') {
      advice += '- For lead generation, ensure clear value propositions, strong calls-to-action leading to landing pages with forms, and follow-up sequences.\n';
    } else if (input.marketingObjective === 'brand awareness') {
      advice += '- For brand awareness, focus on consistent messaging, broad reach, engaging and shareable content, and community building.\n';
    }
    return advice + 'Use this context to enhance the campaign strategy.';
  }
);

// Prompt Definition
const marketingCampaignPrompt = ai.definePrompt({
  name: 'marketingCampaignPrompt',
  input: { schema: GenerateMarketingCampaignInputSchema },
  output: { schema: GenerateMarketingCampaignOutputSchema },
  tools: [getMarketingContextTool], // Make the tool available to the prompt
  prompt: `You are Tech Sales AI, an expert marketing strategist.
Your goal is to generate a comprehensive, data-driven marketing campaign strategy.

If you need additional context or guidance on best practices for the given platform, target audience, or marketing objective, you may use the 'getMarketingContext' tool to retrieve expert advice. Incorporate any relevant information obtained from the tool into your strategy.

Based on the following details, create a detailed marketing campaign strategy.

Product Details:
{{{productDetails}}}

Target Audience:
{{{targetAudience}}}

{{#if platform}}
Marketing Platform:
{{{platform}}}
{{/if}}

{{#if marketingObjective}}
Marketing Objective:
{{{marketingObjective}}}
{{/if}}

Please provide the following in a structured JSON format:
1.  A list of 2-3 clear and measurable campaign objectives.
2.  Five distinct and targeted content ideas.
3.  Three variations of compelling ad copy, suitable for the specified platform if provided.
4.  Three specific call-to-action suggestions.

Ensure the output is valid JSON and directly matches the 'GenerateMarketingCampaignOutputSchema' structure.`
});

// Flow Definition
const generateMarketingCampaignFlow = ai.defineFlow(
  {
    name: 'generateMarketingCampaignFlow',
    inputSchema: GenerateMarketingCampaignInputSchema,
    outputSchema: GenerateMarketingCampaignOutputSchema
  },
  async (input) => {
    const { output } = await marketingCampaignPrompt(input);
    if (!output) {
      throw new Error('Failed to generate marketing campaign output.');
    }
    return output;
  }
);

// Wrapper function
export async function generateMarketingCampaign(input: GenerateMarketingCampaignInput): Promise<GenerateMarketingCampaignOutput> {
  return generateMarketingCampaignFlow(input);
}
