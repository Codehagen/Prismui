"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (result.user) {
      redirect("/pro/docs");
    }

    return { success: true, user: result.user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign in failed",
    };
  }
}

export async function signUpWithEmailAndName(
  email: string,
  password: string,
  name: string
) {
  console.log("🔄 Starting signup process for:", email);
  
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    console.log("✅ User created successfully:", result.user?.id);

    if (result.user) {
      console.log("🎉 Creating free user profile for:", result.user.id);
      try {
        await createFreeUserProfile(result.user.id);
        console.log("✅ Profile creation completed for:", result.user.id);
      } catch (profileError) {
        console.error("💥 Profile creation failed:", profileError);
        // Don't fail the signup if profile creation fails
      }
      
      redirect("/pro/docs");
    }

    return { success: true, user: result.user };
  } catch (error) {
    console.error("❌ Signup failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign up failed",
    };
  }
}

export async function signInOrCreateUser(
  email: string,
  password: string,
  name?: string
) {
  console.log("🔍 signInOrCreateUser called with:", { email, password: "***" });

  try {
    console.log("🔄 Attempting to sign in existing user...");
    // First try to sign in
    const signInResult = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("✅ Sign in successful:", { userId: signInResult.user?.id });

    if (signInResult.user) {
      return { success: true, user: signInResult.user };
    }

    return { success: false, error: "Sign in succeeded but no user returned" };
  } catch (signInError) {
    const errorMessage =
      signInError instanceof Error ? signInError.message : String(signInError);
    console.log("❌ Sign in failed:", { error: errorMessage });

    // If user doesn't exist, try to create them
    if (
      errorMessage.includes("User not found") ||
      errorMessage.includes("Invalid password") ||
      errorMessage.includes("Invalid email") ||
      errorMessage.includes("Invalid credentials")
    ) {
      console.log("🔄 User likely doesn't exist, attempting to create new user...");

      try {
        const signUpResult = await auth.api.signUpEmail({
          body: {
            email,
            password,
            name: name || email.split("@")[0], // Use email prefix as default name
          },
        });

        console.log("✅ User created successfully:", {
          userId: signUpResult.user?.id,
        });

        if (signUpResult.user) {
          console.log("🎉 Creating free user profile for new user:", signUpResult.user.id);
          try {
            await createFreeUserProfile(signUpResult.user.id);
            console.log("✅ Profile creation completed for new user:", signUpResult.user.id);
          } catch (profileError) {
            console.error("💥 Profile creation failed for new user:", profileError);
            // Don't fail the signup if profile creation fails
          }
          
          return { success: true, user: signUpResult.user, wasCreated: true };
        }

        return {
          success: false,
          error: "User creation succeeded but no user returned",
        };
      } catch (signUpError) {
        const signUpErrorMessage =
          signUpError instanceof Error
            ? signUpError.message
            : String(signUpError);
        console.log("❌ User creation failed:", {
          error: signUpErrorMessage,
        });

        if (
          signUpErrorMessage.includes("already exists") ||
          signUpErrorMessage.includes("already registered")
        ) {
          return {
            success: false,
            error:
              "Account exists but password is incorrect. Please check your password.",
          };
        }

        return {
          success: false,
          error: signUpErrorMessage,
        };
      }
    } else {
      console.log("🚫 Sign in failed for unhandled reason, returning original error");
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/pro");
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign out failed",
    };
  }
}

export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Convenience function to check if user is authenticated
 * Use this for simple auth checks
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}

/**
 * Get authenticated user or redirect to sign-up
 * Use this when you need to ensure user is authenticated
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect("/pro/login");
  }
  return user;
}

/**
 * Function to create free user profile after signup
 */
async function createFreeUserProfile(userId: string) {
  console.log("🔄 Creating free user profile for:", userId);
  
  try {
    await prisma.$transaction(async (tx) => {
      console.log("📝 Creating ProMembership for user:", userId);
      // Create FREE ProMembership
      await tx.proMembership.create({
        data: {
          userId: userId,
          tier: "FREE",
          status: "ACTIVE",
          isActive: true,
        },
      });

      console.log("⚙️ Creating UserPreferences for user:", userId);
      // Create UserPreferences with defaults
      await tx.userPreferences.create({
        data: {
          userId: userId,
          preferences: {},
          theme: "system",
          language: "en",
        },
      });
    });
    
    console.log("✅ Successfully created free user profile for:", userId);
  } catch (error) {
    console.error("❌ Error creating free user profile:", error);
    throw error;
  }
}