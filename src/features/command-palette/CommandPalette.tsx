"use client";

import { useCommandPaletteStore } from "./commandPaletteStore";
import {
  commands,
  executeCommand,
} from "@/core/commands";

export default function CommandPalette() {
  const {
  open,
  search,
  setSearch,
  setOpen,
} = useCommandPaletteStore();
  const filteredCommands = commands
  .getAll()
  .filter((command) =>
    command.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24">
      <div className="w-full max-w-2xl rounded-lg border border-zinc-700 bg-zinc-900 shadow-2xl">
        <input
          autoFocus
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Type a command..."
          className="w-full border-b border-zinc-700 bg-transparent px-4 py-3 text-white outline-none"
        />

        <div className="max-h-96 overflow-y-auto">
  {filteredCommands.length === 0 ? (
    <div className="p-3 text-sm text-zinc-500">
      No commands found.
    </div>
  ) : (
    filteredCommands.map((command) => (
      <button
  key={command.id}
  onClick={() => {
    void executeCommand(
      command.id,
      {
        source: "command-palette",
      }
    );

    setSearch("");
    setOpen(false);
  }}
  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-zinc-800"
>
        <div>
          <div className="text-sm text-white">
            {command.title}
          </div>

          <div className="text-xs text-zinc-500">
            {command.category}
          </div>
        </div>

        <div className="text-xs text-zinc-400">
          {command.shortcut}
        </div>
      </button>
    ))
  )}
</div>
      </div>
    </div>
  );
}