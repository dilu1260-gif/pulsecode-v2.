"use client";

import { useState } from "react";

import type { AIRole } from "@/core/ai/types";

import { extractCodeBlocks } from "@/core/ai/extractCodeBlocks";
import { replaceSelectedCode } from "@/components/editor/editorActions";
import { getEditorSelection } from "@/components/editor/editorSelection";

import MarkdownMessage from "./MarkdownMessage";
import AICodeActions from "./AICodeActions";
import AIPreviewModal from "./AIPreviewModal";

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
              onApply={() => {
                replaceSelectedCode(
                  codeBlocks[0].code
                );

                setPreviewOpen(false);
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
      </div>
    </div>
  );
}