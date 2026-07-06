import { commands } from "./commandRegistry";
import fileCommands from "./builtin/fileCommands";

let registered = false;

export function registerBuiltinCommands() {
  if (registered) {
    return;
  }

  for (const command of fileCommands) {
    commands.register(command);
  }

  registered = true;
}