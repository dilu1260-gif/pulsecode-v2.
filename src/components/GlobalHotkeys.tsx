"use client";

import { useEffect } from "react";
import { useCommandPaletteStore } from "@/features/command-palette";
import { useAIStore } from "@/features/ai";

export default function GlobalHotkeys() {
const { open, setOpen } =
  useCommandPaletteStore();
  const {
  open: aiOpen,
  setOpen: setAIOpen,
} = useAIStore();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const ctrlOrCmd = event.ctrlKey || event.metaKey;

      if (!ctrlOrCmd) return;

      switch (event.key.toLowerCase()) {
        case "s":
          event.preventDefault();
          console.log("Ctrl+S");
          break;

        case "c":
          console.log("Ctrl+C");
          break;

        case "x":
          console.log("Ctrl+X");
          break;

        case "v":
          console.log("Ctrl+V");
          break;

        case "d":
          event.preventDefault();
          console.log("Ctrl+D");
          break;

          case "l":
  event.preventDefault();

  setAIOpen(!aiOpen);

  break;

        case "p":
  if (event.shiftKey) {
    event.preventDefault();

    setOpen(!open);

    break;
  }

  event.preventDefault();
  console.log("Ctrl+P");
  break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
  open,
  setOpen,
  aiOpen,
  setAIOpen,
]);

  return null;
}