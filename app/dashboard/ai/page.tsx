"use client";

import * as React from "react";
import { Bot, MessageSquare, Sparkles, Send, Trash2, Copy, Check } from "lucide-react";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    timestamp: Date;
}

const initialMessages: Message[] = [
    { id: "1", role: "assistant", content: "Hello! I'm your AI Assistant. How can I help you today?", timestamp: new Date() },
];

const aiResponses = [
    "Based on your dashboard data, you have 24 total projects with a 78% task completion rate. Your team has 1,847 active users.",
    "I can help you analyze trends, generate reports, or answer questions about your platform's performance.",
    "Your response time average of 32 minutes is within the industry standard. Would you like suggestions to improve it?",
    "I've analyzed your user engagement patterns. Peak activity occurs between 9-11 AM and 2-4 PM.",
    "Your project completion rate has improved by 12% compared to last month. Great progress!",
];

export default function AIAssistantPage() {
    const { addToast } = useToast();
    const [messages, setMessages] = React.useState<Message[]>(initialMessages);
    const [message, setMessage] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const [copiedId, setCopiedId] = React.useState<string | null>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!message.trim() || isTyping) return;

        const userMessage: Message = {
            id: String(Date.now()),
            role: "user",
            content: message.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        // Simulate AI typing delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

        const aiMessage: Message = {
            id: String(Date.now() + 1),
            role: "assistant",
            content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
    };

    const handleCopy = (content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        addToast("Copied to clipboard", "success");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleClearChat = () => {
        setMessages(initialMessages);
        addToast("Conversation cleared", "info");
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            {/* Page Header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>🏠</span><span>&gt;</span><span>Dashboard</span><span>&gt;</span>
                        <span className="text-foreground">AI Assistant</span>
                    </div>
                    <h1 className="text-2xl font-semibold flex items-center gap-2">
                        <Bot className="h-6 w-6 text-blue-500" />
                        AI Assistant
                    </h1>
                    <p className="text-sm text-muted-foreground">Your intelligent helper for data insights</p>
                </div>
                <button
                    onClick={handleClearChat}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                >
                    <Trash2 className="h-4 w-4" />
                    Clear Chat
                </button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 rounded-xl border border-border/50 bg-card flex flex-col overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {msg.role === "assistant" && (
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                            )}
                            <div className="group max-w-[70%]">
                                <div
                                    className={cn(
                                        "rounded-2xl px-4 py-3 text-sm relative",
                                        msg.role === "user"
                                            ? "bg-blue-500 text-white rounded-br-sm"
                                            : "bg-white/5 border border-border/50 rounded-bl-sm"
                                    )}
                                >
                                    {msg.content}
                                    {msg.role === "assistant" && (
                                        <button
                                            onClick={() => handleCopy(msg.content, msg.id)}
                                            className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-lg transition-all"
                                        >
                                            {copiedId === msg.id ? (
                                                <Check className="h-4 w-4 text-green-400" />
                                            ) : (
                                                <Copy className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </button>
                                    )}
                                </div>
                                <p className={cn(
                                    "text-xs text-muted-foreground mt-1",
                                    msg.role === "user" ? "text-right" : "text-left"
                                )}>
                                    {formatTime(msg.timestamp)}
                                </p>
                            </div>
                            {msg.role === "user" && (
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                                    DU
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-white/5 border border-border/50 rounded-2xl rounded-bl-sm px-4 py-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                            placeholder="Ask anything about your dashboard data..."
                            disabled={isTyping}
                            className="flex-1 px-4 py-3 bg-white/5 border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || isTyping}
                            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                            This is a demo UI. AI responses are simulated.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {messages.length} messages
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
