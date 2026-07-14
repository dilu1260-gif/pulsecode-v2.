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
import { useAIChat } from "@/hooks/useAIChat";
import { registerAIActions } from "@/core/commands/actions/aiActions";
import CommandPalette from "@/components/command-palette/CommandPalette";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import InlinePrompt from "@/components/inline-ai/InlinePrompt";
import { useInlineAI } from "@/hooks/useInlineAI";
import { parseReferences } from "@/core/ai/context/parseReferences";
import { resolveReferences } from "@/core/ai/context/resolveReferences";
import { loadReferences } from "@/core/ai/context/loadReferences";

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
 const {
  prompt,
  setPrompt,
  lastPrompt,
  setLastPrompt,

  messages,
  setMessages,

  conversations,
  activeConversationId,
  createConversation,
  switchConversation,
  renameConversation,
  deleteConversation,

  loading,
  setLoading,

  messagesEndRef,
  messagesContainerRef,
  handleMessagesScroll,

  abortControllerRef,

  updateAssistantMessage,
  removeLastAssistantMessage,

  stopGeneration,
  clearChat,
} = useAIChat();
const {
  open,
  closePalette,
} = useCommandPalette();
const {
  open: inlineOpen,
  instruction,
  setInstruction,
  closePrompt,
} = useInlineAI();

async function sendToAI(
  instruction?: string,
  regenerate = false
) {
  const finalPrompt = instruction
    ? `${instruction}${prompt ? `\n\n${prompt}` : ""}`
    : prompt;

  if (!finalPrompt.trim()) return;

  setLastPrompt(finalPrompt);

  const userMessage: Message = {
    role: "user",
    content: finalPrompt,
  };

  if (!regenerate) {
    setMessages((prev) => [...prev, userMessage]);
  }

  setLoading(true);

  try {
    const selection = getEditorSelection();

 const openFilePaths = openTabs.map(
  (tab) => tab.path
);

const references =
  parseReferences(finalPrompt);

const resolvedReferences =
  resolveReferences(
    references,
    openFilePaths
  );

const referencedFiles =
  await loadReferences(
    resolvedReferences
  );

const aiPrompt = buildPrompt({
  fileName: selection.fileName,
  language: selection.language,
  selectedCode: selection.selectedText,

  openFiles: openFilePaths,

  referencedFiles,

  conversation: messages
    .slice(-8)
    .filter((message) =>
      message.content.trim()
    ),

  userPrompt: finalPrompt,
});
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
      },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 0));

    abortControllerRef.current = new AbortController();

    const response = await chatStream(
      aiPrompt,
      abortControllerRef.current.signal
    );

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

    content += decoder.decode();
    updateAssistantMessage(content);

    setPrompt("");
  } catch (err) {
    if (
      err instanceof DOMException &&
      err.name === "AbortError"
    ) {
      return;
    }

    updateAssistantMessage(
      err instanceof Error
        ? err.message
        : "Network error"
    );
  } finally {
    setLoading(false);
    abortControllerRef.current = null;
  }
}
  
async function regenerateResponse() {
  if (!lastPrompt) return;

  removeLastAssistantMessage();

  await sendToAI(lastPrompt, true);
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
useEffect(() => {
  registerAIActions({
    explain: explainSelection,
    fix: fixSelection,
    optimize: optimizeSelection,
    tests: generateTests,
    comments: addComments,
  });
}, []);
  return (
  <>
  <InlinePrompt
  open={inlineOpen}
  value={instruction}
  onChange={setInstruction}
  onClose={closePrompt}
  onSubmit={async () => {
    if (!instruction.trim()) return;

    await sendToAI(
      instruction,
      false
    );

    closePrompt();
  }}
/>
    <CommandPalette
      open={open}
      onClose={closePalette}
    />

    <div className="flex h-screen bg-black">
      {/* Explorer + Search */}
      <AIPanel
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        messages={messages}
        openFiles={openTabs.map((tab) => tab.path)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onCreateConversation={createConversation}
        onSwitchConversation={switchConversation}
        onRenameConversation={renameConversation}
        onDeleteConversation={deleteConversation}
        onSend={() => sendToAI()}
        onStop={stopGeneration}
        onRegenerate={regenerateResponse}
        onExplain={explainSelection}
        onFix={fixSelection}
        onOptimize={optimizeSelection}
        onTests={generateTests}
        onComments={addComments}
        onClear={clearChat}
        messagesEndRef={messagesEndRef}
        messagesContainerRef={messagesContainerRef}
        handleMessagesScroll={handleMessagesScroll}
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
  </>
);
}
