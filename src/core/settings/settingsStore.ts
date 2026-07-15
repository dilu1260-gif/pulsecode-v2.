import { create } from "zustand";
import { defaultSettings } from "./defaultSettings";
import type { PulseSettings } from "./types";
import {
  loadSettings,
  saveSettings,
} from "./storage";

interface SettingsStore {
  settings: PulseSettings;

  update(settings: {
    editor?: Partial<PulseSettings["editor"]>;
    ai?: Partial<PulseSettings["ai"]>;
    general?: Partial<PulseSettings["general"]>;
  }): void;

  toggleWordWrap(): void;

  toggleMinimap(): void;

  increaseFontSize(): void;

  decreaseFontSize(): void;

  reset(): void;
}

export const useSettingsStore =
  create<SettingsStore>((set) => ({
    settings:
      loadSettings() ??
      defaultSettings,

    update: (settings) =>
      set((state) => {
        const next = {
          ...state.settings,

          editor: {
            ...state.settings.editor,
            ...(settings.editor ?? {}),
          },

          ai: {
            ...state.settings.ai,
            ...(settings.ai ?? {}),
          },

          general: {
            ...state.settings.general,
            ...(settings.general ?? {}),
          },
        };

        saveSettings(next);

        return {
          settings: next,
        };
      }),

    toggleWordWrap: () =>
      set((state) => {
        const next = {
          ...state.settings,
          editor: {
            ...state.settings.editor,
            wordWrap:
              !state.settings.editor.wordWrap,
          },
        };

        saveSettings(next);

        return {
          settings: next,
        };
      }),

    toggleMinimap: () =>
      set((state) => {
        const next = {
          ...state.settings,
          editor: {
            ...state.settings.editor,
            minimap:
              !state.settings.editor.minimap,
          },
        };

        saveSettings(next);

        return {
          settings: next,
        };
      }),

    increaseFontSize: () =>
      set((state) => {
        const next = {
          ...state.settings,
          editor: {
            ...state.settings.editor,
            fontSize: Math.min(
              state.settings.editor.fontSize + 1,
              32
            ),
          },
        };

        saveSettings(next);

        return {
          settings: next,
        };
      }),

    decreaseFontSize: () =>
      set((state) => {
        const next = {
          ...state.settings,
          editor: {
            ...state.settings.editor,
            fontSize: Math.max(
              state.settings.editor.fontSize - 1,
              10
            ),
          },
        };

        saveSettings(next);

        return {
          settings: next,
        };
      }),

    reset: () => {
      saveSettings(defaultSettings);

      set({
        settings: defaultSettings,
      });
    },
  }));