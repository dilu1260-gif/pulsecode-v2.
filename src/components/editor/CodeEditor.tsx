"use client";

import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useExplorerStore } from "@/features/explorer/explorerStore";
import { useRef } from "react";
import type * as monaco from "monaco-editor";
import { useEditorStore } from "./editorStore";
import { setEditorInstance } from "./editorInstance";

import {
  useCommand,
  executeCommand,
} from "@/core/commands";
export default function CodeEditor() {
  const {
    activeFile,
    openTabs,
    setTabDirty,
  } = useExplorerStore();

  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("Ready");

const editorRef =

  useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

const { targetLine, searchTerm, clearJump } = useEditorStore();

  const file = openTabs.find((t) => t.id === activeFile);

  useEffect(() => {
    if (!file) {
      setContent("");
      setStatus("Ready");
      return;
    }

    const currentFile = file;

    async function loadFile() {
      try {
        const res = await fetch("/api/files/read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filePath: currentFile.path,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load file");
        }

        setContent(data.content ?? "");
        setStatus("Ready");
        setTabDirty(currentFile.id, false);

        const ext = currentFile.path.split(".").pop()?.toLowerCase();

        switch (ext) {
          case "json":
            setLanguage("json");
            break;
          case "js":
          case "jsx":
            setLanguage("javascript");
            break;
          case "ts":
          case "tsx":
            setLanguage("typescript");
            break;
          case "css":
            setLanguage("css");
            break;
          case "html":
            setLanguage("html");
            break;
          case "md":
            setLanguage("markdown");
            break;
          default:
            setLanguage("plaintext");
        }
      } catch (err) {
        console.error(err);
        setContent("Failed to load file.");
        setStatus("Error");
      }
    }

    loadFile();
  }, [activeFile, file?.path, setTabDirty]);

  const saveFile = useCallback(async () => {
    if (!file) return;

    try {
      setSaving(true);
      setStatus("Saving...");

      const res = await fetch("/api/files/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath: file.path,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      toast.success("File saved successfully!");
      setStatus("Saved");
      setTabDirty(file.id, false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save file.");
      setStatus("Error");
    } finally {
      setSaving(false);
    }
  }, [file, content, setTabDirty]);
  
  useCommand({
  id: "file.save",
  title: "Save File",
  category: "File",
  shortcut: "Ctrl+S",
  description: "Save the active file.",
  handler: async () => {
    await saveFile();

    return {
      success: true,
    };
  },
});

  useEffect(() => {
    const handleKeyDown = async (
  event: KeyboardEvent
) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();

        await executeCommand(
  "file.save",
  {
    source: "keyboard",
    activeFile: file?.path,
  }
);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveFile]);
  useEffect(() => {
  if (!editorRef.current || targetLine == null) {
    return;
  }

  const editor = editorRef.current;

  editor.revealLineInCenter(targetLine);

  let column = 1;
  let endColumn = 1;

  if (searchTerm) {
    const model = editor.getModel();

    if (model) {
      const lineText = model.getLineContent(targetLine);

      const index = lineText
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase());

      if (index >= 0) {
        column = index + 1;
        endColumn = column + searchTerm.length;
      }
    }
  }

  editor.setSelection({
    startLineNumber: targetLine,
    startColumn: column,
    endLineNumber: targetLine,
    endColumn,
  });

  editor.focus();

  clearJump();
}, [targetLine, searchTerm, clearJump]);

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1e1e1e] text-zinc-500">
        Open a file from the Explorer
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 p-2">
        <span className="text-xs text-zinc-400">
          {status}
        </span>

        <button
          onClick={() =>
  executeCommand("file.save", {
    source: "toolbar",
    activeFile: file.path,
  })
}
          disabled={saving}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          theme="vs-dark"
          path={file.path}
          language={language}
          value={content}
          onMount={(editor) => {
  editorRef.current = editor;
  setEditorInstance(editor);
}}
          onChange={(value) => {
            setContent(value ?? "");
            setStatus("Modified");
            setTabDirty(file.id, true);
          }}
          options={{
            minimap: {
              enabled: true,
            },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
        />
      </div>

      <div className="flex h-8 items-center border-t border-zinc-800 bg-zinc-900 px-4 text-xs text-zinc-400">
        PulseCode v0.2 • {language} • {status}
      </div>
    </div>
  );
}