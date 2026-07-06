"use client";

export type CommandHandler = () => void | Promise<void>;

class CommandRegistry {
  private commands = new Map<
    string,
    CommandHandler
  >();

  register(
    id: string,
    handler: CommandHandler
  ) {
    this.commands.set(id, handler);
  }

  unregister(id: string) {
    this.commands.delete(id);
  }

  async execute(id: string) {
    const command =
      this.commands.get(id);

    if (!command) {
      console.warn(
        `Command not found: ${id}`
      );
      return;
    }

    await command();
  }

  has(id: string) {
    return this.commands.has(id);
  }

  getAll() {
    return [...this.commands.keys()];
  }
}

export const commands =
  new CommandRegistry();