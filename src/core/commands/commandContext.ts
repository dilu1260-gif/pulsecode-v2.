import type { CommandContext } from "./commandTypes";

let currentContext: CommandContext = {
  source: "toolbar",
};

export function getCommandContext() {
  return currentContext;
}

export function setCommandContext(
  context: CommandContext
) {
  currentContext = context;
}

export function resetCommandContext() {
  currentContext = {
    source: "toolbar",
  };
}