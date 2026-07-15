"use client";

import SettingsDialog from "./SettingsDialog";
import { useSettingsDialogStore } from "@/core/settings/settingsDialogStore";

export default function SettingsPanel() {
  const { open, hide } =
    useSettingsDialogStore();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-4xl rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <button
          onClick={hide}
          className="absolute right-4 top-4 rounded-lg px-3 py-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          ✕
        </button>

        <div className="p-6">
          <SettingsDialog />
        </div>
      </div>
    </div>
  );
}