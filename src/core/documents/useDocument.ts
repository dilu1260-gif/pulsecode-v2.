"use client";

import { useDocumentStore } from "./documentStore";

export function useDocument(
  path: string
) {
  return useDocumentStore(
    (state) =>
      state.documents[path]
  );
}