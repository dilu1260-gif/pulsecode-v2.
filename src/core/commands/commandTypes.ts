export interface CommandContext {
  source:
    | "keyboard"
    | "context-menu"
    | "toolbar"
    | "command-palette"
    | "ai"
    | "plugin";

  workspacePath?: string;

  activeFile?: string;
}

export interface CommandResult {
  success: boolean;

  message?: string;

  data?: unknown;
}

export type CommandHandler = (
  context: CommandContext,
  ...args: unknown[]
) =>
  | CommandResult
  | Promise<CommandResult>;