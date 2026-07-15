"use client";

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export default function CreateAllButton({
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      🚀 Create All Files
    </button>
  );
}