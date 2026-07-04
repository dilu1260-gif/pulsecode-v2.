"use client";

import Tab from "./Tab";

export interface OpenTab {
  id: string;
  name: string;
}

interface EditorTabsProps {
  tabs: OpenTab[];
  activeTab?: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

export default function EditorTabs({
  tabs,
  activeTab,
  onSelect,
  onClose,
}: EditorTabsProps) {
  return (
    <div className="flex h-11 items-center overflow-x-auto border-b border-zinc-800 bg-zinc-950">
      {tabs.length === 0 ? (
        <div className="px-4 text-sm text-zinc-500">
          No file open
        </div>
      ) : (
        tabs.map((tab) => (
          <Tab
            key={tab.id}
            name={tab.name}
            active={activeTab === tab.id}
            onClick={() => onSelect(tab.id)}
            onClose={() => onClose(tab.id)}
          />
        ))
      )}
    </div>
  );
}