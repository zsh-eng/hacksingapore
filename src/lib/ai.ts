import { Message } from '@/components/chatbot/Chat';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
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

export type Metadata = {
  title: string;
  link: string;
};

export type Source = {
  pageContent: string;
  metadata: Metadata;
};
