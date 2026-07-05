"use client";

import Explorer from "@/features/explorer/components/Explorer";
import { useExplorerStore } from "@/features/explorer/explorerStore";
import EditorTabs from "@/components/tabs/EditorTabs";
import CodeEditor from "@/components/editor/CodeEditor";
import Terminal from "@/components/terminal/Terminal";
import SearchPanel from "@/components/search/SearchPanel";

export default function Workspace() {
  const {
    openTabs,
    activeFile,
    setActiveFile,
    closeTab,
  } = useExplorerStore();

  return (
    <div className="flex h-screen bg-black">
      {/* Explorer + Search */}
      <aside className="flex w-80 flex-col border-r border-zinc-800">
        <div className="border-b border-zinc-800">
          <SearchPanel />
        </div>

        <div className="flex-1 overflow-auto">
          <Explorer />
        </div>
      </aside>

      {/* Editor */}
      <main className="flex flex-1 flex-col">
        <EditorTabs
          tabs={openTabs}
          activeTab={activeFile}
          onSelect={setActiveFile}
          onClose={closeTab}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>

          <Terminal />
        </div>
      </main>

      {/* AI Panel */}
      <aside className="w-96 border-l border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 p-4">
          <h2 className="text-lg font-semibold text-white">
            Pulse AI
          </h2>
        </div>

        <div className="p-4">
          <textarea
            className="h-40 w-full rounded-lg bg-black p-3 text-white outline-none"
            placeholder="Ask Pulse AI..."
          />

          <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700">
            Send
          </button>
        </div>
      </aside>
    </div>
  );
}