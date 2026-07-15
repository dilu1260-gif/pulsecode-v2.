import type { OpenTab } from "@/features/explorer/explorerStore";

const KEY = "pulsecode-workspace-v1";

export interface SavedWorkspace {
  openTabs: OpenTab[];
  activeFile?: string;
}

export function saveWorkspace(
  workspace: SavedWorkspace
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(workspace)
  );
}

export function loadWorkspace(): SavedWorkspace | null {
  const raw = localStorage.getItem(KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}