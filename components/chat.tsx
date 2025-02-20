"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
}

export function Chat({
  level,
  selectedGrammar,
  selectedWord,
}: {
  level: string;
  selectedGrammar: string | null;
  selectedWord: string | null;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "안녕하세요! 한국어를 연습하고 싶으신가요?",
      sender: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [messageCounter, setMessageCounter] = useState(0);

  const generateMessageId = () => {
    setMessageCounter((prev) => prev + 1);
    return `msg-${Date.now()}-${messageCounter}`;
  };

  useEffect(() => {
    if (selectedGrammar) {
      const newMessage: Message = {
        id: generateMessageId(),
        content: `Tell me about the grammar point: ${selectedGrammar}`,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [selectedGrammar]);

  useEffect(() => {
    if (selectedWord) {
      const newMessage: Message = {
        id: generateMessageId(),
        content: `Can you explain the usage of "${selectedWord}" and provide some example sentences?`,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            content: `Of course! Let's look at "${selectedWord}" in more detail. Here are some examples...`,
            sender: "assistant",
          },
        ]);
      }, 1000);
    }
  }, [selectedWord]);

  const handleSubmit = async (message: string) => {
    try {
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
    <div className="flex h-[600px] flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar>
                <AvatarFallback>
                  {message.sender === "user" ? "U" : "A"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2 border-t p-4">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
