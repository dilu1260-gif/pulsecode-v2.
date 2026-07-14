"use client";

interface Props {
  files: string[];
  visible: boolean;
  onSelect: (file: string) => void;
}

export default function ReferenceSuggestions({
  files,
  visible,
  onSelect,
}: Props) {
  if (!visible || files.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl">
      {files.map((file) => (
        <button
          key={file}
          onClick={() => onSelect(file)}
          className="block w-full border-b border-zinc-900 px-4 py-2 text-left text-sm text-zinc-200 transition hover:bg-zinc-900 last:border-b-0"
        >
          📄 {file}
        </button>
      ))}
    </div>
  );
}