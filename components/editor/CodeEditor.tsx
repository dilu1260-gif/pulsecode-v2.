"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={`export default function Hello() {
  return <h1>Hello PulseCode 🚀</h1>;
}`}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          roundedSelection: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}