import toast from "react-hot-toast";
import { WorkspaceNode } from "@/types/workspace";
import { useExplorerStore } from "../explorerStore";
import { useClipboardStore } from "../clipboardStore";
import { useCommand } from "@/core/commands";

export function useExplorerActions(node: WorkspaceNode) {
  const { loadTree, updateOpenTab } = useExplorerStore();

  const {
    copy,
    cut,
    clear,
    path: clipboardPath,
    operation,
  } = useClipboardStore();

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
useCommand({
  id: "explorer.copy",
  title: "Copy",
  category: "Explorer",
  shortcut: "Ctrl+C",
  description: "Copy selected file or folder.",
  handler: async () => {
    handleCopy();

    return {
      success: true,
    };
  },
});

const handleCut = () => {
  cut(node.path);
  toast.success("Cut to clipboard!");
};
  useCommand({
  id: "explorer.cut",
  title: "Cut",
  category: "Explorer",
  shortcut: "Ctrl+X",
  description: "Cut selected file or folder.",
  handler: async () => {
    handleCut();

    return {
      success: true,
    };
  },
});

  const handlePaste = async () => {
    if (
      node.type !== "folder" ||
      !clipboardPath ||
      !operation
    ) {
      return;
    }

    try {
      const res = await fetch("/api/files/paste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourcePath: clipboardPath,
          destinationFolder: node.path,
          operation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to paste."
        );
      }

      clear();

      await loadTree();

      toast.success("Pasted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to paste.");
    }
  };
useCommand({
  id: "explorer.paste",
  title: "Paste",
  category: "Explorer",
  shortcut: "Ctrl+V",
  description: "Paste copied or cut file.",
  handler: async () => {
    await handlePaste();

    return {
      success: true,
    };
  },
});
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
useCommand({
  id: "explorer.duplicate",
  title: "Duplicate",
  category: "Explorer",
  description: "Duplicate selected file.",
  handler: async () => {
    await handleDuplicate();

    return {
      success: true,
    };
  },
});
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
useCommand({
  id: "explorer.delete",
  title: "Delete",
  category: "Explorer",
  shortcut: "Delete",
  description: "Delete selected file or folder.",
  handler: async () => {
    await handleDelete();

    return {
      success: true,
    };
  },
});
  return {
    handleNewFile,
    handleNewFolder,
    handleRename,
    handleCopy,
    handleCut,
    handlePaste,
    handleDuplicate,
    handleDelete,
  };
}