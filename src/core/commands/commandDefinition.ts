import type {
  CommandHandler,
} from "./commandTypes";

export interface CommandDefinition {
  /**
   * Unique identifier.
   *
   * Example:
   * file.save
   */
  id: string;

  /**
   * Human readable title.
   */
  title: string;

  /**
   * Category shown inside
   * Command Palette.
   */
  category: string;

  /**
   * Optional keyboard shortcut.
   */
  shortcut?: string;

  /**
   * Optional description.
   */
  description?: string;

  /**
   * Executes the command.
   */
  handler: CommandHandler;
}