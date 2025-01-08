import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const registryPath = path.join(process.cwd(), "public/r/registry.json");
    const registryContent = await fs.readFile(registryPath, "utf-8");
    const registry = JSON.parse(registryContent);

    return NextResponse.json(registry);
  } catch (error) {
    console.error("Error reading registry:", error);
    return NextResponse.json(
      { error: "Failed to load registry" },
      { status: 500 }
    );
  }
}
