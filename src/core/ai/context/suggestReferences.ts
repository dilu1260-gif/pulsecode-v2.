export function suggestReferences(
  query: string,
  files: string[]
) {
  const value = query
    .trim()
    .toLowerCase();

  if (!value) {
    return files.slice(0, 20);
  }

  return files.filter((file) =>
    file.toLowerCase().includes(value)
  );
}