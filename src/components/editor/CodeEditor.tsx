"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        defaultValue={`// Welcome to PulseCode

export default function App() {
  return <h1>Hello PulseCode 🚀</h1>;
}
`}
        options={{
          minimap: {
            enabled: true,
          },
          fontSize: 14,
          automaticLayout: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          roundedSelection: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}