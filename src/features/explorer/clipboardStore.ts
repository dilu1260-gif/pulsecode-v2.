"use client";

import { create } from "zustand";

export type ClipboardOperation = "copy" | "cut";

interface ClipboardState {
  path?: string;
  operation?: ClipboardOperation;

  copy: (path: string) => void;
  cut: (path: string) => void;
  clear: () => void;
}

export const useClipboardStore = create<ClipboardState>((set) => ({
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
}));