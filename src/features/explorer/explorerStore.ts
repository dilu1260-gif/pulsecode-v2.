"use client";

import { create } from "zustand";
import { WorkspaceNode } from "../../types/workspace";
import { starterWorkspace } from "../../data/starterWorkspace";

interface OpenTab {
  id: string;
  name: string;
}

interface ExplorerStore {
  tree: WorkspaceNode[];
  activeFile?: string;
  openTabs: OpenTab[];

  setTree: (tree: WorkspaceNode[]) => void;

  openFile: (file: WorkspaceNode) => void;

  setActiveFile: (id: string) => void;

  closeTab: (id: string) => void;
}

export const useExplorerStore = create<ExplorerStore>((set, get) => ({
  tree: starterWorkspace,

  activeFile: undefined,

  openTabs: [],

  setTree: (tree) =>
    set({
      tree,
    }),

  openFile: (file) => {
    const exists = get().openTabs.find((t) => t.id === file.id);

    if (!exists) {
      set({
        openTabs: [
          ...get().openTabs,
          {
            id: file.id,
            name: file.name,
          },
        ],
      });
    }

    set({
      activeFile: file.id,
    });
  },

  setActiveFile: (id) =>
    set({
      activeFile: id,
    }),

  closeTab: (id) => {
    const tabs = get().openTabs.filter((t) => t.id !== id);

    set({
      openTabs: tabs,
      activeFile:
        get().activeFile === id
          ? tabs[tabs.length - 1]?.id
          : get().activeFile,
    });
  },
}));