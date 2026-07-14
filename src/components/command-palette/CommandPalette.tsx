"use client";

import { useEffect, useMemo, useState } from "react";

import { getCommands } from "@/core/commands/registry";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({
  open,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");

  const commands = useMemo(
    () => getCommands(),
    []
  );

  const filtered = useMemo(() => {
    const value = query
      .trim()
      .toLowerCase();

    if (!value) {
      return commands;
    }

    return commands.filter((command) => {
      const text = [
        command.title,
        command.description,
        ...(command.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(value);
    });
  }, [query, commands]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-24">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <input
          autoFocus
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Type a command..."
          className="w-full border-b border-zinc-800 bg-transparent px-5 py-4 text-white outline-none"
        />

        <div className="max-h-[420px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-5 text-sm text-zinc-500">
              No commands found.
            </div>
          ) : (
            filtered.map((command) => (
              <button
                key={command.id}
                onClick={() => {
                  command.run({});
                  onClose();
                }}
                className="flex w-full items-center justify-between border-b border-zinc-900 px-5 py-4 text-left transition hover:bg-zinc-900"
              >
                <div>
                  <div className="font-medium text-white">
                    {command.title}
                  </div>

                  {command.description && (
                    <div className="mt-1 text-xs text-zinc-400">
                      {command.description}
                    </div>
                  )}
                </div>

                {command.shortcut && (
                  <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                    {command.shortcut}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
}