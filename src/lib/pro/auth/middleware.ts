import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

// Public pro routes that don't require authentication
const PUBLIC_PRO_ROUTES = [
  "/pro",
  "/pro/login",
  "/pro/signup", 
  "/pro/pricing",
  "/pro/upgrade"
];

// Routes that require authentication but not pro access
const AUTH_ONLY_ROUTES = [
  "/pro/upgrade/success",
  "/pro/account",
  "/pro/settings"
];

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Allow public pro routes
  if (PUBLIC_PRO_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If no session, redirect to login
    if (!session?.user) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/pro/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }

    // For auth-only routes, just check authentication
    if (AUTH_ONLY_ROUTES.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // For other pro routes, we might want to add pro access checks later
    // For now, just allow authenticated users to proceed
    return NextResponse.next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    
    // On error, redirect to login to be safe
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/pro/login?callbackUrl=${callbackUrl}`, request.url)
    );
  }
}