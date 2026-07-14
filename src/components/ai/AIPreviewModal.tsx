"use client";

import { useEffect, useState } from "react";
import MarkdownMessage from "./MarkdownMessage";
import AIDiffViewer from "./AIDiffViewer";

interface Props {
  open: boolean;
  title?: string;

  code: string;
  language?: string;

  originalCode?: string;

  onClose: () => void;
}

export default function AIPreviewModal({
  open,
  title = "AI Preview",
  code,
  language,
  originalCode = "",
  onClose,
}: Props) {
  const [tab, setTab] = useState<
    "preview" | "diff"
  >("preview");

  useEffect(() => {
    if (open) {
      setTab("preview");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex h-[88vh] w-[94vw] max-w-7xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>

            {language && (
              <p className="mt-1 text-xs text-zinc-500">
                {language}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* Tabs */}

        <div className="flex border-b border-zinc-800 bg-zinc-900">

          <button
            onClick={() => setTab("preview")}
            className={`px-5 py-3 text-sm font-medium transition ${
              tab === "preview"
                ? "border-b-2 border-blue-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Preview
          </button>

          <button
            onClick={() => setTab("diff")}
            className={`px-5 py-3 text-sm font-medium transition ${
              tab === "diff"
                ? "border-b-2 border-blue-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Diff
          </button>

        </div>

        {/* Content */}

        <div className="flex-1 overflow-auto p-6">

          {tab === "preview" ? (

            <div className="prose prose-invert max-w-none">
              <MarkdownMessage
                content={`\`\`\`${language ?? ""}\n${code}\n\`\`\``}
              />
            </div>

          ) : (

            <AIDiffViewer
              original={originalCode}
              updated={code}
            />

          )}

        </div>

      </div>
    </div>
  );
}