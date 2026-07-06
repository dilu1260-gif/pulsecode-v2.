import { GoogleGenAI } from "@google/genai";
import type {
  AIMessage,
  AIProvider,
} from "../AIProvider";

export class GeminiProvider implements AIProvider {
  readonly id = "gemini";
  readonly name = "Google Gemini";

  private client: GoogleGenAI;
  private model: string;

  constructor(apiKey: string, model = "gemini-2.5-flash") {
    this.client = new GoogleGenAI({ apiKey });
    this.model = model;
  }

  async generate(messages: AIMessage[]): Promise<string> {
    const prompt = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    return response.text ?? "";
  }

  async stream(
    messages: AIMessage[],
    onToken: (token: string) => void
  ): Promise<void> {
    const prompt = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const response =
      await this.client.models.generateContentStream({
        model: this.model,
        contents: prompt,
      });

    for await (const chunk of response) {
      const text = chunk.text ?? "";

      if (text) {
        onToken(text);
      }
    }
  }
}