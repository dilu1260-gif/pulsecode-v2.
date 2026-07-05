import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface SearchResult {
  file: string;
  line: number;
  text: string;
}

async function searchDirectory(
  dir: string,
  query: string,
  results: SearchResult[]
) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git"
    ) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await searchDirectory(fullPath, query, results);
      continue;
    }

    try {
      const content = await fs.readFile(
        fullPath,
        "utf8"
      );

      const lines = content.split("\n");

      lines.forEach((line, index) => {
        if (
          line.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            file: path.relative(
              process.cwd(),
              fullPath
            ),
            line: index + 1,
            text: line.trim(),
          });
        }
      });
    } catch {
      // Ignore binary or unreadable files
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({
        success: true,
        results: [],
      });
    }

    const results: SearchResult[] = [];

    await searchDirectory(
      process.cwd(),
      query,
      results
    );

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Search failed.",
      },
      {
        status: 500,
      }
    );
  }
}