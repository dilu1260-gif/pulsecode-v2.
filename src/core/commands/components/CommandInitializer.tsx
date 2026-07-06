"use client";

import { useEffect } from "react";
import { registerBuiltinCommands } from "../registerBuiltinCommands";

export default function CommandInitializer() {
  useEffect(() => {
    registerBuiltinCommands();
  }, []);

  return null;
}