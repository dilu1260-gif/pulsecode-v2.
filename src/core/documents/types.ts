export interface DocumentState {
  path: string;

  content: string;

  dirty: boolean;

  language?: string;
}