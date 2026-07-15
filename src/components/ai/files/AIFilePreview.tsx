"use client";

import type { AIFile } from "@/core/ai/files/extractFiles";

interface Props {
  file: AIFile;
}

export default function AIFilePreview({
  file,
}: Props) {
  return (
    <pre className="max-h-96 overflow-auto rounded-lg border border-zinc-800 bg-black p-4 text-sm text-zinc-300">
      <code>{file.content}</code>
    </pre>
  );
}