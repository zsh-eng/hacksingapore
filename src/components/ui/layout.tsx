import Navbar from "./navbar";
import { Chatbot } from '@/components/chatbot/Chat';

interface props {
    children: any;
}

const Layout: React.FC<props> = ({children}) => {
    return (
        <>
            <Navbar />
                <main>{children}</main>
            <Chatbot />
        </>
    )
}

export default Layout