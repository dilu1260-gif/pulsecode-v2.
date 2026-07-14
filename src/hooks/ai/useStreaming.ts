import { useRef } from "react";

import type { AIMessage } from "@/core/ai/types";

interface Props {
  setMessages: (
    updater:
      | AIMessage[]
      | ((
          previous: AIMessage[]
        ) => AIMessage[])
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;
}

export function useStreaming({
  setMessages,
  setLoading,
}: Props) {
  const abortControllerRef =
    useRef<AbortController | null>(
      null
    );

  function updateAssistantMessage(
    content: string
  ) {
    setMessages((previous) => {
      const next = [...previous];

      if (
        next.length === 0
      ) {
        return next;
      }

      next[next.length - 1] = {
        role: "assistant",
        content,
      };

      return next;
    });
  }

  function removeLastAssistantMessage() {
    setMessages((previous) => {
      const next = [...previous];

      if (
        next.length > 0 &&
        next[next.length - 1]
          .role === "assistant"
      ) {
        next.pop();
      }

      return next;
    });
  }

  function stopGeneration() {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setLoading(false);
  }

  return {
    abortControllerRef,
    updateAssistantMessage,
    removeLastAssistantMessage,
    stopGeneration,
  };
}