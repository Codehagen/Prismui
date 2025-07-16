import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const url = request.nextUrl.clone();

  // Handle pro.prismui.tech subdomain
  if (host?.includes("pro.prismui.tech")) {
    // Rewrite to /pro routes
    if (url.pathname === "/") {
      url.pathname = "/pro";
    } else if (!url.pathname.startsWith("/pro")) {
      url.pathname = `/pro${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Handle www.prismui.tech or prismui.tech (main site)
  // No rewriting needed for main site
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