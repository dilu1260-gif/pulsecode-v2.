import OpenAI from "openai";

import { env } from "@/core/config";
import type {
  AIMessage,
  AIProvider,
} from "../AIProvider";

export class OpenAIProvider
  implements AIProvider
{
  readonly id = "openai";

  readonly name = "OpenAI";

  private client = new OpenAI({
    apiKey: env.openAIApiKey(),
  });

  async generate(
    messages: AIMessage[]
  ): Promise<string> {
    const response =
      await this.client.responses.create({
        model: env.openAIModel(),
        input: messages,
      });

    return response.output_text;
  }
}