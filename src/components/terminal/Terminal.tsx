"use client";

import { useState } from "react";

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Welcome to PulseCode Terminal",
  ]);

  const runCommand = async () => {
    if (!command.trim()) return;

    const current = command;

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
      <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300">
        TERMINAL
      </div>

      <div className="flex-1 overflow-auto p-3 font-mono text-sm text-zinc-300 whitespace-pre-wrap">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      <div className="flex border-t border-zinc-800">
        <span className="px-3 py-2 text-green-400">$</span>

        <input
          value={command}
          onChange={(e) =>
            setCommand(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runCommand();
            }
          }}
          className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-white outline-none"
          placeholder="Type a command..."
        />
      </div>
    </div>
  );
}