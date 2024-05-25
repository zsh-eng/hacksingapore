import { Message } from '@/components/chatbot/Chat';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { z } from 'zod';

export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function completion(messages: Message[]) {
  const chatMessages: ChatCompletionMessageParam[] = messages.map(
    ({ content, role }) => ({ content, role })
  );

  const chatCompletion = await openai.chat.completions.create({
    messages: chatMessages,
    model: 'gpt-4o',
  });

  return chatCompletion;
}

const sourceTypes = [
  'dbs',
  'dollarsandsense',
  'posb',
  'cpf',
  'moh',
  'homage',
  'wikipedia',
  'mymoneysense',
] as const;

export type SourceType = (typeof sourceTypes)[number];

export type Metadata = {
  type: SourceType;
  link: string;
};

export type Source = {
  pageContent: string;
  metadata: Metadata;
};

export const sourceSchema = z.object({
  pageContent: z.string(),
  metadata: z.object({
    type: z.enum(sourceTypes),
    link: z.string(),
  }),
});
