export interface LoadedReference {
  path: string;
  content: string;
}

export async function loadReferences(
  files: string[]
): Promise<LoadedReference[]> {
  const loaded = await Promise.all(
    files.map(async (path) => {
      const response = await fetch(
        `/api/files/read?path=${encodeURIComponent(
          path
        )}`
      );

      if (!response.ok) {
        return null;
      }

      const content =
        await response.text();

      return {
        path,
        content,
      };
    })
  );

  return loaded.filter(
    (
      file
    ): file is LoadedReference =>
      file !== null
  );
}