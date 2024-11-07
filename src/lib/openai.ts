import OpenAI from 'openai';
import { Category } from '../data/dares';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const categoryPrompts = {
  kind: "Generate a kind and wholesome dare that brings people together or makes someone's day better. It should be fun and positive.",
  wacky: "Generate a silly and entertaining dare that's fun and harmless. It should make people laugh but not be embarrassing.",
  brutal: "Generate a challenging dare that's embarrassing but not harmful. It should be funny and push people out of their comfort zone while staying appropriate."
};

export async function generateAIDare(category: Category): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative dare generator. Generate short, fun, and appropriate dares based on the category. Keep responses under 100 characters."
        },
        {
          role: "user",
          content: categoryPrompts[category]
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || "Share a funny story about your most embarrassing moment";
  } catch (error) {
    console.error('Error generating AI dare:', error);
    throw new Error('Failed to generate dare');
  }
}