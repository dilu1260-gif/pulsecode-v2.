"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { WorkspaceNode } from "@/types/workspace";
import { useExplorerStore } from "../explorerStore";
import { FolderIcon, FileIcon } from "./icons";
import ContextMenu from "./ContextMenu";

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
    loadTree,
  } = useExplorerStore();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  const toggleFolder = (id: string) => {
    const update = (nodes: WorkspaceNode[]): WorkspaceNode[] =>
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

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setMenuX(event.clientX);
    setMenuY(event.clientY);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleNewFile = async () => {
    closeMenu();

    if (node.type !== "folder") return;

    const fileName = prompt("Enter file name");

    if (!fileName) return;

    try {
      const res = await fetch("/api/files/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderPath: node.path,
          fileName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create file.");
      }

      await loadTree();

      toast.success("File created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create file.");
    }
  };

  const handleNewFolder = async () => {
    closeMenu();

    if (node.type !== "folder") return;

    const folderName = prompt("Enter folder name");

    if (!folderName) return;

    try {
      const res = await fetch("/api/files/create-folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentPath: node.path,
          folderName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create folder.");
      }

      await loadTree();

      toast.success("Folder created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create folder.");
    }
  };

  const handleRename = () => {
    closeMenu();
    console.log("Rename:", node);
  };

  const handleDelete = () => {
    closeMenu();
    console.log("Delete:", node);
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

        <ContextMenu
          x={menuX}
          y={menuY}
          visible={menuVisible}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
          onRename={handleRename}
          onDelete={handleDelete}
          onClose={closeMenu}
        />

        {node.expanded &&
          node.children?.map((child: WorkspaceNode) => (
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
    <>
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

      <ContextMenu
        x={menuX}
        y={menuY}
        visible={menuVisible}
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
        onRename={handleRename}
        onDelete={handleDelete}
        onClose={closeMenu}
      />
    </>
  );
}