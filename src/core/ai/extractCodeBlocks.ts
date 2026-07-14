export interface CodeBlock {
  language: string;
  code: string;
}

export function extractCodeBlocks(
  text: string
): CodeBlock[] {
  const blocks: CodeBlock[] = [];

  const regex =
    /```([\w-]*)\n([\s\S]*?)```/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || "text",
      code: match[2].trim(),
    });
  }

  return blocks;
}