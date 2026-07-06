"use client";

import { create } from "zustand";

export type ClipboardOperation = "copy" | "cut";

interface ClipboardState {
  path?: string;
  operation?: ClipboardOperation;

  copy: (path: string) => void;
  cut: (path: string) => void;
  clear: () => void;

  hasData: () => boolean;
}

export const useClipboardStore = create<ClipboardState>((set, get) => ({
  path: undefined,
  operation: undefined,

  copy: (path) =>
    set({
      path,
      operation: "copy",
    }),

  cut: (path) =>
    set({
      path,
      operation: "cut",
    }),

  clear: () =>
    set({
      path: undefined,
      operation: undefined,
    }),

  hasData: () => {
    const state = get();

    return !!state.path && !!state.operation;
  },
}));