"use client";

import { useEffect, useMemo } from "react";

import { commands } from "./commandRegistry";
import type { CommandDefinition } from "./commandDefinition";

export function useCommand(
  command: CommandDefinition
) {
  const stableCommand = useMemo(
    () => command,
    [command]
  );

  useEffect(() => {
    commands.register(stableCommand);

    return () => {
      commands.unregister(stableCommand.id);
    };
  }, [stableCommand]);
}