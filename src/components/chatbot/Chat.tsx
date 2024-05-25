import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ChatbotMessage() {
  return (
    <div>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function Chatbot() {
  return <div> chatbot</div>;
}
