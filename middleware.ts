import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/pro/auth/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Apply authentication middleware for pro routes
  if (pathname.startsWith("/pro")) {
    return authMiddleware(request);
  }

  // For non-pro routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};