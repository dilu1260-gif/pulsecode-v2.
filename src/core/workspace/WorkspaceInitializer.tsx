"use client";

import { useEffect } from "react";

import { useExplorerStore } from "@/features/explorer/explorerStore";

import {
  loadWorkspace,
  saveWorkspace,
} from "./workspaceStorage";

export default function WorkspaceInitializer() {
  const {
    openTabs,
    activeFile,
    restoreWorkspace,
  } = useExplorerStore();

  useEffect(() => {
    const saved = loadWorkspace();

    if (!saved) {
      return;
    }

    restoreWorkspace(
      saved.openTabs,
      saved.activeFile
    );
  }, [restoreWorkspace]);

  useEffect(() => {
    saveWorkspace({
      openTabs,
      activeFile,
    });
  }, [openTabs, activeFile]);

  return null;
}