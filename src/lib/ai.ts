import { Message } from '@/components/chatbot/Chat';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function completion(messages: Message[]) {
  const chatCompletion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-4o',
  });

  return chatCompletion;
}

export type Metadata = {
  title: string;
  link: string;
};

export type Source = {
  content: string;
  metadata: Metadata;
};
