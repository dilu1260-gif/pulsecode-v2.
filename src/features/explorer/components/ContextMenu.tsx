"use client";

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  onNewFile: () => void;
  onNewFolder: () => void;
  onRename: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  visible,
  onNewFile,
  onNewFolder,
  onRename,
  onDelete,
  onClose,
}: ContextMenuProps) {
  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      <div
        className="fixed z-50 w-52 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl"
        style={{
          left: x,
          top: y,
        }}
      >
        <button
          onClick={onNewFile}
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-zinc-800"
        >
          📄 New File
        </button>

        <button
          onClick={onNewFolder}
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-zinc-800"
        >
          📁 New Folder
        </button>

        <div className="border-t border-zinc-800" />

        <button
          onClick={onRename}
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-zinc-800"
        >
          ✏ Rename
        </button>

        <button
          onClick={onDelete}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-800"
        >
          🗑 Delete
        </button>
      </div>
    </>
  );
}