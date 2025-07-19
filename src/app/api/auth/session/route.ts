import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    return NextResponse.json({
      authenticated: !!session,
      user: session?.user || null,
      session: session?.session || null,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({
      authenticated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}