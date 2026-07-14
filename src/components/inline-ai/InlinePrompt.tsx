"use client";

import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function InlinePrompt({
  open,
  value,
  onChange,
  onSubmit,
  onClose,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-24 z-50 w-[520px] -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Tell AI what to do..."
        className="w-full bg-transparent px-5 py-4 text-white outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }

          if (e.key === "Escape") {
            onClose();
          }
        }}
      />
    </div>
  );
}