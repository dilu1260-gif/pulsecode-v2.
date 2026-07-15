"use client";

import { extractActions } from "@/core/ai/actions/extractActions";

import ActionList from "../actions/ActionList";

interface Props {
  content: string;
}

export default function ActionRenderer({
  content,
}: Props) {
  return (
    <ActionList
      actions={extractActions(content)}
    />
  );
}