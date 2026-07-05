"use client";

import { create } from "zustand";
import { WorkspaceNode } from "../../types/workspace";

export interface OpenTab {
  id: string;
  name: string;
  path: string;
  dirty?: boolean;
}

interface ExplorerStore {
  tree: WorkspaceNode[];

  openTabs: OpenTab[];

  activeFile?: string;

  setTree: (tree: WorkspaceNode[]) => void;

  setActiveFile: (id: string) => void;

  openFile: (file: WorkspaceNode) => void;

  closeTab: (id: string) => void;

  setTabDirty: (id: string, dirty: boolean) => void;

  loadTree: () => Promise<void>;
}

export const useExplorerStore = create<ExplorerStore>((set, get) => ({

  tree: [],

  openTabs: [],

  activeFile: undefined,

  setTree: (tree) =>
    set({
      tree,
    }),

  setActiveFile: (id) =>
    set({
      activeFile: id,
    }),

  openFile: (file) => {
    const tabs = get().openTabs;

    if (!tabs.find((t) => t.id === file.id)) {
      set({
        openTabs: [
          ...tabs,
          {
            id: file.id,
            name: file.name,
            path: file.path,
            dirty: false,
          },
        ],
      });
    }

    set({
      activeFile: file.id,
    });
  },

  closeTab: (id) => {
    const tabs = get().openTabs.filter((t) => t.id !== id);

    set({
      openTabs: tabs,
      activeFile: tabs.length ? tabs[0].id : undefined,
    });
  },

  setTabDirty: (id, dirty) => {
    set({
      openTabs: get().openTabs.map((tab) =>
        tab.id === id
          ? {
              ...tab,
              dirty,
            }
          : tab
      ),
    });
  },

  loadTree: async () => {
    const res = await fetch("/api/files/tree");
    const tree = await res.json();

    set({
      tree,
    });
  },

}));