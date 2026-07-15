"use client";

import type { AIFile } from "@/core/ai/files/extractFiles";
import AIFileCard from "./AIFileCard";

interface Props {
  files: AIFile[];
  onPreview: (file: AIFile) => void;
  onCreate: (file: AIFile) => void;
}

export default function AIFileList({
  files,
  onPreview,
  onCreate,
}: Props) {
  return (
    <div className="space-y-3">
      {files.map((file) => (
        <AIFileCard
          key={file.path}
          file={file}
          onPreview={() =>
            onPreview(file)
          }
          onCreate={() =>
            onCreate(file)
          }
        />
      ))}
    </div>
  );
}