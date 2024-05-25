import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Source, completion } from '@/lib/ai';
import { cn } from '@/lib/utils';
import { ExternalLink, Loader2, Phone, SendHorizonal } from 'lucide-react';
import { useState } from 'react';

type Role = 'user' | 'assistant';

type ChatbotMessageProps = {
  content: string;
  role?: Role;
};

type SourceCardProps = {
  source: Source;
};

function SourceCard({ source }: SourceCardProps) {
  const { title, link } = source.metadata;
  const preview = source.pageContent.slice(0, 20) + '...';
  return (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      <Card className='hover:bg-muted transition-all cursor-pointer mt-2 rounded-none'>
        <CardHeader className='px-4 py-2'>
          <div className='flex justify-between items-start'>
            <CardTitle className='text-md'>{title}</CardTitle>
            <ExternalLink className='h-4 w-4 mt-1 text-blue-700' />
          </div>
          <CardDescription className='text-sm'>{preview}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}

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

export function LoadingChatbotMessage() {
  return (
    <div className={cn('w-[640px] py-2 bg-muted')}>
      <Separator />
      <div className={cn('flex gap-4 items-start px-4')}>
        <RoleAvatar role={'assistant'} />
        <div>
          <Loader2 className='h-4 w-4 animate-spin' />
        </div>
      </div>
    </div>
  );
}

/**
 * A single chatbot message
 */
export function ChatbotMessage({
  content: message,
  role = 'assistant',
}: ChatbotMessageProps) {
  return (
    <div className={cn('flex gap-4 items-start px-4')}>
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
  loading?: boolean;
};

/**
 * A list of chatbot mesasges
 */
export function ChatbotMessageList({
  messages,
  loading = false,
}: ChatbotMessageListProps) {
  return (
    <div className='flex flex-col'>
      {messages.map((message, i) => {
        const isLast = i === messages.length - 1;
        const sources =
          message.role === 'assistant' && message.sources
            ? message.sources
            : [];
        return (
          <div
            key={message.content}
            className={cn(
              'w-[640px] py-2',
              message.role === 'assistant' && 'bg-muted'
            )}
          >
            <ChatbotMessage content={message.content} role={message.role} />
            <div className={cn('grid grid-cols-3 mx-2')}>
              {sources.map((source) => {
                return (
                  <SourceCard key={source.metadata.link} source={source} />
                );
              })}
            </div>
            {!isLast && (
              <div className='py-2 bg-background'>
                <Separator className='' />
              </div>
            )}
          </div>
        );
      })}
      {loading && <LoadingChatbotMessage />}
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
    sources: [
      {
        pageContent: 'Lorem ipsum',
        metadata: {
          title: 'Lorem Ipsum worldk',
          link: 'https://www.mymoneysense.gov.sg/buying-a-house/purchase-guide/my-first-house',
        },
      },
    ],
    role: 'assistant',
  },
];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const disabled = loading || !input;

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
    const userMessage: UserMessage = {
      content: input,
      role: 'user',
    };
    setMessages([...messages, userMessage]);

    try {
      const sources = await callBackend(input);
      // const sources: Source[] = [];
      // TODO: replace wth actual metadata
      const updatedContent = `User's Question: ${input}
Relevant Sources:
${sources.map((source) => `${source.metadata}\n${source.pageContent}`)}
`;
      const userMessageWithSources: Message = {
        content: updatedContent,
        role: 'user',
      };

      const message = await completion([...messages, userMessageWithSources]);
      setMessages((messages) => [
        ...messages,
        {
          content: message.choices[0].message.content ?? '',
          sources,
          role: 'assistant',
        },
      ]);
      setInput('');
    } finally {
      setLoading(false);
    }
  };

  const callBackend = async (query: string): Promise<Source[]> => {
    if (!query) return [];
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const results = await res.json();
    return results;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <ChatbotMessageList messages={messages} loading={loading} />
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
          disabled={disabled}
          onClick={handleSend}
        >
          Send
          {loading ? (
            <Loader2 className='h-4 w-4 ml-2 transition-all animate-spin' />
          ) : (
            <SendHorizonal className='h-4 w-4 ml-2 text-cyan-700 group-hover:translate-x-1 transition-all' />
          )}
        </Button>
        <Button
          variant='outline'
          onClick={() => callBackend(input)}
          disabled={disabled}
        >
          <Phone className='h-4 w-4 mr-2' />
          Call backend
        </Button>
      </CardContent>
    </Card>
  );
}
