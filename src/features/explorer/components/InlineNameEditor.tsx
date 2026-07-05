"use client";

import { useEffect, useRef, useState } from "react";

interface InlineNameEditorProps {
  initialValue: string;
  placeholder?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export default function InlineNameEditor({
  initialValue,
  placeholder,
  onConfirm,
  onCancel,
}: InlineNameEditorProps) {
  const [value, setValue] = useState(initialValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const confirm = () => {
    onConfirm(value.trim());
  };

  return (
    <input
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={confirm}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          confirm();
        }

        if (e.key === "Escape") {
          onCancel();
        }
      }}
      className="w-full rounded bg-zinc-800 px-1 py-0.5 text-sm text-white outline-none ring-1 ring-blue-500"
    />
  );
}