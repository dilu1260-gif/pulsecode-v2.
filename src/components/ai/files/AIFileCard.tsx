"use client";

import type { AIFile } from "@/core/ai/files/extractFiles";

interface Props {
  file: AIFile;
  onPreview: () => void;
  onCreate: () => void;
}

export default function AIFileCard({
  file,
  onPreview,
  onCreate,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-white">
            📄 {file.path}
          </div>

          <div className="mt-1 text-xs text-zinc-500">
            {file.language || "text"}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPreview}
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-800"
          >
            👀 Preview
          </button>

          <button
            onClick={onCreate}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            ➕ Create
          </button>
        </div>
      </div>
    </div>
  );
}