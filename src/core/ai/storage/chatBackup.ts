import type {
  Conversation,
} from "@/core/ai/types";

export interface ChatBackup {
  version: 1;

  exportedAt: number;

  conversations: Conversation[];
}

export function exportChats(
  conversations: Conversation[]
): string {
  const backup: ChatBackup = {
    version: 1,
    exportedAt: Date.now(),
    conversations,
  };

  return JSON.stringify(
    backup,
    null,
    2
  );
}

export function importChats(
  json: string
): Conversation[] {
  const parsed =
    JSON.parse(json) as ChatBackup;

  if (
    parsed.version !== 1 ||
    !Array.isArray(
      parsed.conversations
    )
  ) {
    throw new Error(
      "Invalid PulseCode backup."
    );
  }

  return parsed.conversations;
}