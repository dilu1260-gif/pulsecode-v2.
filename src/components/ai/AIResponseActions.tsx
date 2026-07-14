"use client";

interface Props {
  hasCode: boolean;
  onPreview: () => void;
  onDiff: () => void;
  onAccept: () => void;
  onReject: () => void;
}

export default function AIResponseActions({
  hasCode,
  onPreview,
  onDiff,
  onAccept,
  onReject,
}: Props) {
  if (!hasCode) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        onClick={onPreview}
        className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white transition hover:bg-zinc-700"
      >
        👁 Preview
      </button>

      <button
        onClick={onDiff}
        className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white transition hover:bg-zinc-700"
      >
        📊 Diff
      </button>

      <button
        onClick={onAccept}
        className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
      >
        ✅ Accept
      </button>

      <button
        onClick={onReject}
        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        ❌ Reject
      </button>
    </div>
  );
}