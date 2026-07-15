import type { PulseSettings } from "./types";

const STORAGE_KEY = "pulsecode-settings";

export function loadSettings(): PulseSettings | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as PulseSettings;
  } catch {
    return null;
  }
}

export function saveSettings(
  settings: PulseSettings
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}