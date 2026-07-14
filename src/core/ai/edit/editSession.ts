export interface AIEditSession {
  original: string;
  updated: string;
  language?: string;
}

let currentSession: AIEditSession | null = null;

export function setEditSession(
  session: AIEditSession | null
) {
  currentSession = session;
}

export function getEditSession() {
  return currentSession;
}

export function clearEditSession() {
  currentSession = null;
}