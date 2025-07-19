import { cache } from "react";
import { getCurrentUser, getCurrentSession } from "./user-actions";
import type { User, Session } from "better-auth";

/**
 * Server-side utility functions for authentication
 * These helpers are optimized for use in server components
 */

/**
 * Cached version of getCurrentUser to prevent multiple DB calls in the same request
 */
export const getCachedUser = cache(async (): Promise<User | null> => {
  return getCurrentUser();
});

/**
 * Cached version of getCurrentSession to prevent multiple DB calls in the same request
 */
export const getCachedSession = cache(async (): Promise<Session | null> => {
  return getCurrentSession();
});

/**
 * Check if the current request is from an authenticated user
 * Useful for conditional rendering in server components
 */
export async function isAuthenticatedRequest(): Promise<boolean> {
  const user = await getCachedUser();
  return !!user;
}

/**
 * Get user initials for avatar display
 */
export function getUserInitials(user: User | null): string {
  if (!user?.name) return "?";

  const names = user.name.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }

  return user.name.substring(0, 2).toUpperCase();
}

/**
 * Format user display name
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return "Guest";
  return user.name || user.email || "User";
}

/**
 * Check if a session is expired
 */
export function isSessionExpired(session: Session | null): boolean {
  if (!session?.expiresAt) return true;
  return new Date(session.expiresAt) < new Date();
}

/**
 * Get session remaining time in milliseconds
 */
export function getSessionRemainingTime(session: Session | null): number {
  if (!session?.expiresAt) return 0;

  const expiresAt = new Date(session.expiresAt).getTime();
  const now = new Date().getTime();

  return Math.max(0, expiresAt - now);
}

/**
 * Format session expiry for display
 */
export function formatSessionExpiry(session: Session | null): string {
  const remainingTime = getSessionRemainingTime(session);

  if (remainingTime === 0) return "Expired";

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
}

/**
 * Security headers for authenticated routes
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
}

/**
 * Check if email is verified (when email verification is enabled)
 */
export async function isEmailVerified(user: User | null): Promise<boolean> {
  if (!user) return false;

  // Better Auth stores email verification status in the user object
  return user.emailVerified || false;
}

/**
 * Build a safe redirect URL
 */
export function buildSafeRedirectUrl(
  callbackUrl: string | null,
  defaultUrl: string = "/pro/docs"
): string {
  if (!callbackUrl) return defaultUrl;

  // Only allow relative URLs to prevent open redirect attacks
  if (callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }

  return defaultUrl;
}
