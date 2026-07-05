"use client";

import { useEffect, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useExplorerStore } from "@/features/explorer/explorerStore";

export default function CodeEditor() {
  const { activeFile, openTabs } = useExplorerStore();

  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [saving, setSaving] = useState(false);

  const file = openTabs.find((t) => t.id === activeFile);

  useEffect(() => {
    if (!file) {
      setContent("");
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
      }
    }

    loadFile();
  }, [file]);

  const saveFile = useCallback(async () => {
    if (!file) return;

    try {
      setSaving(true);

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

      alert("File saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save file.");
    } finally {
      setSaving(false);
    }
  }, [file, content]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSave =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s";

      if (!isSave) return;

      event.preventDefault();

      saveFile();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveFile]);

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1e1e1e] text-zinc-500">
        Open a file from the Explorer
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end border-b border-zinc-800 bg-zinc-900 p-2">
        <button
          onClick={saveFile}
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
          onChange={(value) => setContent(value ?? "")}
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
    </div>
  );
}