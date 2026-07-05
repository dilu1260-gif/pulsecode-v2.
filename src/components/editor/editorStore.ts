import { create } from "zustand";
import type * as monaco from "monaco-editor";

interface EditorStore {
  editor: monaco.editor.IStandaloneCodeEditor | null;

  targetLine: number | null;

  setEditor: (
    editor: monaco.editor.IStandaloneCodeEditor | null
  ) => void;

  jumpToLine: (line: number) => void;

  clearJump: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,

  targetLine: null,

  setEditor: (editor) =>
    set({
      editor,
    }),

  jumpToLine: (line) =>
    set({
      targetLine: line,
    }),

  clearJump: () =>
    set({
      targetLine: null,
    }),
}));