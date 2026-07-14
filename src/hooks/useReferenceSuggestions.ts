"use client";

import { useMemo } from "react";

import { suggestReferences } from "@/core/ai/context/suggestReferences";

export function useReferenceSuggestions(
  prompt: string,
  files: string[]
) {
  const state = useMemo(() => {
    const match =
      /(?:^|\s)@([A-Za-z0-9._/-]*)$/.exec(
        prompt
      );

    if (!match) {
      return {
        visible: false,
        query: "",
        suggestions: [],
      };
    }

    const query = match[1];

    return {
      visible: true,
      query,
      suggestions:
        suggestReferences(
          query,
          files
        ),
    };
  }, [prompt, files]);

  return state;
}