import { AIProvider } from "./AIProvider";
import { GeminiProvider } from "./providers/GeminiProvider";

export class AIManager {
  private provider: AIProvider;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY");
    }

    this.provider = new GeminiProvider(apiKey);
  }

  async chat(message: string): Promise<string> {
    return this.provider.generate([
      {
        role: "user",
        content: message,
      },
    ]);
  }
  async chatStream(
  message: string,
  onToken: (token: string) => void
): Promise<void> {
  if (!this.provider.stream) {
    throw new Error(
      "Streaming is not supported by the current AI provider."
    );
  }

  await this.provider.stream(
    [
      {
        role: "user",
        content: message,
      },
    ],
    onToken
  );
}
}