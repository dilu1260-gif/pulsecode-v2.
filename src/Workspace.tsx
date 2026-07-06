"use client";

import Explorer from "@/features/explorer/components/Explorer";
import { useExplorerStore } from "@/features/explorer/explorerStore";
import EditorTabs from "@/components/tabs/EditorTabs";
import CodeEditor from "@/components/editor/CodeEditor";
import Terminal from "@/components/terminal/Terminal";
import SearchPanel from "@/components/search/SearchPanel";
import { useState } from "react";

export default function Workspace() {
  const {
    openTabs,
    activeFile,
    setActiveFile,
    closeTab,
  } = useExplorerStore();
  const [prompt, setPrompt] = useState("");

const [messages, setMessages] = useState<
  {
    role: "user" | "assistant";
    content: string;
  }[]
>([]);
const [loading, setLoading] = useState(false);
  
async function sendToAI() {
  if (!prompt.trim()) return;
const userMessage = {
  role: "user" as const,
  content: prompt,
};

setMessages((prev) => [...prev, userMessage]);
  setLoading(true);

  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content: data.response,
  },
]);

setPrompt("");
    } else {
      setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content: data.error ?? "Unknown error",
  },
]);
    }
  } catch (err) {
    setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content:
      err instanceof Error ? err.message : "Network error",
  },
]);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex h-screen bg-black">
      {/* Explorer + Search */}
      <aside className="flex w-80 flex-col border-r border-zinc-800">
        <div className="border-b border-zinc-800">
          <SearchPanel />
        </div>

        <div className="flex-1 overflow-auto">
          <Explorer />
        </div>
      </aside>

      {/* Editor */}
      <main className="flex flex-1 flex-col">
        <EditorTabs
          tabs={openTabs}
          activeTab={activeFile}
          onSelect={setActiveFile}
          onClose={closeTab}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>

          <Terminal />
        </div>
      </main>

      {/* AI Panel */}
      <aside className="w-96 border-l border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 p-4">
          <h2 className="text-lg font-semibold text-white">
            Pulse AI
          </h2>
        </div>

        <div className="p-4">
          <textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  className="h-40 w-full rounded-lg bg-black p-3 text-white outline-none"
  placeholder="Ask Pulse AI..."
/>

          <button
  onClick={sendToAI}
  disabled={loading}
  className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? "Thinking..." : "Send"}
</button>
<div className="mt-4 space-y-3">
  {messages.map((message, index) => (
    <div
      key={index}
      className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${
        message.role === "user"
          ? "bg-blue-600 text-white"
          : "bg-zinc-900 text-white"
      }`}
    >
      <div className="mb-1 text-xs font-semibold opacity-70">
        {message.role === "user" ? "You" : "Pulse AI"}
      </div>

      {message.content}
    </div>
  ))}
</div>
        </div>
      </aside>
    </div>
  );
}