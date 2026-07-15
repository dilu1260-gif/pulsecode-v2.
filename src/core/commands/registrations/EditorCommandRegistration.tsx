"use client";

import { useCommand } from "@/core/commands";
import { useSettingsStore } from "@/core/settings/settingsStore";

export default function EditorCommandRegistration() {
  const {
    toggleWordWrap,
    toggleMinimap,
    increaseFontSize,
    decreaseFontSize,
  } = useSettingsStore();

  useCommand({
    id: "editor.toggleWordWrap",
    title: "Toggle Word Wrap",
    category: "Editor",
    description: "Enable or disable editor word wrap.",
    handler: async () => {
      toggleWordWrap();

      return {
        success: true,
      };
    },
  });

  useCommand({
    id: "editor.toggleMinimap",
    title: "Toggle Minimap",
    category: "Editor",
    description: "Show or hide the editor minimap.",
    handler: async () => {
      toggleMinimap();

      return {
        success: true,
      };
    },
  });

  useCommand({
    id: "editor.increaseFontSize",
    title: "Increase Font Size",
    category: "Editor",
    description: "Increase the editor font size.",
    handler: async () => {
      increaseFontSize();

      return {
        success: true,
      };
    },
  });

  useCommand({
    id: "editor.decreaseFontSize",
    title: "Decrease Font Size",
    category: "Editor",
    description: "Decrease the editor font size.",
    handler: async () => {
      decreaseFontSize();

      return {
        success: true,
      };
    },
  });

  return null;
}