import type { PulseSettings } from "./types";

export const defaultSettings: PulseSettings = {
  editor: {
    theme: "vs-dark",
    fontSize: 14,
    wordWrap: true,
    tabSize: 2,
    minimap: true,
  },

  ai: {
    provider: "gemini",
    model: "gemini-2.5-flash",
    streaming: true,
    temperature: 0.2,
  },

  general: {
    autoSave: false,
    confirmDelete: true,
  },
};