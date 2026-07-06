"use client";

interface Props {
  disabled?: boolean;
  onExplain: () => void;
  onFix: () => void;
  onOptimize: () => void;
  onTests: () => void;
  onComments: () => void;
}

export default function AIQuickActions({
  disabled,
  onExplain,
  onFix,
  onOptimize,
  onTests,
  onComments,
}: Props) {
  const buttonClass =
    "rounded bg-zinc-800 px-3 py-2 text-sm text-white hover:bg-zinc-700 disabled:opacity-50";

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <button disabled={disabled} onClick={onExplain} className={buttonClass}>
        ✨ Explain
      </button>

      <button disabled={disabled} onClick={onFix} className={buttonClass}>
        🛠 Fix
      </button>

      <button disabled={disabled} onClick={onOptimize} className={buttonClass}>
        ⚡ Optimize
      </button>

      <button disabled={disabled} onClick={onTests} className={buttonClass}>
        🧪 Tests
      </button>

      <button disabled={disabled} onClick={onComments} className={buttonClass}>
        💬 Comments
      </button>
    </div>
  );
}