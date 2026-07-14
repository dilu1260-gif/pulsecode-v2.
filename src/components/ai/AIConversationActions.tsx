"use client";

interface Props {
  onExport: () => void;
  onImport: () => void;
}

export default function AIConversationActions({
  onExport,
  onImport,
}: Props) {
  return (
    <div className="border-b border-zinc-800 p-3 space-y-2">
      <button
        onClick={onExport}
        className="w-full rounded-lg bg-zinc-800 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        ⬇ Export Chats
      </button>

      <button
        onClick={onImport}
        className="w-full rounded-lg bg-zinc-800 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        ⬆ Import Chats
      </button>
    </div>
  );
}