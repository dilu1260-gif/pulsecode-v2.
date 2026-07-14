import type { Command } from "./types";

const commands: Command[] = [];

export function registerCommand(
  command: Command
) {
  const exists = commands.some(
    (c) => c.id === command.id
  );

  if (exists) {
    throw new Error(
      `Command "${command.id}" is already registered.`
    );
  }

  commands.push(command);
}

export function getCommands() {
  return [...commands];
}

export function findCommand(
  id: string
) {
  return commands.find(
    (command) => command.id === id
  );
}

export function clearCommands() {
  commands.length = 0;
}