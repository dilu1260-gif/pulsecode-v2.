import { WorkspaceNode } from "@/types/workspace";

export interface IndexedFile {
  name: string;
  path: string;
}

export function buildWorkspaceIndex(
  tree: WorkspaceNode[]
): IndexedFile[] {
  const files: IndexedFile[] = [];

  function walk(
    nodes: WorkspaceNode[]
  ) {
    for (const node of nodes) {
      if (node.type === "file") {
        files.push({
          name: node.name,
          path: node.path,
        });
      }

      if (node.children) {
        walk(node.children);
      }
    }
  }

  walk(tree);

  return files;
}