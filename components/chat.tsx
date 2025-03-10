"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
}

const generateMessageId = () => {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function Chat({
  level,
  selectedGrammar,
  selectedWord,
  onLoadingChange,
}: {
  level: string;
  selectedGrammar: string | null;
  selectedWord: string | null;
  onLoadingChange?: (loading: boolean) => void;
}) {
  // Ref for the messages end element
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const storageKey = `chatMessages_${level}`;
    try {
      const storedMessages = localStorage.getItem(storageKey);
      console.log(`Attempting to load messages for ${storageKey}`);
      if (storedMessages !== null && storedMessages !== "[]") {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
        console.log("Loaded messages:", parsedMessages);
      } else {
        console.log("No stored messages found, setting default message.");
        setMessages([
          {
            id: generateMessageId(),
            content: "안녕하세요, 어떻게 도와줗까?",
            sender: "assistant",
          },
        ]);
      }
    } catch (error) {
      console.error(
        `Failed to load initial messages for ${storageKey}:`,
        error
      );
    }
  }, [level]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const storageKey = `chatMessages_${level}`;
      try {
        console.log("Current messages before saving:", messages);
        const storedMessages = localStorage.getItem(storageKey);
        const parsedStoredMessages = storedMessages
          ? JSON.parse(storedMessages)
          : [];

        if (JSON.stringify(parsedStoredMessages) !== JSON.stringify(messages)) {
          localStorage.setItem(storageKey, JSON.stringify(messages));
          console.log(`Saved messages for ${storageKey}:`, messages);
        }
      } catch (error) {
        console.error(`Failed to save messages for ${storageKey}:`, error);
      }
    }
  }, [messages, level]);

  // Handle grammar selection
  useEffect(() => {
    if (selectedGrammar) {
      const newMessage: Message = {
        id: generateMessageId(),
        content: `Tell me a little bit more about ${selectedGrammar}!`,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);

      handleSubmit(
        newMessage.content +
          " with 2 real live examples. Make it short as possible. Onyl key moments! Im on level"
      );
    }
  }, [selectedGrammar]);

  // Handle word selection
  useEffect(() => {
    if (selectedWord) {
      const newMessage: Message = {
        id: generateMessageId(),
        content: `Can you explain the usage of "${selectedWord}"`,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
      handleSubmit(
        newMessage.content +
          "and provide some example sentences? Make it short as possible. Onyl key moments!"
      );
    }
  }, [selectedWord]);

  // Handle loading state
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  // Handle scrolling to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle message sending
  const handleSubmit = async (message: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: data.choices[0].message.content,
          sender: "assistant",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      throw error; // Re-throw to handle in sendMessage
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: generateMessageId(),
      content: input,
      sender: "user" as const,
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    try {
      await handleSubmit(currentInput);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === "assistant" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <Avatar
                className={
                  message.sender === "assistant" ? "bg-primary" : "bg-muted"
                }
              >
                <AvatarFallback>
                  {message.sender === "assistant" ? "AI" : "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-3 max-w-[85%] ${
                  message.sender === "assistant"
                    ? "bg-muted shadow-sm"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  className={`prose prose-sm max-w-none ${
                    message.sender === "assistant"
                      ? "dark:prose-invert"
                      : "text-primary-foreground"
                  } break-words`}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="not-prose rounded-md overflow-hidden my-2">
                          <div className="bg-zinc-800 text-xs text-zinc-400 px-3 py-1 border-b border-zinc-700">
                            {match[1]}
                          </div>
                          <pre className="p-0 m-0">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code
                          className="bg-zinc-800/60 px-1.5 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre({ children }) {
                      return <pre className="p-0 m-0">{children}</pre>;
                    },
                    p({ children }) {
                      return <p className="mb-2 last:mb-0">{children}</p>;
                    },
                    ul({ children }) {
                      return (
                        <ul className="list-disc pl-6 mb-2 last:mb-0">
                          {children}
                        </ul>
                      );
                    },
                    ol({ children }) {
                      return (
                        <ol className="list-decimal pl-6 mb-2 last:mb-0">
                          {children}
                        </ol>
                      );
                    },
                    li({ children }) {
                      return <li className="mb-1 last:mb-0">{children}</li>;
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-2 border-zinc-500 pl-4 italic">
                          {children}
                        </blockquote>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="bg-primary">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-3 py-2 bg-muted">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_0.8s_infinite]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_0.8s_0.2s_infinite]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_0.8s_0.4s_infinite]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="flex gap-2 border-t p-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          disabled={isLoading}
          className="h-9"
        />
        <Button onClick={sendMessage} disabled={isLoading} className="h-9 px-3">
          Send
        </Button>
      </div>
    </div>
  );
}
