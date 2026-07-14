"use client";

import { useEffect } from "react";

import { registerAICommands } from "@/core/commands/commands/aiCommands";

interface Props {
  children: React.ReactNode;
}

let initialized = false;

export default function CommandProvider({
  children,
}: Props) {
  useEffect(() => {
    if (initialized) {
      return;
    }

    initialized = true;

    registerAICommands();
  }, []);

  return <>{children}</>;
}