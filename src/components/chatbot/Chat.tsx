import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
  message: string;
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
      <ChatbotMessage message='Hello, how can I help you?' role='assistant' />
      {messages.map((message, i) => {
        const isLast = i === messages.length - 1;
        return (
          <>
            <ChatbotMessage
              key={message.message}
              message={message.message}
              role='user'
            />
            {!isLast && <Separator />}
          </>
        );
      })}
    </div>
  );
}
