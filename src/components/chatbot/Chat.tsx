import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Source, completion, openai } from "@/lib/ai";
import { cn } from "@/lib/utils";
import { ExternalLink, Loader2, SendHorizonal } from "lucide-react";
import { Fragment, useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { Remark } from "react-remark";

type Role = "user" | "assistant";

type ChatbotMessageProps = {
    content: string;
    role?: Role;
    loading?: boolean;
};

type SourceCardProps = {
    source: Source;
};

function SourceCard({ source }: SourceCardProps) {
    const { type, link } = source.metadata;
    const preview = source.pageContent.slice(0, 20) + "...";
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card className="hover:bg-muted transition-all cursor-pointer mt-2 rounded-none">
                <CardHeader className="px-4 py-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-md">
                            {type.toUpperCase()}
                        </CardTitle>
                        <ExternalLink className="h-4 w-4 mt-1 text-blue-700" />
                    </div>
                    <CardDescription className="text-sm">
                        {preview}
                    </CardDescription>
                </CardHeader>
            </Card>
        </a>
    );
}

function AssistantAvatar() {
    return (
        <Avatar className="w-8 h-8 mt-1">
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1448/1448779.png" />
            <AvatarFallback>BOT</AvatarFallback>
        </Avatar>
    );
}

function UserAvatar() {
    return (
        <Avatar className="w-8 h-8 mt-1">
            <AvatarImage src="https://avatars.githubusercontent.com/u/49238630?v=4" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}

function RoleAvatar({ role }: { role: Role }) {
    return role === "assistant" ? <AssistantAvatar /> : <UserAvatar />;
}

export function LoadingChatbotMessage() {
    return (
        <>
            <Separator />
            <div className={cn("w-[640px] py-2 bg-muted")}>
                <div className={cn("flex gap-4 items-start px-4")}>
                    <RoleAvatar role={"assistant"} />
                    <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </div>
            </div>
        </>
    );
}

/**
 * A single chatbot message
 */
export function ChatbotMessage({
    content: message,
    role = "assistant",
    loading = false,
}: ChatbotMessageProps) {
    return (
        <div
            className={cn(
                "flex gap-4 items-start px-4 py-2",
                role === "assistant" && "bg-muted"
            )}
        >
            <RoleAvatar role={role} />
            <div>
                {loading && (
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-700" />
                )}
                <article className="text-wrap prose">
                    <Remark>{message}</Remark>
                </article>
            </div>
        </div>
    );
}

export type UserMessage = {
    content: string;
    role: "user";
};

export type AssistantMessage = {
    content: string;
    role: "assistant";
    sources?: Source[];
};

export type Message = UserMessage | AssistantMessage;

type ChatbotMessageListProps = {
    messages: Message[];
    loading?: boolean;
    loadingMessage?: string;
};

/**
 * A list of chatbot mesasges
 */
export function ChatbotMessageList({
    messages,
    loading = false,
    loadingMessage = "Hold on a sec...",
}: ChatbotMessageListProps) {
    return (
        <ScrollArea className="flex flex-col gap-0 h-[420px]">
            {messages.map((message, i) => {
                const isLast = i === messages.length - 1;
                const sources =
                    message.role === "assistant" && message.sources
                        ? message.sources
                        : [];
                return (
                    <Fragment key={message.content}>
                        <div
                            className={cn(
                                "w-[640px] pt-2 pb-4",
                                message.role === "assistant"
                                    ? "bg-muted"
                                    : "bg-background"
                            )}
                        >
                            <ChatbotMessage
                                content={message.content}
                                role={message.role}
                            />
                            <div
                                className={cn(
                                    "flex flex-col ml-8 mr-4 gap-0 mt-2",
                                    message.role === "assistant" && "bg-muted"
                                )}
                            >
                                {sources.length > 0 && <div>Useful Links:</div>}
                                {sources.map((source) => {
                                    return (
                                        <SourceCard
                                            key={source.metadata.link}
                                            source={source}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        {!isLast && (
                            <div className="py-2 bg-background">
                                <Separator className="" />
                            </div>
                        )}
                    </Fragment>
                );
            })}
            {loading && (
                <ChatbotMessage content={loadingMessage} loading={loading} />
            )}
        </ScrollArea>
    );
}

const initialMessages: Message[] = [
    {
        content:
            "Hello there! I'm here to help you with any financial questions you have. What would you like to know about your retirement today?",
        sources: [
            {
                pageContent:
                    "Make Financial Planning Simple with DBS NAV Planner",
                metadata: {
                    type: "dbs",
                    link: "https://www.dbs.com.sg/personal/articles/nav/financial-planning/making-financial-planning-simple",
                },
            },
            {
                pageContent:
                    "Make cash top-ups and CPF transfers to your own or loved ones’ Special or Retirement Account to benefit from compounding interest and receive higher monthly payouts in retirement. You can also enjoy tax relief on cash top-ups made.",
                // TODO add title
                metadata: {
                    type: "mymoneysense",
                    link: "https://www.cpf.gov.sg/member/growing-your-savings/saving-more-with-cpf/top-up-to-enjoy-higher-retirement-payouts",
                },
            },
        ],
        role: "assistant",
    },
];

export function Chatbot() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");

    const disabled = loading || !input;

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isSend = e.key === "Enter" && (e.metaKey || e.ctrlKey);
        console.log("pressed");
        if (!isSend) {
            return;
        }
        handleSend();
    };

    const handleSend = async () => {
        setLoading(true);
        const userMessage: UserMessage = {
            content: input,
            role: "user",
        };
        setMessages([...messages, userMessage]);

        try {
            const sources = await callBackend(input);
            // TODO: replace wth actual metadata
            const updatedContent = `User's Question: ${input}
Relevant Sources:
${sources.map((source) => `${source.metadata}\n${source.pageContent}`)}
`;
            const userMessageWithSources: Message = {
                content: updatedContent,
                role: "user",
            };

            let message = "";

            const stream = await openai.chat.completions.create({
                messages: [...messages, userMessageWithSources],
                model: "gpt-4o",
                stream: true,
            });

            for await (const chunk of stream) {
                message += chunk.choices[0].delta.content ?? "";
                setStreamingMessage(message);
            }

            setStreamingMessage((m) => "");
            setMessages((messages) => [
                ...messages,
                {
                    content: message,
                    sources,
                    role: "assistant",
                },
            ]);
            setInput("");
        } finally {
            setLoading(false);
        }
    };

    const callBackend = async (query: string): Promise<Source[]> => {
        if (!query) return [];
        const res = await fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const results = await res.json();
        return results;
    };

    // code below handles the toggling of the chatbot
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // mik shrunk the chatbot to fit into the page (line 148) and added a button to toggle the chatbot
    return (
        <div
            className={`fixed top-4 right-4 flex flex-row bg-white rounded-md p-2 overflow-hidden transform ${
                isChatOpen ? "translate-x-0" : "translate-x-[44.5rem]"
            } transition duration-700 ease-in-out`}
        >
            <Button className="mr-2" onClick={toggleChat}>
            <IoIosChatboxes />
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Chat</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <ChatbotMessageList messages={messages} loading={loading} />
                    <Textarea
                        className="text-md mt-4"
                        placeholder="Type a message... (⌘ ↵ to send)"
                        onChange={(e) => setInput(e.currentTarget.value)}
                        onKeyDown={handleKeyUp}
                        disabled={loading}
                        value={input}
                    />
                    <Button
                        variant="secondary"
                        className="group"
                        disabled={disabled}
                        onClick={handleSend}
                    >
                        Send
                        {loading ? (
                            <Loader2 className="h-4 w-4 ml-2 transition-all animate-spin" />
                        ) : (
                            <SendHorizonal className="h-4 w-4 ml-2 text-cyan-700 group-hover:translate-x-1 transition-all" />
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
