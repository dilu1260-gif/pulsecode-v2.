export type CommandCategory =
  | "ai"
  | "editor"
  | "file"
  | "search"
  | "workspace"
  | "terminal";

export interface CommandContext {
  selectedCode?: string;

  fileName?: string;

  language?: string;

  prompt?: string;
}

export interface Command {
  id: string;

  title: string;

  description?: string;

  category: CommandCategory;

  keywords?: string[];

  shortcut?: string;

  run: (
    context: CommandContext
  ) => void | Promise<void>;
}