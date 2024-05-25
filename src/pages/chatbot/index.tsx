import { Chatbot } from "@/components/chatbot/Chat";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="w-screen">
            <Button>Click me</Button>
            <Chatbot />
        </div>
    );
}
