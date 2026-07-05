import { create } from "zustand";
import type * as monaco from "monaco-editor";

interface EditorStore {
  editor: monaco.editor.IStandaloneCodeEditor | null;

  targetLine: number | null;
  searchTerm: string | null;

  setEditor: (
    editor: monaco.editor.IStandaloneCodeEditor | null
  ) => void;

  jumpTo: (line: number, term: string) => void;

  clearJump: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,

  targetLine: null,
  searchTerm: null,

  setEditor: (editor) =>
    set({
      editor,
    }),

  jumpTo: (line, term) =>
    set({
      targetLine: line,
      searchTerm: term,
    }),

  clearJump: () =>
    set({
      targetLine: null,
      searchTerm: null,
    }),
}));