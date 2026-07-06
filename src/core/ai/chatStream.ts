export async function chatStream(
  message: string,
  signal?: AbortSignal,
) {
  return fetch("/api/ai/chat/stream", {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });
}