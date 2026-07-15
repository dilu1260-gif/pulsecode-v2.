"use client";

import { ReactNode } from "react";

interface Props {
  label: string;
  description?: string;
  children: ReactNode;
}

export default function SettingRow({
  label,
  description,
  children,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <div className="font-medium text-white">
          {label}
        </div>

        {description && (
          <div className="mt-1 text-sm text-zinc-500">
            {description}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}