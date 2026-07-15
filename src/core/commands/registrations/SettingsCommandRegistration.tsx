"use client";

import { useCommand } from "@/core/commands";
import { useSettingsDialogStore } from "@/core/settings/settingsDialogStore";

export default function SettingsCommandRegistration() {
  const { show } =
    useSettingsDialogStore();

  useCommand({
    id: "settings.open",
    title: "Open Settings",
    category: "Settings",
    shortcut: "Ctrl+,",
    description:
      "Open PulseCode Settings.",
    handler: async () => {
      show();

      return {
        success: true,
      };
    },
  });

  return null;
}