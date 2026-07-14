export function resolveReferences(
  references: string[],
  openFiles: string[]
): string[] {
  return references
    .map((reference) => {
      const normalized =
        reference.toLowerCase();

      return (
        openFiles.find((file) =>
          file
            .toLowerCase()
            .endsWith(normalized)
        ) ?? null
      );
    })
    .filter(
      (file): file is string =>
        file !== null
    );
}