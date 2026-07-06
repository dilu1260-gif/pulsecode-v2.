"use client";

import { useEffect } from "react";

import { commands } from "./commandRegistry";
import type { CommandDefinition } from "./commandDefinition";

export function useCommand(
  command: CommandDefinition
) {
  useEffect(() => {
    commands.register(command);

    return () => {
      commands.unregister(command.id);
    };
  }, [command]);
}