"use client";

import type { CommandResult } from "./commandTypes";
import type { CommandDefinition } from "./commandDefinition";

class CommandRegistry {
  private commands = new Map<
    string,
    CommandDefinition
  >();

  register(
    command: CommandDefinition
  ) {
    this.commands.set(
      command.id,
      command
    );
  }

  unregister(id: string) {
    this.commands.delete(id);
  }

  async execute(
    id: string,
    ...args: unknown[]
  ): Promise<CommandResult | undefined> {
    const command =
      this.commands.get(id);

    if (!command) {
      return {
        success: false,
        message: `Command "${id}" not found.`,
      };
    }

    return await command.handler(
      {
        source: "toolbar",
      },
      ...args
    );
  }

  has(id: string) {
    return this.commands.has(id);
  }

  get(id: string) {
    return this.commands.get(id);
  }

  getAll() {
    return [...this.commands.values()];
  }
}

export const commands =
  new CommandRegistry();