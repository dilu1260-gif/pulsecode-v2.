import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { oldPath, newName } = await req.json();

    if (!oldPath || !newName) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing oldPath or newName.",
        },
        {
          status: 400,
        }
      );
    }

    const root = process.cwd();

    const absoluteOldPath = path.join(root, oldPath);

    const absoluteNewPath = path.join(
      path.dirname(absoluteOldPath),
      newName
    );

    await fs.rename(
      absoluteOldPath,
      absoluteNewPath
    );

    return NextResponse.json({
      success: true,
      path: path.relative(root, absoluteNewPath),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to rename item.",
      },
      {
        status: 500,
      }
    );
  }
}