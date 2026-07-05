import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { filePath } = await req.json();

    if (!filePath) {
      return NextResponse.json(
        { error: "Missing filePath." },
        { status: 400 }
      );
    }

    const root = process.cwd();

    const absolutePath = path.join(root, filePath);

    const content = await fs.readFile(
      absolutePath,
      "utf-8"
    );

    return NextResponse.json({
      success: true,
      path: filePath,
      content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to read file.",
      },
      {
        status: 500,
      }
    );
  }
}