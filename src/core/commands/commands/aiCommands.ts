import { getAIActions } from "../actions/aiActions";
import { registerCommand } from "../registry";

export function registerAICommands() {
  registerCommand({
    id: "ai.explain",
    title: "Explain Selection",
    description: "Explain the selected code.",
    category: "ai",
    keywords: [
      "explain",
      "understand",
      "selection",
    ],
    shortcut: "Ctrl+Alt+E",
    run() {
      getAIActions().explain();
    },
  });

  registerCommand({
    id: "ai.fix",
    title: "Fix Code",
    description: "Find and fix problems.",
    category: "ai",
    keywords: [
      "fix",
      "bug",
      "repair",
    ],
    shortcut: "Ctrl+Alt+F",
    run() {
      getAIActions().fix();
    },
  });

  registerCommand({
    id: "ai.optimize",
    title: "Optimize Code",
    description:
      "Improve performance and readability.",
    category: "ai",
    keywords: [
      "optimize",
      "performance",
      "refactor",
    ],
    shortcut: "Ctrl+Alt+O",
    run() {
      getAIActions().optimize();
    },
  });

  registerCommand({
    id: "ai.tests",
    title: "Generate Tests",
    description: "Create unit tests.",
    category: "ai",
    keywords: [
      "tests",
      "unit",
      "jest",
    ],
    shortcut: "Ctrl+Alt+T",
    run() {
      getAIActions().tests();
    },
  });

  registerCommand({
    id: "ai.comments",
    title: "Add Comments",
    description: "Generate code comments.",
    category: "ai",
    keywords: [
      "comments",
      "documentation",
      "docs",
    ],
    shortcut: "Ctrl+Alt+C",
    run() {
      getAIActions().comments();
    },
  });
}