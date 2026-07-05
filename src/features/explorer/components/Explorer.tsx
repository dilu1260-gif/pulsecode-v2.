"use client";

import { useEffect } from "react";
import ExplorerItem from "./ExplorerItem";
import { useExplorerStore } from "../explorerStore";

export default function Explorer() {
  const { tree, loadTree } = useExplorerStore();

  useEffect(() => {
    loadTree();
  }, [loadTree]);

  return (
    <aside className="w-64 overflow-auto border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-3 text-sm font-semibold text-white">
        Explorer
      </div>

      <div className="p-2">
        {tree.map((node) => (
          <ExplorerItem
            key={node.id}
            node={node}
          />
        ))}
      </div>
    </aside>
  );
}