import { Chatbot, ChatHistoryProvider } from '@/components/chatbot/Chat';
import Navbar from './navbar';

interface props {
  children: any;
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <ChatHistoryProvider>
      <Navbar />
      <main>{children}</main>
      <Chatbot />
    </ChatHistoryProvider>
  );
};

export default Layout;
