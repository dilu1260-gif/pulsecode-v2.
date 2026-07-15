"use client";

import { useState } from "react";

import {
  extractFiles,
  type AIFile,
} from "@/core/ai/files/extractFiles";

import {
  createAIFile,
} from "@/core/ai/files/createAIFile";

import {
  createAllAIFiles,
} from "@/core/ai/files/createAllAIFiles";

import AIFileList from "../files/AIFileList";
import AIFilePreview from "../files/AIFilePreview";
import CreateAllButton from "../files/CreateAllButton";

import AIPreviewModal from "../AIPreviewModal";

interface Props {
  content: string;
}

export default function FileRenderer({
  content,
}: Props) {
  const files =
    extractFiles(content);

  const [
    preview,
    setPreview,
  ] = useState<AIFile | null>(
    null
  );

  return (
    <>
      <AIFileList
        files={files}
        onPreview={setPreview}
        onCreate={async (file) => {
          await createAIFile(file);
        }}
      />

      {files.length > 1 && (
        <CreateAllButton
          onClick={async () => {
            await createAllAIFiles(
              files
            );
          }}
        />
      )}

      {preview && (
        <AIPreviewModal
          open={true}
          title={preview.path}
          code={preview.content}
          language={preview.language}
          onClose={() =>
            setPreview(null)
          }
        />
      )}
    </>
  );
}