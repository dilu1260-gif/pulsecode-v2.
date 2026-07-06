export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProvider {
  readonly id: string;

  readonly name: string;

  generate(
    messages: AIMessage[]
  ): Promise<string>;

  stream?(
    messages: AIMessage[],
    onToken: (token: string) => void
  ): Promise<void>;
}