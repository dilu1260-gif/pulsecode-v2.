"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
}

const STORAGE_KEY = "pulsecode-ai-v2";

function createEmptyConversation(): Conversation {
  const now = Date.now();

  return {
    id:
      typeof crypto !== "undefined" &&
      "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(now),

    title: "New Chat",

    createdAt: now,

    updatedAt: now,

    messages: [],
  };
}

export function useAIChat() {
  const [prompt, setPrompt] = useState("");

  const [lastPrompt, setLastPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState<string | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const messagesContainerRef =
    useRef<HTMLDivElement>(null);

  const shouldAutoScroll =
    useRef(true);

  const abortControllerRef =
    useRef<AbortController | null>(null);

  const activeConversation = useMemo(() => {
    if (!activeConversationId) return null;

    return (
      conversations.find(
        (c) => c.id === activeConversationId
      ) ?? null
    );
  }, [
    conversations,
    activeConversationId,
  ]);

  const messages =
    activeConversation?.messages ?? [];

function updateConversationMessages(
  conversationId: string,
  updater: (messages: Message[]) => Message[]
) {
  setConversations((prev) => {
    const next = prev.map((conversation) => {
      if (conversation.id !== conversationId) {
        return conversation;
      }

      const updatedMessages = updater(
        conversation.messages
      );

      let title = conversation.title;

      if (title === "New Chat") {
        const firstUser = updatedMessages.find(
          (m) => m.role === "user"
        );

        if (firstUser) {
          title = firstUser.content
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 40);

          if (firstUser.content.length > 40) {
            title += "...";
          }
        }
      }

      return {
        ...conversation,
        title,
        updatedAt: Date.now(),
        messages: updatedMessages,
      };
    });

    next.sort(
      (a, b) => b.updatedAt - a.updatedAt
    );

    return next;
  });
}

  function setMessages(
    updater:
      | Message[]
      | ((
          previous: Message[]
        ) => Message[])
  ) {
    if (!activeConversationId) return;

    updateConversationMessages(
      activeConversationId,
      (previous) =>
        typeof updater === "function"
          ? updater(previous)
          : updater
    );
  }

  function createConversation() {
    const conversation =
      createEmptyConversation();

    setConversations((prev) => [
      conversation,
      ...prev,
    ]);

    setActiveConversationId(
      conversation.id
    );

    return conversation.id;
  }

  function switchConversation(
    id: string
  ) {
    setActiveConversationId(id);
  }

  function renameConversation(
    id: string,
    title: string
  ) {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              title,
            }
          : conversation
      )
    );
  }

  function deleteConversation(
    id: string
  ) {
    setConversations((prev) => {
      const next = prev.filter(
        (c) => c.id !== id
      );

      if (next.length === 0) {
        const fresh =
          createEmptyConversation();

        setActiveConversationId(
          fresh.id
        );

        return [fresh];
      }

      if (
        activeConversationId === id
      ) {
        setActiveConversationId(
          next[0].id
        );
      }

      return next;
    });
  }

  useEffect(() => {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!saved) {
      const id =
        createConversation();

      return;
    }

    try {
      const parsed =
        JSON.parse(saved);

      if (
        parsed.conversations?.length
      ) {
        setConversations(
          parsed.conversations
        );

        setActiveConversationId(
          parsed.activeConversationId ??
            parsed.conversations[0].id
        );
      } else {
        const id =
          createConversation();

        setActiveConversationId(id);
      }
    } catch {
      console.warn(
        "Failed to restore AI conversations."
      );

      const id =
        createConversation();

      setActiveConversationId(id);
    }
  }, []);

  useEffect(() => {
    if (
      conversations.length === 0
    ) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        conversations,
        activeConversationId,
      })
    );
  }, [
    conversations,
    activeConversationId,
  ]);

  useEffect(() => {
    if (
      !shouldAutoScroll.current
    ) {
      return;
    }

    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [messages, loading]);

    function handleMessagesScroll() {
    const container =
      messagesContainerRef.current;

    if (!container) return;

    const threshold = 80;

    shouldAutoScroll.current =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      threshold;
  }

  function updateAssistantMessage(
    content: string
  ) {
    setMessages((prev) => {
      const next = [...prev];

      if (next.length === 0) {
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
    setMessages((prev) => {
      const next = [...prev];

      if (
        next.length > 0 &&
        next[next.length - 1].role ===
          "assistant"
      ) {
        next.pop();
      }

      return next;
    });
  }

  function stopGeneration() {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setLoading(false);
  }

  function clearChat() {
    if (!activeConversationId) return;

    updateConversationMessages(
      activeConversationId,
      () => []
    );

    setPrompt("");
    setLastPrompt("");
  }

  return {
    prompt,
    setPrompt,

    lastPrompt,
    setLastPrompt,

    loading,
    setLoading,

    messages,
    setMessages,

    conversations,
    activeConversationId,
    activeConversation,

    createConversation,
    deleteConversation,
    renameConversation,
    switchConversation,

    updateConversationMessages,

    messagesEndRef,
    messagesContainerRef,

    handleMessagesScroll,

    abortControllerRef,

    updateAssistantMessage,
    removeLastAssistantMessage,

    stopGeneration,
    clearChat,
  };
}