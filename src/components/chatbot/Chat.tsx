import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Fragment, useState } from 'react';
import { Loader2, LoaderCircle, Phone, SendHorizonal } from 'lucide-react';
import { Source, completion } from '@/lib/ai';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export type UserMessage = {
  content: string;
  role: 'user';
};

export type AssistantMessage = {
  content: string;
  role: 'assistant';
  sources?: Source[];
};

export type Message = UserMessage | AssistantMessage;

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
          <Fragment key={message.content}>
            <ChatbotMessage message={message.content} role={message.role} />
            {!isLast && <Separator />}
          </Fragment>
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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isSend = e.key === 'Enter' && (e.metaKey || e.ctrlKey);
    console.log('pressed');
    if (!isSend) {
      return;
    }
    handleSend();
  };

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
      setInput('');
    } finally {
      setLoading(false);
    }
  };

  const callBackend = async () => {
    fetch('/api/search');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <ChatbotMessageList messages={messages} />
        <Textarea
          className='text-md mt-4'
          placeholder='Type a message... (⌘ ↵ to send)'
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyUp}
          disabled={loading}
          value={input}
        />
        <Button
          variant='secondary'
          className='group'
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
        <Button variant='outline' onClick={callBackend}>
          <Phone className='h-4 w-4 mr-2' />
          Call backend
        </Button>
      </CardContent>
    </Card>
  );
}
