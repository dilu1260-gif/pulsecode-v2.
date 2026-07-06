import toast from "react-hot-toast";
import { WorkspaceNode } from "@/types/workspace";
import { useExplorerStore } from "../explorerStore";
import { useClipboardStore } from "../clipboardStore";

export function useExplorerActions(node: WorkspaceNode) {
  const { loadTree, updateOpenTab } = useExplorerStore();

  const copy = useClipboardStore((s) => s.copy);
  const cut = useClipboardStore((s) => s.cut);

  const handleNewFile = async () => {
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

  const handleRename = async (newName: string) => {
    if (!newName || newName === node.name) return;

    try {
      const res = await fetch("/api/files/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPath: node.path,
          newName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to rename.");
      }

      await loadTree();

      updateOpenTab(node.id, newName, data.path);

      toast.success("Renamed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to rename.");
    }
  };

  const handleCopy = () => {
    copy(node.path);
    toast.success("Copied to clipboard!");
  };

  const handleCut = () => {
    cut(node.path);
    toast.success("Cut to clipboard!");
  };

  const handleDuplicate = async () => {
    if (node.type !== "file") return;

    try {
      const res = await fetch("/api/files/duplicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourcePath: node.path,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to duplicate.");
      }

      await loadTree();

      toast.success("File duplicated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to duplicate file.");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(`Delete "${node.name}"?`);

    if (!confirmed) return;

    try {
      const res = await fetch("/api/files/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetPath: node.path,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete.");
      }

      await loadTree();

      toast.success("Deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete.");
    }
  };

  return {
    handleNewFile,
    handleNewFolder,
    handleRename,
    handleCopy,
    handleCut,
    handleDuplicate,
    handleDelete,
  };
}