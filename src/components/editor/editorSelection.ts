import { getEditorInstance } from "./editorInstance";

export interface EditorSelection {
  selectedText: string;
  fileName?: string;
  language?: string;
}

export function getEditorSelection(): EditorSelection {
  const editor = getEditorInstance();

  if (!editor) {
    return {
      selectedText: "",
    };
  }

  const model = editor.getModel();

  return {
    selectedText: editor.getModel()?.getValueInRange(
      editor.getSelection()!
    ) ?? "",
    fileName: model?.uri.path.split("/").pop(),
    language: model?.getLanguageId(),
  };
}