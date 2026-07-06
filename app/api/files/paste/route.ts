import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const {
      sourcePath,
      destinationFolder,
      operation,
    } = await req.json();

    if (
      !sourcePath ||
      !destinationFolder ||
      !operation
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const root = process.cwd();

    const absoluteSource = path.join(
      root,
      sourcePath
    );

    const parsed = path.parse(absoluteSource);

    const absoluteDestination = path.join(
      root,
      destinationFolder,
      parsed.base
    );

    if (operation === "copy") {
      await fs.copyFile(
        absoluteSource,
        absoluteDestination
      );
    } else if (operation === "cut") {
      await fs.rename(
        absoluteSource,
        absoluteDestination
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid operation.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      path: path.relative(
        root,
        absoluteDestination
      ),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to paste item.",
      },
      {
        status: 500,
      }
    );
  }
}