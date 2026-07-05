import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { sourcePath } = await req.json();

    if (!sourcePath) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing sourcePath.",
        },
        {
          status: 400,
        }
      );
    }

    const absoluteSourcePath = path.join(
      process.cwd(),
      sourcePath
    );

    const parsed = path.parse(absoluteSourcePath);

    const duplicatePath = path.join(
      parsed.dir,
      `${parsed.name} copy${parsed.ext}`
    );

    await fs.copyFile(
      absoluteSourcePath,
      duplicatePath
    );

    return NextResponse.json({
      success: true,
      path: path.relative(
        process.cwd(),
        duplicatePath
      ),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to duplicate file.",
      },
      {
        status: 500,
      }
    );
  }
}