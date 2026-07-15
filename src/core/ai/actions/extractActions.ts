export interface AIAction {
  type: string;
  path?: string;
  content?: string;
}

const ACTION_REGEX =
  /<Action\s+type="([^"]+)"(?:\s+path="([^"]+)")?>\s*([\s\S]*?)<\/Action>/g;

export function extractActions(
  text: string
): AIAction[] {
  const actions: AIAction[] = [];

  for (const match of text.matchAll(ACTION_REGEX)) {
    actions.push({
      type: match[1],
      path: match[2],
      content: match[3].trim(),
    });
  }

  return actions;
}