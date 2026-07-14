export type AIRole =
  | "user"
  | "assistant";

export interface AIMessage {
  role: AIRole;
  content: string;
}

export interface Conversation {
  id: string;

  title: string;

  createdAt: number;

  updatedAt: number;

  messages: AIMessage[];
}

export interface AIContext {
  fileName?: string;

  language?: string;

  selectedCode?: string;

  openFiles?: string[];

  conversation?: AIMessage[];

  userPrompt: string;
}