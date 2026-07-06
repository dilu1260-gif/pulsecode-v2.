"use client";

import { useAIStore } from "./aiStore";

export default function AIChat() {
  const {
  open,
  input,
  messages,
  loading,
  setInput,
  setLoading,
  addMessage,
  clearInput,
} = useAIStore();
async function sendMessage() {
  const prompt = input.trim();

  if (!prompt || loading) {
    return;
  }

  addMessage("user", prompt);

  clearInput();

  setLoading(true);

  try {
    const res = await fetch(
      "/api/ai/chat",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error ??
          "AI request failed."
      );
    }

    addMessage(
      "assistant",
      data.response
    );
  } catch (err) {
    console.error(err);

    addMessage(
      "assistant",
      "Sorry, something went wrong."
    );
  } finally {
    setLoading(false);
  }
}

  if (!open) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 z-40 flex h-full w-[420px] flex-col border-l border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-white">
          AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
  {messages.length === 0 ? (
    <div className="text-sm text-zinc-500">
      No conversation yet.
    </div>
  ) : (
    messages.map((message, index) => (
      <div
        key={index}
        className={
          message.role === "user"
            ? "rounded bg-blue-600 p-3 text-white"
            : "rounded bg-zinc-800 p-3 text-white"
        }
      >
        {message.content}
      </div>
    ))
  )}
</div>

      <div className="border-t border-zinc-800 p-4">
        <input
  value={input}
  onChange={(e) =>
    setInput(e.target.value)
  }
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      void sendMessage();
    }
  }}
  placeholder="Ask PulseCode AI..."
  className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
/>
<button
  onClick={() => {
    void sendMessage();
  }}
  disabled={loading}
  className="mt-3 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? "Thinking..." : "Send"}
</button>
      </div>
    </div>
  );
}