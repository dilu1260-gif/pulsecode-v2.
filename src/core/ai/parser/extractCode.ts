export interface ExtractedCode {
  code: string;
  language?: string;
}

export function extractCode(
  content: string
): ExtractedCode | null {
  const match =
    content.match(
      /```([a-zA-Z0-9]*)\n([\s\S]*?)```/
    );

  if (!match) {
    return null;
  }

  return {
    language: match[1] || undefined,
    code: match[2].trimEnd(),
  };
}