"use client";

import type { AIMessage } from "@/core/ai/types";

import ChatMessage from "./ChatMessage";
import ThinkingBubble from "./ThinkingBubble";

interface Props {
  messages: AIMessage[];
  loading: boolean;
}

export default function AIChat({
  messages,
  loading,
}: Props) {
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
          isStreaming={
            loading &&
            index === messages.length - 1 &&
            message.role === "assistant"
          }
        />
      ))}

      {loading && <ThinkingBubble />}
    </>
  );
}