export type DiffType =
  | "unchanged"
  | "added"
  | "removed"
  | "modified";

export interface DiffLine {
  type: DiffType;
  oldNumber?: number;
  newNumber?: number;
  oldLine: string;
  newLine: string;
}

export function buildDiff(
  original: string,
  updated: string
): DiffLine[] {
  const oldLines = original.split("\n");
  const newLines = updated.split("\n");

  const max = Math.max(
    oldLines.length,
    newLines.length
  );

  const result: DiffLine[] = [];

  for (let i = 0; i < max; i++) {
    const oldLine = oldLines[i] ?? "";
    const newLine = newLines[i] ?? "";

    let type: DiffType = "unchanged";

    if (!oldLine && newLine) {
      type = "added";
    } else if (oldLine && !newLine) {
      type = "removed";
    } else if (oldLine !== newLine) {
      type = "modified";
    }

    result.push({
      type,
      oldNumber: oldLine ? i + 1 : undefined,
      newNumber: newLine ? i + 1 : undefined,
      oldLine,
      newLine,
    });
  }

  return result;
}