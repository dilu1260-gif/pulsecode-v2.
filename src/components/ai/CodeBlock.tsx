"use client";

import { useState } from "react";
import { getEditorInstance } from "@/components/editor/editorInstance";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function CodeBlock({
  className,
  children,
}: Props) {
  const [copied, setCopied] = useState(false);

  const text = String(children).replace(/\n$/, "");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInsert() {
  const editor = getEditorInstance();

  if (!editor) {
    alert("Editor is NULL");
    return;
  }

  const selection = editor.getSelection();

  if (!selection) return;

  editor.executeEdits("pulsecode", [
    {
      range: selection,
      text,
      forceMoveMarkers: true,
    },
  ]);

  editor.focus();
}

  return (
    <div className="relative my-3">
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          onClick={handleCopy}
          className="rounded bg-zinc-700 px-2 py-1 text-xs text-white hover:bg-zinc-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={handleInsert}
          className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-500"
        >
          Insert
        </button>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4">
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
}