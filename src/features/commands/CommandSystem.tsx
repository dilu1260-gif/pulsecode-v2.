"use client";

import CommandProvider from "@/components/providers/CommandProvider";

interface Props {
  children: React.ReactNode;
}

export default function CommandSystem({
  children,
}: Props) {
  return (
    <CommandProvider>
      {children}
    </CommandProvider>
  );
}