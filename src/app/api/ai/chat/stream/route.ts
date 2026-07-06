import { NextRequest } from "next/server";
import { AIManager } from "@/core/ai";

const aiManager = new AIManager();

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response("Message is required.", {
        status: 400,
      });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          await aiManager.chatStream(
            message,
            (token) => {
              controller.enqueue(encoder.encode(token));
            }
          );

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(
      error instanceof Error
        ? error.message
        : "Streaming failed.",
      {
        status: 500,
      }
    );
  }
}