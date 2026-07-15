"use client";

import type { AIAction } from "@/core/ai/actions/extractActions";

interface Props {
  action: AIAction;
}

export default function ActionCard({
  action,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="font-medium text-white">
        ⚡ {action.type}
      </div>

      {action.path && (
        <div className="mt-1 text-sm text-zinc-400">
          {action.path}
        </div>
      )}
    </div>
  );
}