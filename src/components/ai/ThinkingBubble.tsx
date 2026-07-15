"use client";

export default function ThinkingBubble() {
  return (
    <div className="mb-4 flex justify-start">
      <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />
        </div>

        <span className="text-sm text-zinc-300">
          Pulse AI is thinking...
        </span>
      </div>
    </div>
  );
}