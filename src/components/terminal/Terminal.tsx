"use client";

export default function Terminal() {
  return (
    <div className="flex h-64 flex-col border-t border-zinc-800 bg-[#181818]">
      <div className="flex h-10 items-center border-b border-zinc-800 bg-zinc-900 px-4">
        <span className="text-sm font-medium text-zinc-300">
          TERMINAL
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-sm text-zinc-300">
        <div>$ Welcome to PulseCode Terminal</div>
        <div>$ Backend shell coming soon...</div>
      </div>
    </div>
  );
}