"use client";

import MarkdownMessage from "./MarkdownMessage";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: Props) {
  return (
    <div
      className={`mb-4 flex ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[90%] rounded-xl px-4 py-3 ${
          role === "user"
            ? "bg-blue-600 text-white"
            : "bg-zinc-900 text-white"
        }`}
      >
        <MarkdownMessage content={content} />
      </div>
    </div>
  );
}