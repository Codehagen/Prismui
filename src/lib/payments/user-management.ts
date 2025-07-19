import { PrismaClient, MembershipTier, MembershipStatus } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export interface PaymentRecord {
  userId: string;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  planType: string;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

export async function upgradeUserMembership(
  userId: string,
  tier: MembershipTier,
  stripeCustomerId?: string,
  stripePaymentId?: string,
  subscriptionId?: string
) {
  try {
    // Update User with stripeCustomerId if provided
    if (stripeCustomerId) {
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
    }

    // Upsert ProMembership record
    const proMembership = await prisma.proMembership.upsert({
      where: { userId },
      update: {
        tier,
        status: MembershipStatus.ACTIVE,
        isActive: true,
        purchaseDate: new Date(),
        stripePaymentId,
        updatedAt: new Date(),
      },
      create: {
        userId,
        tier,
        status: MembershipStatus.ACTIVE,
        isActive: true,
        purchaseDate: new Date(),
        stripePaymentId,
      },
    });

    return proMembership;
  } catch (error) {
    console.error("Failed to upgrade user membership:", error);
    throw new Error("Failed to upgrade user membership");
  }
}

export async function createPaymentRecord(record: PaymentRecord) {
  try {
    const paymentHistory = await prisma.paymentHistory.create({
      data: {
        user: { connect: { id: record.userId } },
        stripePaymentId: record.stripePaymentIntentId || `session_${Date.now()}`, // Fallback for subscriptions
        amount: record.amount,
        currency: record.currency,
        status: record.status === "completed" ? "SUCCEEDED" : "FAILED",
        description: `${record.planType} purchase`,
        productType: record.planType,
        createdAt: record.createdAt,
      },
    });
    
    return paymentHistory;
  } catch (error) {
    console.error("Failed to create payment record:", error);
    throw new Error("Failed to create payment record");
  }
}

export async function getUserPaymentHistory(userId: string) {
  try {
    const payments = await prisma.$queryRaw`
      SELECT * FROM payment_history 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    
    return payments;
  } catch (error) {
    console.error("Failed to get payment history:", error);
    return [];
  }
}

export async function hasUserPaid(userId: string): Promise<boolean> {
  try {
    const proMembership = await prisma.proMembership.findUnique({
      where: { userId },
      select: { 
        isActive: true,
        tier: true,
      },
    });

    return proMembership?.isActive && proMembership.tier !== "FREE";
  } catch (error) {
    console.error("Failed to check user payment status:", error);
    return false;
  }
}

export function getMembershipFeatures(tier: MembershipTier) {
  const features = {
    FREE: [
      "Basic components",
      "Community support",
      "MIT license",
    ],
    PRO_LIFETIME: [
      "50+ Premium components",
      "Advanced animations & effects", 
      "TypeScript support",
      "Priority email support",
      "Lifetime updates",
      "Commercial license",
      "Component source code",
      "Design system tokens",
      "White-label license",
      "Custom components on request",
    ],
    ENTERPRISE_LIFETIME: [
      "Everything in Pro",
      "Custom components on request",
      "White-label license", 
      "Priority support & SLA",
      "Team onboarding",
      "Custom design tokens",
      "Dedicated support channel",
      "Architecture consultation",
    ],
  };

  return features[tier] || features.FREE;
}