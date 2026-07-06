"use client";

import AIQuickActions from "./AIQuickActions";
import AIChat from "./AIChat";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  messages: Message[];
  onSend: () => void;
  onExplain: () => void;
  onFix: () => void;
  onOptimize: () => void;
  onTests: () => void;
  onComments: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function AIPanel({
  prompt,
  setPrompt,
  loading,
  messages,
  onSend,
  onExplain,
  onFix,
  onOptimize,
  onTests,
  onComments,
  messagesEndRef,
}: Props) {
  return (
    <aside className="w-96 border-l border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-lg font-semibold text-white">
          Pulse AI
        </h2>
      </div>

      <div className="flex h-full flex-col p-4">
        <div className="mt-auto" />

        <AIQuickActions
          disabled={loading}
          onExplain={onExplain}
          onFix={onFix}
          onOptimize={onOptimize}
          onTests={onTests}
          onComments={onComments}
        />

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-40 w-full rounded-lg bg-black p-3 text-white outline-none"
          placeholder="Ask Pulse AI..."
        />

        <button
          onClick={onSend}
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>

        <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
          <AIChat
            messages={messages}
            loading={loading}
          />

          <div ref={messagesEndRef} />
        </div>
      </div>
    </aside>
  );
}