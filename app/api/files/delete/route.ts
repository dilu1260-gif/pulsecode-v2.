import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { targetPath } = await req.json();

    if (!targetPath) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing targetPath.",
        },
        {
          status: 400,
        }
      );
    }

    const absolutePath = path.join(
      process.cwd(),
      targetPath
    );

    const stats = await fs.stat(absolutePath);

    if (stats.isDirectory()) {
      await fs.rm(absolutePath, {
        recursive: true,
        force: true,
      });
    } else {
      await fs.unlink(absolutePath);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete item.",
      },
      {
        status: 500,
      }
    );
  }
}