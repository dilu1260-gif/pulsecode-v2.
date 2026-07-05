import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { command } = await req.json();

    if (!command) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing command.",
        },
        {
          status: 400,
        }
      );
    }

    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
    });

    return NextResponse.json({
      success: true,
      stdout,
      stderr,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      stdout: error.stdout ?? "",
      stderr: error.stderr ?? error.message,
    });
  }
}