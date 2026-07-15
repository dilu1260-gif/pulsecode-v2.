import type { AIFile } from "./extractFiles";
import { createAIFile } from "./createAIFile";

export async function createAllAIFiles(
  files: AIFile[]
) {
  for (const file of files) {
    await createAIFile(file);
  }
}