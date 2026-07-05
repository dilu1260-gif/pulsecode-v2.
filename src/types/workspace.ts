export interface WorkspaceNode {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  expanded?: boolean;
  language?: string;
  content?: string;
  children?: WorkspaceNode[];
}
export interface WorkspaceNode {
  id: string;
  name: string;

  type: "file" | "folder";

  path: string;

  expanded?: boolean;

  language?: string;

  content?: string;

  children?: WorkspaceNode[];
}

export function findNodeById(
  nodes: WorkspaceNode[],
  id: string
): WorkspaceNode | undefined {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }

    if (node.children) {
      const found = findNodeById(
        node.children,
        id
      );

      if (found) return found;
    }
  }

  return undefined;
}

export function updateNodeContent(
  nodes: WorkspaceNode[],
  id: string,
  content: string
): WorkspaceNode[] {
  return nodes.map((node) => {

    if (node.id === id) {
      return {
        ...node,
        content,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: updateNodeContent(
          node.children,
          id,
          content
        ),
      };
    }

    return node;

  });
}