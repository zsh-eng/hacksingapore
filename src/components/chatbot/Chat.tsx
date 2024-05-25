import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2, LoaderCircle, SendHorizonal } from 'lucide-react';
import { completion } from '@/lib/ai';

type Role = 'user' | 'assistant';

type ChatbotMessageProps = {
  message: string;
  role?: Role;
};

function AssistantAvatar() {
  return (
    <Avatar className='w-8 h-8 mt-1'>
      <AvatarImage src='https://github.com/shadcn.png' />
      <AvatarFallback>BOT</AvatarFallback>
    </Avatar>
  );
}

function UserAvatar() {
  return (
    <Avatar className='w-8 h-8 mt-1'>
      <AvatarImage src='https://avatars.githubusercontent.com/u/49238630?v=4' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

function RoleAvatar({ role }: { role: Role }) {
  return role === 'assistant' ? <AssistantAvatar /> : <UserAvatar />;
}

/**
 * A single chatbot message
 */
export function ChatbotMessage({
  message,
  role = 'assistant',
}: ChatbotMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-4 items-start w-[600px] px-4 py-2',
        role === 'assistant' && 'bg-muted'
      )}
    >
      <RoleAvatar role={role} />
      <div>
        <p className='text-wrap'>{message}</p>
      </div>
    </div>
  );
}

export type Message = {
  content: string;
  role: Role;
};

type ChatbotMessageListProps = {
  messages: Message[];
};

/**
 * A list of chatbot mesasges
 */
export function ChatbotMessageList({ messages }: ChatbotMessageListProps) {
  return (
    <div className='flex flex-col'>
      {messages.map((message, i) => {
        const isLast = i === messages.length - 1;
        return (
          <>
            <ChatbotMessage
              key={message.content}
              message={message.content}
              role={message.role}
            />
            {!isLast && <Separator />}
          </>
        );
      })}
    </div>
  );
}

const initialMessages: Message[] = [
  {
    content: 'hello there',
    role: 'user',
  },
  {
    content: 'nice to meet you',
    role: 'assistant',
  },
];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const userMessage: Message = {
      content: input,
      role: 'user',
    };

    try {
      const message = await completion([...messages, userMessage]);
      setMessages([
        ...messages,
        userMessage,
        {
          content: message.choices[0].message.content ?? '',
          role: 'assistant',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col group'>
      <ChatbotMessageList messages={messages} />
      <Textarea
        className='text-md mt-4'
        placeholder='Type a message...'
        onChange={(e) => setInput(e.currentTarget.value)}
        value={input}
      />
      <Button
        variant='secondary'
        className='mt-2'
        disabled={loading}
        onClick={handleSend}
      >
        Send
        {loading ? (
          <Loader2 className='h-4 w-4 ml-2 transition-all animate-spin' />
        ) : (
          <SendHorizonal className='h-4 w-4 ml-2 text-cyan-700 group-hover:translate-x-1 transition-all' />
        )}
      </Button>
    </div>
  );
}
