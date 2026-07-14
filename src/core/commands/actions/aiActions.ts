export interface AIActions {
  explain(): void | Promise<void>;

  fix(): void | Promise<void>;

  optimize(): void | Promise<void>;

  tests(): void | Promise<void>;

  comments(): void | Promise<void>;
}

let actions: AIActions | null = null;

export function registerAIActions(
  value: AIActions
) {
  actions = value;
}

export function getAIActions() {
  if (!actions) {
    throw new Error(
      "AI actions have not been registered."
    );
  }

  return actions;
}