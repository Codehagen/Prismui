import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export type MembershipType = "FREE" | "PRO" | "ENTERPRISE";

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
  membership: MembershipType,
  stripeCustomerId?: string
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        membership,
        stripeCustomerId,
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Failed to upgrade user membership:", error);
    throw new Error("Failed to upgrade user membership");
  }
}

export async function createPaymentRecord(record: PaymentRecord) {
  try {
    await prisma.$executeRaw`
      INSERT INTO payment_history (
        user_id, 
        stripe_session_id, 
        stripe_payment_intent_id,
        amount, 
        currency, 
        plan_type, 
        status, 
        created_at
      ) VALUES (
        ${record.userId},
        ${record.stripeSessionId},
        ${record.stripePaymentIntentId},
        ${record.amount},
        ${record.currency},
        ${record.planType},
        ${record.status},
        ${record.createdAt}
      )
      ON CONFLICT (stripe_session_id) DO NOTHING
    `;
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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { membership: true },
    });

    return user?.membership === "PRO" || user?.membership === "ENTERPRISE";
  } catch (error) {
    console.error("Failed to check user payment status:", error);
    return false;
  }
}

export function getMembershipFeatures(membership: MembershipType) {
  const features = {
    FREE: [
      "Basic components",
      "Community support",
      "MIT license",
    ],
    PRO: [
      "50+ Premium components",
      "Advanced animations & effects", 
      "TypeScript support",
      "Priority email support",
      "Lifetime updates",
      "Commercial license",
      "Component source code",
      "Design system tokens",
    ],
    ENTERPRISE: [
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

  return features[membership] || features.FREE;
}