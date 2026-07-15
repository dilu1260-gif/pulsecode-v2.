import type { AIFile } from "./extractFiles";

export async function createAIFile(
  file: AIFile
) {
  const response = await fetch(
    "/api/files/create",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        filePath: file.path,
        content: file.content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create file."
    );
  }

  return response.json();
}