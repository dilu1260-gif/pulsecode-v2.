import { getEditorInstance } from "./editorInstance";

export function replaceSelectedCode(
  newCode: string
) {
  const editor = getEditorInstance();

  if (!editor) {
    return;
  }

  const selection = editor.getSelection();

  if (!selection) {
    return;
  }

  editor.executeEdits(
    "pulse-ai",
    [
      {
        range: selection,
        text: newCode,
      },
    ]
  );

  editor.focus();
}