import { PrismaClient } from "@/app/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

// Function to create free user profile after signup
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

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});

// Export the profile creation function for use in server actions
export { createFreeUserProfile };
