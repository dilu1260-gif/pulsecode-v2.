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
        content: ""
      },
      {
        id: "3",
        name: "main.tsx",
        type: "file",
        path: "src/main.tsx",
        language: "typescript",
        content: ""
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
            content: ""
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
    content: "{}"
  }
];