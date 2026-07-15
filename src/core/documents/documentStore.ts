"use client";

import { create } from "zustand";
import type { DocumentState } from "./types";

interface DocumentStore {
  documents: Record<string, DocumentState>;

  getDocument(
    path: string
  ): DocumentState | undefined;

  setDocument(
    path: string,
    document: DocumentState
  ): void;

  updateContent(
    path: string,
    content: string
  ): void;

  markSaved(
    path: string
  ): void;

  removeDocument(
    path: string
  ): void;

  clear(): void;
}

export const useDocumentStore =
  create<DocumentStore>((set, get) => ({
    documents: {},

    getDocument: (path) =>
      get().documents[path],

    setDocument: (
      path,
      document
    ) =>
      set((state) => ({
        documents: {
          ...state.documents,
          [path]: document,
        },
      })),

    updateContent: (
      path,
      content
    ) =>
      set((state) => {
        const document =
          state.documents[path];

        if (!document) {
          return state;
        }

        return {
          documents: {
            ...state.documents,
            [path]: {
              ...document,
              content,
              dirty: true,
            },
          },
        };
      }),

    markSaved: (path) =>
      set((state) => {
        const document =
          state.documents[path];

        if (!document) {
          return state;
        }

        return {
          documents: {
            ...state.documents,
            [path]: {
              ...document,
              dirty: false,
            },
          },
        };
      }),

    removeDocument: (path) =>
      set((state) => {
        const next = {
          ...state.documents,
        };

        delete next[path];

        return {
          documents: next,
        };
      }),

    clear: () =>
      set({
        documents: {},
      }),
  }));