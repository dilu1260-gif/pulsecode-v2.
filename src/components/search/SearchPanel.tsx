"use client";

import { useState } from "react";

interface SearchResult {
  file: string;
  line: number;
  text: string;
}

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const search = async () => {
    setSearching(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await res.json();

      setResults(data.results ?? []);
    } finally {
      setSearching(false);
    }
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
              search();
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
            <div
              key={index}
              className="mb-3 cursor-pointer rounded border border-zinc-800 p-3 hover:bg-zinc-900"
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
            </div>
          ))}

        {!searching &&
          results.length === 0 &&
          query !== "" && (
            <p className="text-sm text-zinc-500">
              No results found.
            </p>
          )}
      </div>
    </div>
  );
}