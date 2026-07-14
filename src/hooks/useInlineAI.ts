"use client";

import { useCallback, useEffect, useState } from "react";

export function useInlineAI() {
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] =
    useState("");

  const openPrompt = useCallback(() => {
    setInstruction("");
    setOpen(true);
  }, []);

  const closePrompt = useCallback(() => {
    setOpen(false);
    setInstruction("");
  }, []);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        openPrompt();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [openPrompt]);

  return {
    open,
    instruction,
    setInstruction,
    openPrompt,
    closePrompt,
  };
}