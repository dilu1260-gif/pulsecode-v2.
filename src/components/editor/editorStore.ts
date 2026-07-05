import { create } from "zustand";
import type * as monaco from "monaco-editor";

interface EditorStore {
  editor: monaco.editor.IStandaloneCodeEditor | null;

  setEditor: (
    editor: monaco.editor.IStandaloneCodeEditor | null
  ) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,

  setEditor: (editor) =>
    set({
      editor,
    }),
}));