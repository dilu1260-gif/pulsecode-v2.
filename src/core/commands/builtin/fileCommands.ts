import type { CommandDefinition } from "../commandDefinition";

const fileCommands: CommandDefinition[] = [
  {
    id: "file.save",
    title: "Save File",
    category: "File",
    shortcut: "Ctrl+S",
    description: "Save the active file.",
    async handler() {
      return {
        success: true,
        message: "Save command executed.",
      };
    },
  },
];

export default fileCommands;