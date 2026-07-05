"use client";

import { WorkspaceNode } from "../../types/workspace";
import { useExplorerStore } from "./explorerStore";
import { FolderIcon, FileIcon } from "./icons";

interface Props {
  node: WorkspaceNode;
  level?: number;
}

export default function ExplorerItem({
  node,
  level = 0,
}: Props) {
  const {
    tree,
    setTree,
    openFile,
  } = useExplorerStore();

  const toggleFolder = (id: string) => {
    const update = (
      nodes: WorkspaceNode[]
    ): WorkspaceNode[] =>
      nodes.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            expanded: !n.expanded,
          };
        }

        if (n.children) {
          return {
            ...n,
            children: update(n.children),
          };
        }

        return n;
      });

    setTree(update(tree));
  };

  const handleContextMenu = (
    event: React.MouseEvent
  ) => {
    event.preventDefault();

    console.log("Right click:", node);
  };

  if (node.type === "folder") {
    return (
      <>
        <div
          onClick={() => toggleFolder(node.id)}
          onContextMenu={handleContextMenu}
          className="flex cursor-pointer select-none items-center gap-2 px-2 py-1 hover:bg-zinc-800"
          style={{
            paddingLeft: `${level * 16}px`,
          }}
        >
          <FolderIcon open={!!node.expanded} />
          <span>{node.name}</span>
        </div>

        {node.expanded &&
          node.children?.map((child) => (
            <ExplorerItem
              key={child.id}
              node={child}
              level={level + 1}
            />
          ))}
      </>
    );
  }

  return (
    <div
      onClick={() => openFile(node)}
      onContextMenu={handleContextMenu}
      className="flex cursor-pointer select-none items-center gap-2 px-2 py-1 hover:bg-zinc-800"
      style={{
        paddingLeft: `${level * 16}px`,
      }}
    >
      <FileIcon />
      <span>{node.name}</span>
    </div>
  );
}