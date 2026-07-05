import { WorkspaceNode } from "../types/workspace";

export const starterWorkspace: WorkspaceNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    path: "src",
    expanded: true,
    children: [
      {
        id: "2",
        name: "App.tsx",
        type: "file",
        path: "src/App.tsx",
        language: "typescript",
        content: `export default function App() {
  return (
    <div>
      <h1>Hello PulseCode 🚀</h1>
    </div>
  );
}`
      },
      {
        id: "3",
        name: "main.tsx",
        type: "file",
        path: "src/main.tsx",
        language: "typescript",
        content: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
);`
      },
      {
        id: "4",
        name: "components",
        type: "folder",
        path: "src/components",
        expanded: true,
        children: [
          {
            id: "5",
            name: "Button.tsx",
            type: "file",
            path: "src/components/Button.tsx",
            language: "typescript",
            content: `export default function Button() {
  return <button>Click Me</button>;
}`
          }
        ]
      }
    ]
  },
  {
    id: "6",
    name: "package.json",
    type: "file",
    path: "package.json",
    language: "json",
    content: `{
  "name": "pulsecode",
  "version": "1.0.0"
}`
  }
];