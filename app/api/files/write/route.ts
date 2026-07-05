import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { filePath, content } = await req.json();

    if (!filePath || typeof content !== "string") {
      return NextResponse.json(
        {
          error: "Invalid request.",
        },
        {
          status: 400,
        }
      );
    }

    const absolutePath = path.join(
      process.cwd(),
      filePath
    );

    await fs.writeFile(
      absolutePath,
      content,
      "utf8"
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to save file.",
      },
      {
        status: 500,
      }
    );
  }
}