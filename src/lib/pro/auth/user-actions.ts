"use server";

import { auth } from "@/lib/auth/auth";
import {
  getSession,
  getUser,
  isAuthenticated,
  requireAuth,
} from "@/actions/auth-actions";
import prisma from "@/lib/pro/db/prisma";
import { User, Session } from "better-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Types for better TypeScript support
type UserProfile = User & {
  proMembership?: {
    id: string;
    tier: "FREE" | "PRO_LIFETIME" | "ENTERPRISE_LIFETIME";
    status: "ACTIVE" | "INACTIVE" | "REFUNDED" | "EXPIRED";
    isActive: boolean;
    purchaseDate: Date | null;
  } | null;
  hasProAccess: boolean;
};

type UpdateProfileInput = {
  name?: string;
  image?: string;
  preferences?: Record<string, any>;
};

/**
 * Get the current authenticated user from Better Auth session
 * @returns The current user or null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  return await getUser();
}

/**
 * Get the current session
 * @returns The current session or null if not authenticated
 */
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const session = await getSession();
    return session?.session || null;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
}

/**
 * Require an authenticated user or redirect to login
 * @param callbackUrl - Optional URL to redirect to after login
 * @returns The authenticated user
 */
export async function requireUser(callbackUrl?: string): Promise<User> {
  return await requireAuth();
}

// Re-export from auth-actions for convenience
export { isAuthenticated };

/**
 * Get user profile with subscription information
 * @returns User profile with subscription status
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    // Get ProMembership information
    const proMembership = await prisma.proMembership.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        tier: true,
        status: true,
        isActive: true,
        purchaseDate: true,
      },
    });

    // Determine if user has pro access
    const hasProAccess =
      proMembership?.isActive && proMembership.tier !== "FREE";

    return {
      ...user,
      proMembership,
      hasProAccess: hasProAccess || false,
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}

/**
 * Update user profile
 * @param input - Profile update data
 * @returns Success status and updated user
 */
export async function updateUserProfile(input: UpdateProfileInput) {
  const user = await requireUser();

  try {
    // Update user in Better Auth
    const updatedUser = await auth.api.updateUser({
      headers: await headers(),
      userId: user.id,
      data: {
        name: input.name,
        image: input.image,
      },
    });

    // If preferences need to be stored, use Prisma
    if (input.preferences) {
      try {
        await prisma.userPreferences.upsert({
          where: { userId: user.id },
          update: {
            preferences: input.preferences,
            updatedAt: new Date(),
          },
          create: {
            userId: user.id,
            preferences: input.preferences,
          },
        });
      } catch (preferencesError) {
        console.error("Error updating user preferences:", preferencesError);
        // Continue with successful user update, log preferences error
      }
    }

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
}

/**
 * Check if user has an active pro subscription
 * @returns Boolean indicating pro access
 */
export async function hasProAccess(): Promise<boolean> {
  const profile = await getUserProfile();
  return profile?.hasProAccess || false;
}

/**
 * Require pro access or redirect to upgrade page
 * @returns The user profile with active subscription
 */
export async function requireProAccess(): Promise<UserProfile> {
  const profile = await getUserProfile();

  if (!profile) {
    redirect("/pro/login");
  }

  if (!profile.hasProAccess) {
    redirect("/pro/upgrade");
  }

  return profile;
}

/**
 * Get user's subscription limits based on their plan
 * @returns Object with plan limits
 */
export async function getSubscriptionLimits() {
  const profile = await getUserProfile();

  if (!profile) {
    return null;
  }

  const planLimits = {
    FREE: {
      components: 10,
      downloads: 50,
      support: "community",
    },
    PRO_LIFETIME: {
      components: -1, // unlimited
      downloads: -1, // unlimited
      support: "priority",
    },
    ENTERPRISE_LIFETIME: {
      components: -1, // unlimited
      downloads: -1, // unlimited
      support: "dedicated",
    },
  };

  const tier = profile.proMembership?.tier || "FREE";

  return {
    tier,
    limits: planLimits[tier],
    proMembership: profile.proMembership,
  };
}

/**
 * Delete user account and all related data
 * @returns Success status
 */
export async function deleteUserAccount() {
  const user = await requireUser();

  try {
    // First, delete from Better Auth (can be retried if fails)
    await auth.api.deleteUser({
      userId: user.id,
    });
    
    // Use transaction to ensure database data consistency
    await prisma.$transaction(async (tx) => {
      // Delete user preferences
      await tx.userPreferences.deleteMany({
        where: { userId: user.id },
      });

      // Delete pro membership
      await tx.proMembership.deleteMany({
        where: { userId: user.id },
      });

      // Delete payment history
      await tx.paymentHistory.deleteMany({
        where: { userId: user.id },
      });

      // Delete access logs
      await tx.accessLog.deleteMany({
        where: { userId: user.id },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting user account:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/pro");
  } catch (error) {
    console.error("Error signing out:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign out failed",
    };
  }
}
