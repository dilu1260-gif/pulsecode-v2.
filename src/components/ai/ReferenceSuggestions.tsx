"use client";

import { useEffect, useState } from "react";

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
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [files]);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((previous) =>
          Math.min(
            previous + 1,
            files.length - 1
          )
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedIndex((previous) =>
          Math.max(previous - 1, 0)
        );
      }

      if (event.key === "Enter") {
        if (files[selectedIndex]) {
          event.preventDefault();

          onSelect(files[selectedIndex]);
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    visible,
    files,
    selectedIndex,
    onSelect,
  ]);

  if (!visible || files.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl">
      {files.map((file, index) => (
        <button
          key={file}
          onClick={() => onSelect(file)}
          className={`block w-full border-b border-zinc-900 px-4 py-2 text-left text-sm transition last:border-b-0 ${
            index === selectedIndex
              ? "bg-blue-600 text-white"
              : "text-zinc-200 hover:bg-zinc-900"
          }`}
        >
          📄 {file}
        </button>
      ))}
    </div>
  );
}