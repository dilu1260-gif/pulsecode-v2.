export interface EditorSettings {
  theme: "vs-dark" | "light";
  fontSize: number;
  wordWrap: boolean;
  tabSize: number;
  minimap: boolean;
}

export interface AISettings {
  provider: string;
  model: string;
  streaming: boolean;
  temperature: number;
}

export interface GeneralSettings {
  autoSave: boolean;
  confirmDelete: boolean;
}

export interface PulseSettings {
  editor: EditorSettings;
  ai: AISettings;
  general: GeneralSettings;
}