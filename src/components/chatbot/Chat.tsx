import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Role = 'user' | 'assistant';

type ChatbotMessageProps = {
  message: string;
  role?: Role;
};

function AssistantAvatar() {
  return (
    <Avatar className='w-8 h-8 mt-'>
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
        'flex gap-4 items-start w-96 px-2 py-4',
        role === 'assistant' && 'bg-muted'
      )}
    >
      <RoleAvatar role={role} />
      <div>
        <p className='text-wrap w-96'>{message}</p>
      </div>
    </div>
  );
}

const messages = [
  'Hello, how can I help you?',
  'I am a chatbot, ask me anything!',
  'I am a chatbot, ask me anything!',
];

/**
 * A list of chatbot mesasges
 */
export function ChatbotMessageList() {
  return (
    <div className='flex flex-col gap-2'>
      <ChatbotMessage message='Hello, how can I help you?' role='assistant' />
      {messages.map((message) => {
        return <ChatbotMessage key={message} message={message} role='user' />;
      })}
    </div>
  );
}
