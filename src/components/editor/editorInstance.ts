import type * as monaco from "monaco-editor";

let editor: monaco.editor.IStandaloneCodeEditor | null = null;

export function setEditorInstance(
  instance: monaco.editor.IStandaloneCodeEditor | null
) {
  editor = instance;
}

export function getEditorInstance() {
  return editor;
}