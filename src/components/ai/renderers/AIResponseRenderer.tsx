"use client";

import { extractFiles } from "@/core/ai/files/extractFiles";
import { extractActions } from "@/core/ai/actions/extractActions";

import MarkdownRenderer from "./MarkdownRenderer";
import FileRenderer from "./FileRenderer";
import ActionRenderer from "./ActionRenderer";

interface Props {
  content: string;
}

export default function AIResponseRenderer({
  content,
}: Props) {
  if (
    extractActions(content).length > 0
  ) {
    return (
      <ActionRenderer
        content={content}
      />
    );
  }

  if (
    extractFiles(content).length > 0
  ) {
    return (
      <FileRenderer
        content={content}
      />
    );
  }

  return (
    <MarkdownRenderer
      content={content}
    />
  );
}