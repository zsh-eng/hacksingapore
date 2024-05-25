import { ChatbotMessageList, Message } from '@/components/chatbot/Chat';

const messages: Message[] = [
  {
    message: 'hello there',
    role: 'user',
  },
  {
    message: 'nice to meet you',
    role: 'assistant',
  },
];

export default function Page() {
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <ChatbotMessageList messages={messages} />
    </main>
  );
}
