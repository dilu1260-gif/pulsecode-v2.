"use client";

import MarkdownMessage from "../MarkdownMessage";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <MarkdownMessage
      content={content}
    />
  );
}