"use client";

import { useCallback } from "react";

export function useEditorFile() {
  const loadFile = useCallback(async () => {
    // Phase 1
  }, []);

  const saveFile = useCallback(async () => {
    // Phase 1
  }, []);

  return {
    loadFile,
    saveFile,
  };
}