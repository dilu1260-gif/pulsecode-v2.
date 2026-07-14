"use client";

interface Props {
  onCopy: () => void;
  onPreview: () => void;
  onDiff: () => void;
  onApply: () => void;
}

export default function AICodeActions({
  onCopy,
  onPreview,
  onDiff,
  onApply,
}: Props) {
  const buttonClass =
    "rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-zinc-800";

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        onClick={onCopy}
        className={buttonClass}
      >
        📋 Copy
      </button>

      <button
        onClick={onPreview}
        className={buttonClass}
      >
        👀 Preview
      </button>

      <button
        onClick={onDiff}
        className={buttonClass}
      >
        📊 Diff
      </button>

      <button
        onClick={onApply}
        className={buttonClass}
      >
        ✨ Apply
      </button>
    </div>
  );
}