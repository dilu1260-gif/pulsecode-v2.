export interface AIContext {
  fileName?: string;
  language?: string;
  selectedCode?: string;
  userPrompt: string;
}

export function buildPrompt({
  fileName,
  language,
  selectedCode,
  userPrompt,
}: AIContext) {
  const parts: string[] = [];

  if (fileName) {
    parts.push(`File: ${fileName}`);
  }

  if (language) {
    parts.push(`Language: ${language}`);
  }

  if (selectedCode) {
    parts.push(
      "Selected Code:",
      selectedCode
    );
  }

  parts.push(
    "User Request:",
    userPrompt
  );

  return parts.join("\n\n");
}