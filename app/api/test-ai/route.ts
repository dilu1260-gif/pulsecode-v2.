import { NextResponse } from "next/server";
import { AIManager } from "@/core/ai/AIManager";

export async function GET() {
  try {
    const ai = new AIManager();

    const response = await ai.chat("Say hello in one short sentence.");

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}