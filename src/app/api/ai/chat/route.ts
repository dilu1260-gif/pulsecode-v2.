import { NextRequest, NextResponse } from "next/server";
import { AIManager } from "@/core/ai";

const aiManager = new AIManager();

export async function POST(
  req: NextRequest
) {
  try {
    const { message } =
      await req.json();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await aiManager.chat(message);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "AI request failed.",
      },
      {
        status: 500,
      }
    );
  }
}