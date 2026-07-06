"use client";

import { create } from "zustand";

interface CommandPaletteState {
  open: boolean;

  search: string;

  setOpen: (
    open: boolean
  ) => void;

  setSearch: (
    search: string
  ) => void;
}

export const useCommandPaletteStore =
  create<CommandPaletteState>((set) => ({
    open: false,

    search: "",

    setOpen: (open) =>
      set({
        open,
      }),

    setSearch: (search) =>
      set({
        search,
      }),
  }));