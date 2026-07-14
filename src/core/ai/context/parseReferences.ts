const FILE_REFERENCE_REGEX =
  /@([A-Za-z0-9._/-]+)/g;

export function parseReferences(
  prompt: string
): string[] {
  const matches = [
    ...prompt.matchAll(FILE_REFERENCE_REGEX),
  ];

  return matches.map((match) => match[1]);
}