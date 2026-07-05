import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { parentPath, folderName } = await req.json();

    if (!parentPath || !folderName) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing parentPath or folderName.",
        },
        {
          status: 400,
        }
      );
    }

    const folderPath = path.join(
      process.cwd(),
      parentPath,
      folderName
    );

    await fs.mkdir(folderPath, {
      recursive: true,
    });

    return NextResponse.json({
      success: true,
      path: path.join(parentPath, folderName),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create folder.",
      },
      {
        status: 500,
      }
    );
  }
}