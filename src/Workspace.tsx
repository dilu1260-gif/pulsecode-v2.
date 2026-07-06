"use client";

import AIQuickActions from "@/components/ai/AIQuickActions";
import Explorer from "@/features/explorer/components/Explorer";
import { useExplorerStore } from "@/features/explorer/explorerStore";
import EditorTabs from "@/components/tabs/EditorTabs";
import CodeEditor from "@/components/editor/CodeEditor";
import Terminal from "@/components/terminal/Terminal";
import SearchPanel from "@/components/search/SearchPanel";
import { useEffect, useRef, useState } from "react";
import AIChat from "@/components/ai/AIChat";
import { buildPrompt } from "@/core/ai/context/buildPrompt";
import { getEditorSelection } from "@/components/editor/editorSelection";
import AIPanel from "@/components/ai/AIPanel";
import { chatStream } from "@/core/ai/chatStream";

interface Message {
  role: "user" | "assistant";
  content: string;
}
export default function Workspace() {
  const {
    openTabs,
    activeFile,
    setActiveFile,
    closeTab,
  } = useExplorerStore();
  const [prompt, setPrompt] = useState("");

const [messages, setMessages] = useState<Message[]>([]);
const [loading, setLoading] = useState(false);
const messagesEndRef = useRef<HTMLDivElement>(null);

const USE_STREAMING = true;

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

function updateAssistantMessage(content: string) {
  setMessages((prev) => {
    const next = [...prev];

    if (next.length === 0) return next;

    next[next.length - 1] = {
      role: "assistant",
      content,
    };

    return next;
  });
}
async function sendToAI(instruction?: string) {
  const finalPrompt = instruction
  ? `${instruction}${prompt ? `\n\n${prompt}` : ""}`
  : prompt;

if (!finalPrompt.trim()) return;

const userMessage = {
  role: "user" as const,
  content: finalPrompt,
};

  setMessages((prev) => [...prev, userMessage]);
  setLoading(true);

  try {
    const selection = getEditorSelection();

    const aiPrompt = buildPrompt({
      fileName: selection.fileName,
      language: selection.language,
      selectedCode: selection.selectedText,
      userPrompt: finalPrompt,
    });

    if (!USE_STREAMING) {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: aiPrompt,
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
} else {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: "",
    },
  ]);
await new Promise((resolve) => setTimeout(resolve, 0));
  const response = await chatStream(aiPrompt);

  if (!response.ok || !response.body) {
    throw new Error("Streaming failed.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let content = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    content += decoder.decode(value, {
      stream: true,
    });

    updateAssistantMessage(content);
  }

  setPrompt("");
}
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          err instanceof Error
            ? err.message
            : "Network error",
      },
    ]);
  } finally {
    setLoading(false);
  }
}
async function explainSelection() {
  await sendToAI("Explain this code.");
}
async function fixSelection() {
  await sendToAI("Find bugs and fix this code.");
}

async function optimizeSelection() {
  await sendToAI(
    "Optimize this code for performance and readability."
  );
}

async function generateTests() {
  await sendToAI("Write unit tests for this code.");
}

async function addComments() {
  await sendToAI("Add helpful comments to this code.");
}
  return (
    <div className="flex h-screen bg-black">
      {/* Explorer + Search */}
      <AIPanel
  prompt={prompt}
  setPrompt={setPrompt}
  loading={loading}
  messages={messages}
  onSend={() => sendToAI()}
  onExplain={explainSelection}
  onFix={fixSelection}
  onOptimize={optimizeSelection}
  onTests={generateTests}
  onComments={addComments}
  messagesEndRef={messagesEndRef}
/>

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
    </div>
  );
}