import type { CommandContext } from "./types";

let currentContext: CommandContext = {};

export function setCommandContext(
  context: CommandContext
) {
  currentContext = context;
}

export function getCommandContext() {
  return currentContext;
}