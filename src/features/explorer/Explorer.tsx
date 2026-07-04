"use client";
import ExplorerItem from "./ExplorerItem";
import { useExplorerStore } from "./explorerStore";

export default function Explorer() {
  const { tree } = useExplorerStore();

  return (
    <div className="text-sm text-white">
      {tree.map((node) => (
        <ExplorerItem
          key={node.id}
          node={node}
        />
      ))}
    </div>
  );
}