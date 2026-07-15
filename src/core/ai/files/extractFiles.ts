export interface AIFile {
  path: string;
  language: string;
  content: string;
}

const FILE_REGEX =
  /File:\s*(.+?)\n```(\w+)?\n([\s\S]*?)```/g;

export function extractFiles(
  text: string
): AIFile[] {
  const files: AIFile[] = [];

  for (const match of text.matchAll(FILE_REGEX)) {
    files.push({
      path: match[1].trim(),
      language: match[2] ?? "",
      content: match[3].trim(),
    });
  }

  return files;
}