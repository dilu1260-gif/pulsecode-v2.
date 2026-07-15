"use client";

import { useSettingsStore } from "@/core/settings/settingsStore";

export function useSettings() {
  return useSettingsStore();
}