export interface AIContext {
  fileName?: string;
  language?: string;
  selectedCode?: string;

  openFiles?: string[];

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
  conversation,
  userPrompt,
}: AIContext) {
  const parts: string[] = [];

  parts.push(
    "You are Pulse AI, an expert software engineering assistant."
  );

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

  parts.push(
    "User Request:",
    userPrompt
  );

  return parts.join("\n\n");
}