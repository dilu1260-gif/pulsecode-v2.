"use client";

import { useEffect, useRef, useState } from "react";
export default function Terminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<string[]>([
    "Welcome to PulseCode Terminal",
  ]);
  const clearTerminal = () => {
  setOutput([
    "Welcome to PulseCode Terminal",
  ]);
};
const outputRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  outputRef.current?.scrollTo({
    top: outputRef.current.scrollHeight,
    behavior: "smooth",
  });
}, [output]);
  const runCommand = async () => {
    if (!command.trim()) return;

    const current = command;setHistory((prev) => [...prev, current]);
setHistoryIndex(-1);

    setOutput((prev) => [...prev, `$ ${current}`]);
    setCommand("");

    try {
      const res = await fetch("/api/terminal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: current,
        }),
      });

      const data = await res.json();

      if (data.stdout) {
        setOutput((prev) => [
          ...prev,
          data.stdout,
        ]);
      }

      if (data.stderr) {
        setOutput((prev) => [
          ...prev,
          data.stderr,
        ]);
      }
    } catch {
      setOutput((prev) => [
        ...prev,
        "Failed to execute command.",
      ]);
    }
  };

  return (
  <div className="flex h-64 flex-col border-t border-zinc-800 bg-[#181818]">

    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
      <span className="text-sm font-semibold text-zinc-300">
        TERMINAL
      </span>

      <button
        onClick={clearTerminal}
        className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white"
        title="Clear Terminal"
      >
        Clear
      </button>
    </div>

    <div
      ref={outputRef}
      className="flex-1 overflow-auto p-3 font-mono text-sm text-zinc-300 whitespace-pre-wrap"
    >
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>

    <div className="flex border-t border-zinc-800">
        <span className="px-3 py-2 text-green-400">$</span>

        <input
  value={command}
  onChange={(e) => setCommand(e.target.value)}
  autoCapitalize="off"
  autoCorrect="off"
  spellCheck={false}
  autoComplete="off"
  inputMode="text"
  enterKeyHint="go"
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      runCommand();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (history.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (history.length === 0) return;

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setCommand("");
        return;
      }

      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
    }
  }}
  className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-white outline-none"
  placeholder="Type a command..."
/>
      </div>
    </div>
  );
}