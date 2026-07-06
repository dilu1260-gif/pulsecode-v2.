import { commands } from "./commandRegistry";
import {
  setCommandContext,
  resetCommandContext,
} from "./commandContext";
import type {
  CommandContext,
  CommandResult,
} from "./commandTypes";

export async function executeCommand(
  id: string,
  context: CommandContext,
  ...args: unknown[]
): Promise<CommandResult> {
  try {
    setCommandContext(context);

    const result = await commands.execute(
      id,
      ...args
    );

    return (
      result ?? {
        success: true,
      }
    );
  } finally {
    resetCommandContext();
  }
}