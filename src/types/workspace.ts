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
