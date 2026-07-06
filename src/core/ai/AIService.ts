import type {
  AIMessage,
  AIProvider,
} from "./AIProvider";

export class AIService {
  constructor(
    private provider: AIProvider
  ) {}

  async generate(
    messages: AIMessage[]
  ) {
    return this.provider.generate(
      messages
    );
  }

  async stream(
    messages: AIMessage[],
    onToken: (
      token: string
    ) => void
  ) {
    if (!this.provider.stream) {
      throw new Error(
        "Streaming is not supported by this provider."
      );
    }

    return this.provider.stream(
      messages,
      onToken
    );
  }
}