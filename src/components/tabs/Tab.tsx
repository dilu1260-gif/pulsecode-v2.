"use client";

interface TabProps {
  name: string;
  active: boolean;
  dirty?: boolean;
  onClick: () => void;
  onClose: () => void;
}

export default function Tab({
  name,
  active,
  dirty = false,
  onClick,
  onClose,
}: TabProps) {
  return (
    <div
      onClick={onClick}
      className={`group flex h-11 items-center gap-2 border-r border-zinc-800 px-4 transition-colors cursor-pointer select-none ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-950 text-zinc-400 hover:bg-zinc-900"
      }`}
    >
      <span
        className={`text-xs ${
          dirty ? "text-blue-400" : "text-transparent"
        }`}
      >
        ●
      </span>

      <span className="max-w-[140px] truncate text-sm">
        {name}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="ml-auto rounded px-1 text-zinc-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-zinc-700 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}