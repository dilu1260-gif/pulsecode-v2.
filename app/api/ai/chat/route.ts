import { NextRequest, NextResponse } from "next/server";
import { AIManager } from "@/core/ai/AIManager";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const ai = new AIManager();

    const response = await ai.chat(message);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}