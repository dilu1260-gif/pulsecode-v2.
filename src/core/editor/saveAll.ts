import { useExplorerStore } from "@/features/explorer/explorerStore";

export async function saveAllFiles() {
  const { openTabs } =
    useExplorerStore.getState();

  const dirtyTabs = openTabs.filter(
    (tab) => tab.dirty
  );

  for (const tab of dirtyTabs) {
    await fetch("/api/files/write", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        filePath: tab.path,
        content: "",
      }),
    });

    useExplorerStore
      .getState()
      .setTabDirty(tab.id, false);
  }

  return dirtyTabs.length;
}