"use client";

import { buildDiff } from "@/core/ai/diff/diffEngine";

interface Props {
  original: string;
  updated: string;
}

export default function AIDiffViewer({
  original,
  updated,
}: Props) {
  const diff = buildDiff(original, updated);
  const added = diff.filter(
  (line) => line.type === "added"
).length;

const removed = diff.filter(
  (line) => line.type === "removed"
).length;

const modified = diff.filter(
  (line) => line.type === "modified"
).length;
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    console.error("Copy failed.");
  }
}
  const oldLines = original.split("\n");
  const newLines = updated.split("\n");

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black">
      {/* Header */}

      <div className="sticky top-0 z-20 grid grid-cols-2 border-b border-zinc-800 bg-zinc-950">
        <div className="border-r border-zinc-800 bg-red-950/30 px-4 py-3">
          <div className="font-semibold text-red-300">
            🔴 Original
          </div>

          <div className="mt-1 text-xs text-zinc-400">
            {oldLines.length} lines
          </div>
        </div>

        <div className="bg-green-950/30 px-4 py-3">
          <div className="font-semibold text-green-300">
            🟢 AI Version
          </div>

          <div className="mt-1 text-xs text-zinc-400">
            {newLines.length} lines
          </div>
        </div>
      </div>

      {/* Body */}
<div className="sticky top-[57px] z-10 flex items-center gap-6 border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-xs">
<div className="ml-auto flex gap-2">

  <button
    onClick={() => copyText(original)}
    className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300 transition hover:bg-zinc-700"
  >
    📋 Original
  </button>

  <button
    onClick={() => copyText(updated)}
    className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300 transition hover:bg-zinc-700"
  >
    📋 AI
  </button>

</div>
  <span className="font-medium text-green-400">
    + {added} Added
  </span>

  <span className="font-medium text-amber-400">
    ~ {modified} Modified
  </span>

  <span className="font-medium text-red-400">
    - {removed} Removed
  </span>

</div>
      <div className="overflow-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {diff.map((line, i) => {
              const leftBackground =
                line.type === "removed"
                  ? "bg-red-950/50"
                  : line.type === "modified"
                  ? "bg-amber-950/40"
                  : "";

              const rightBackground =
                line.type === "added"
                  ? "bg-green-950/50"
                  : line.type === "modified"
                  ? "bg-amber-950/40"
                  : "";

              return (
                <tr key={i}>
                  <td
                    className={`w-1/2 border-r border-zinc-800 px-3 py-1 font-mono whitespace-pre-wrap ${leftBackground}`}
                  >
                    <div className="flex gap-3">
                      <span className="w-10 select-none text-right text-zinc-500">
                        {line.oldNumber ?? ""}
                      </span>

                      <span className="flex-1">
                        {line.oldLine}
                      </span>
                    </div>
                  </td>

                  <td
                    className={`w-1/2 px-3 py-1 font-mono whitespace-pre-wrap ${rightBackground}`}
                  >
                    <div className="flex gap-3">
                      <span className="w-10 select-none text-right text-zinc-500">
                        {line.newNumber ?? ""}
                      </span>

                      <span className="flex-1">
                        {line.newLine}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}