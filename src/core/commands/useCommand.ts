"use client";

import { useEffect } from "react";
import {
  commands,
  type CommandHandler,
} from "./commandRegistry";

export function useCommand(
  id: string,
  handler: CommandHandler
) {
  useEffect(() => {
    commands.register(id, handler);

    return () => {
      commands.unregister(id);
    };
  }, [id, handler]);
}