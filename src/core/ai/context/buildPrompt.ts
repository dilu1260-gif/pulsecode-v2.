import { SYSTEM_PROMPT } from "@/core/ai/prompts/systemPrompt";

export interface AIContext {
  fileName?: string;
  language?: string;
  selectedCode?: string;
  openFiles?: string[];
  referencedFiles?: {
    path: string;
    content: string;
  }[];
  conversation?: {
    role: "user" | "assistant";
    content: string;
  }[];
  userPrompt: string;
}

export function buildPrompt({
  fileName,
  language,
  selectedCode,
  openFiles,
  referencedFiles,
  conversation,
  userPrompt,
}: AIContext) {
  
  const parts: string[] = [];

parts.push(SYSTEM_PROMPT);

  if (fileName) {
    parts.push(`Current File: ${fileName}`);
  }

  if (language) {
    parts.push(`Language: ${language}`);
  }

  if (openFiles?.length) {
    parts.push(
      [
        "Open Files:",
        ...openFiles.map(
          (file) => `- ${file}`
        ),
      ].join("\n")
    );
  }

  if (conversation?.length) {
    parts.push(
      [
        "Conversation History:",
        ...conversation.map(
          (message) =>
            `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`
        ),
      ].join("\n")
    );
  }

  if (selectedCode) {
    parts.push(
      "Selected Code:",
      "```",
      selectedCode,
      "```"
    );
  }

  if (referencedFiles?.length) {
    parts.push(
      "Referenced Files:"
    );

    for (const file of referencedFiles) {
      parts.push(
        [
          `File: ${file.path}`,
          "```",
          file.content,
          "```",
        ].join("\n")
      );
    }
  }

  parts.push(
    "User Request:",
    userPrompt
  );

  return parts.join("\n\n");
}