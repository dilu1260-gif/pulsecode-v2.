import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { folderPath, fileName } = await req.json();

    if (!folderPath || !fileName) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing folderPath or fileName.",
        },
        {
          status: 400,
        }
      );
    }

    const absolutePath = path.join(
      process.cwd(),
      folderPath,
      fileName
    );

    await fs.writeFile(
      absolutePath,
      "",
      "utf8"
    );

    return NextResponse.json({
      success: true,
      path: path.join(folderPath, fileName),
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create file.",
      },
      {
        status: 500,
      }
    );
  }
}