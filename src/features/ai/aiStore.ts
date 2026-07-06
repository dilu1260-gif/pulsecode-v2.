"use client";

import { create } from "zustand";

interface AIState {
  open: boolean;

  input: string;
messages: {
  role: "user" | "assistant";
  content: string;
}[];

loading: boolean;

setLoading: (
  loading: boolean
) => void;

addMessage: (
  role: "user" | "assistant",
  content: string
) => void;

clearInput: () => void;
  setOpen: (
    open: boolean
  ) => void;

  setInput: (
    value: string
  ) => void;
}

export const useAIStore =
  create<AIState>((set) => ({
    open: false,

    input: "",
    messages: [],

loading: false,

    setOpen: (open) =>
      set({
        open,
      }),

    setInput: (input) =>
  set({
    input,
  }),

setLoading: (loading) =>
  set({
    loading,
  }),

addMessage: (role, content) =>
  set((state) => ({
    messages: [
      ...state.messages,
      {
        role,
        content,
      },
    ],
  })),

clearInput: () =>
  set({
    input: "",
  }),
  }));