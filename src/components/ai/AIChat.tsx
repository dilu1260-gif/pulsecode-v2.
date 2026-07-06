"use client";

import ChatMessage from "./ChatMessage";
import ThinkingBubble from "./ThinkingBubble";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  messages: Message[];
  loading: boolean;
}

export default function AIChat({ messages, loading }: Props) {
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}

      {loading && <ThinkingBubble />}
    </>
  );
}