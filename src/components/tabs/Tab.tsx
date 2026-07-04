"use client";

interface TabProps {
  name: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
}

export default function Tab({
  name,
  active,
  onClick,
  onClose,
}: TabProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border-r border-zinc-800 cursor-pointer select-none transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-950 text-zinc-400 hover:bg-zinc-900"
      }`}
    >
      <span className="truncate max-w-[140px]">
        {name}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="rounded px-1 text-zinc-500 hover:bg-zinc-700 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}