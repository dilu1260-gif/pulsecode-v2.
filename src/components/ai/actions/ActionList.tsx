"use client";

import type { AIAction } from "@/core/ai/actions/extractActions";

import ActionCard from "./ActionCard";

interface Props {
  actions: AIAction[];
}

export default function ActionList({
  actions,
}: Props) {
  return (
    <div className="space-y-3">
      {actions.map((action, index) => (
        <ActionCard
          key={index}
          action={action}
        />
      ))}
    </div>
  );
}