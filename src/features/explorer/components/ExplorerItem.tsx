"use client";

import { useState } from "react";
import InlineNameEditor from "./InlineNameEditor";
import { WorkspaceNode } from "@/types/workspace";
import { useExplorerStore } from "../explorerStore";
import { useExplorerActions } from "../hooks/useExplorerActions";
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
  } = useExplorerStore();

  const {
  handleNewFile,
  handleNewFolder,
  handleRename,
  handleDuplicate,
  handleDelete,
} = useExplorerActions(node);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);const [renaming, setRenaming] = useState(false);

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

    setMenuX(event.clientX);
    setMenuY(event.clientY);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
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
          {renaming ? (
  <InlineNameEditor
    initialValue={node.name}
    onCancel={() => setRenaming(false)}
    onConfirm={(value) => {
      setRenaming(false);
      void handleRename(value);
    }}
  />
) : (
  <span>{node.name}</span>
)}
        </div>

        <ContextMenu
  x={menuX}
  y={menuY}
  visible={menuVisible}
  onNewFile={() => {
    closeMenu();
    handleNewFile();
  }}
  onNewFolder={() => {
    closeMenu();
    handleNewFolder();
  }}
  onRename={() => {
    closeMenu();
    setRenaming(true);
  }}
  onDelete={() => {
    closeMenu();
    handleDelete();
  }}
  onClose={closeMenu}
/>

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
        {renaming ? (
  <InlineNameEditor
    initialValue={node.name}
    onCancel={() => setRenaming(false)}
    onConfirm={(value) => {
      setRenaming(false);
      void handleRename(value);
    }}
  />
) : (
  <span>{node.name}</span>
)}
      </div>

      <ContextMenu
  x={menuX}
  y={menuY}
  visible={menuVisible}
  onRename={() => {
    closeMenu();
    setRenaming(true);
  }}
  onDuplicate={() => {
    closeMenu();
    handleDuplicate();
  }}
  onDelete={() => {
    closeMenu();
    handleDelete();
  }}
  onClose={closeMenu}
/>
    </>
  );
}