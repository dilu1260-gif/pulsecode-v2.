"use client";

import { useCommand } from "@/core/commands";
import { useExplorerStore } from "@/features/explorer/explorerStore";

export default function WorkspaceCommandRegistration() {
  const closeAllTabs = useExplorerStore(
    (state) => state.closeAllTabs
  );

  useCommand({
    id: "workspace.close-all-tabs",
    title: "Close All Tabs",
    category: "Workspace",
    description: "Close every open editor tab.",
    handler: async () => {
      closeAllTabs();

      return {
        success: true,
      };
    },
  });

  return null;
}