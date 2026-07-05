import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface WorkspaceNode {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  children?: WorkspaceNode[];
}

const IGNORE = new Set([
  ".git",
  ".next",
  "node_modules",
  ".turbo",
  ".vercel",
  ".DS_Store",
]);

let idCounter = 0;

async function buildTree(dir: string, root: string): Promise<WorkspaceNode[]> {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  const nodes: WorkspaceNode[] = [];

  for (const entry of entries) {
    if (IGNORE.has(entry.name)) continue;

    const absolute = path.join(dir, entry.name);

    const relative = path
      .relative(root, absolute)
      .replace(/\\/g, "/");

    const node: WorkspaceNode = {
      id: String(++idCounter),
      name: entry.name,
      type: entry.isDirectory() ? "folder" : "file",
      path: relative,
    };

    if (entry.isDirectory()) {
      node.children = await buildTree(
        absolute,
        root
      );
    }

    nodes.push(node);
  }

  nodes.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }

    return a.type === "folder" ? -1 : 1;
  });

  return nodes;
}

export async function GET() {
  try {
    idCounter = 0;

    const root = process.cwd();

    const tree = await buildTree(root, root);

    return NextResponse.json(tree);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to build workspace.",
      },
      {
        status: 500,
      }
    );
  }
}