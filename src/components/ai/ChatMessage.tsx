"use client";

import { useState } from "react";

import type { AIRole } from "@/core/ai/types";

import { extractCodeBlocks } from "@/core/ai/extractCodeBlocks";
import { replaceSelectedCode } from "@/components/editor/editorActions";
import { getEditorSelection } from "@/components/editor/editorSelection";

import MarkdownMessage from "./MarkdownMessage";
import AICodeActions from "./AICodeActions";
import AIPreviewModal from "./AIPreviewModal";
import AIDiffViewer from "./AIDiffViewer";

interface Props {
  role: AIRole;
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({
  role,
  content,
  isStreaming = false,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] =
    useState(false);
    const [diffOpen, setDiffOpen] =
  useState(false);

  const codeBlocks =
    extractCodeBlocks(content);

  const hasCode =
    codeBlocks.length > 0;

  const originalCode =
    getEditorSelection().selectedText;

  async function copyMessage() {
    await navigator.clipboard.writeText(
      content
    );

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      2000
    );
  }

  return (
    <div
      className={`mb-4 flex ${
        role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`group relative max-w-[90%] rounded-xl px-4 py-3 ${
          role === "user"
            ? "bg-blue-600 text-white"
            : "bg-zinc-900 text-white"
        }`}
      >
        <MarkdownMessage
          content={content}
        />

        {role === "assistant" && (
          <button
            onClick={copyMessage}
            className="absolute right-2 top-2 rounded px-2 py-1 text-xs text-zinc-400 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-800"
            title="Copy response"
          >
            {copied
              ? "✓ Copied"
              : "📋 Copy"}
          </button>
        )}

        {role === "assistant" &&
          hasCode && (
           <AICodeActions
  onCopy={copyMessage}
  onPreview={() =>
    setPreviewOpen(true)
  }
  onDiff={() =>
    setDiffOpen(true)
  }
  onApply={() => {
    replaceSelectedCode(
      codeBlocks[0].code
    );
    setPreviewOpen(false);
    setDiffOpen(false);
  }}
/>
          )}

        {isStreaming && (
          <span className="ml-1 animate-pulse font-bold">
            ▍
          </span>
        )}

        <AIPreviewModal
          open={previewOpen}
          title="AI Generated Code"
          code={
            hasCode
              ? codeBlocks[0].code
              : ""
          }
          language={
            hasCode
              ? codeBlocks[0]
                  .language
              : undefined
          }
          originalCode={originalCode}
          onClose={() =>
            setPreviewOpen(false)
          }
        />
        {diffOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="flex h-[85vh] w-[95vw] max-w-7xl flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Diff Review
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Compare your code with the AI suggestion.
          </p>
        </div>

        <button
          onClick={() => setDiffOpen(false)}
          className="rounded-lg px-3 py-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <AIDiffViewer
          original={originalCode}
          updated={codeBlocks[0].code}
        />
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}