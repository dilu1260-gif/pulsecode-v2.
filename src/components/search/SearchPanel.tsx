"use client";

import { useState } from "react";
import { useExplorerStore } from "@/features/explorer/explorerStore";
import { useEditorStore } from "@/components/editor/editorStore";

interface SearchResult {
  file: string;
  line: number;
  text: string;
}

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const openFile = useExplorerStore((s) => s.openFile);
  const findNodeByPath = useExplorerStore((s) => s.findNodeByPath);
  const jumpTo = useEditorStore((s) => s.jumpTo);

  const search = async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      return;
    }

    setSearching(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: trimmed,
        }),
      });

      const data = await res.json();
      setResults(data.results ?? []);
    } finally {
      setSearching(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const node = findNodeByPath(result.file);

    if (!node) {
      return;
    }

    openFile(node);

    setTimeout(() => {
      jumpTo(result.line, query);
    }, 50);
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="mb-3 text-lg font-semibold text-white">
          🔍 Search
        </h2>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void search();
            }
          }}
          placeholder="Search project..."
          className="w-full rounded bg-zinc-900 p-2 text-white outline-none"
        />
      </div>

      <div className="flex-1 overflow-auto p-3">
        {searching && (
          <p className="text-sm text-zinc-400">
            Searching...
          </p>
        )}

        {!searching &&
          results.map((result, index) => (
            <button
              key={`${result.file}-${result.line}-${index}`}
              type="button"
              onClick={() => handleResultClick(result)}
              className="mb-3 w-full rounded border border-zinc-800 p-3 text-left transition-colors hover:bg-zinc-900"
            >
              <div className="text-sm font-semibold text-blue-400">
                {result.file}
              </div>

              <div className="text-xs text-zinc-500">
                Line {result.line}
              </div>

              <div className="mt-1 font-mono text-sm text-zinc-300">
                {result.text}
              </div>
            </button>
          ))}

        {!searching &&
          results.length === 0 &&
          query.trim() !== "" && (
            <p className="text-sm text-zinc-500">
              No results found.
            </p>
          )}
      </div>
    </div>
  );
}