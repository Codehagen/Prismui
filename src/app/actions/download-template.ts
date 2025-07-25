"use server";

import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/app/generated/prisma";

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Supabase client with service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export type DownloadResponse = {
  success: boolean;
  data?: number[];
  error?: string;
  contentType: string;
  fileName: string;
};

export async function downloadTemplate(
  fileName: string
): Promise<DownloadResponse> {
  const startTime = Date.now();
  
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required to download templates.",
        contentType: "",
        fileName: "",
      };
    }

    // Get request headers for IP and user agent
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || 
                     headersList.get("x-real-ip") || 
                     "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Download from Supabase
    const { data, error } = await supabase.storage
      .from("templates")
      .download(fileName);

    if (error) {
      return {
        success: false,
        error: `Failed to download template: ${error.message}`,
        contentType: "",
        fileName: "",
      };
    }

    if (!data) {
      return {
        success: false,
        error: "Template file not found.",
        contentType: "",
        fileName: "",
      };
    }

    const arrayBuffer = await data.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const plainArray = Array.from(uint8Array);
    
    // Calculate download duration and file size
    const downloadDuration = Date.now() - startTime;
    const fileSize = arrayBuffer.byteLength;

    // Log the download to AccessLog
    await prisma.accessLog.create({
      data: {
        userId: session.user.id,
        action: "template_download",
        resource: fileName,
        metadata: {
          fileSize,
          downloadDuration,
          bucketName: "templates",
          contentType: "application/zip",
        },
        ipAddress: ipAddress.split(",")[0].trim(), // Get first IP if multiple
        userAgent: userAgent.substring(0, 255), // Limit length for DB
      },
    });

    return {
      success: true,
      data: plainArray,
      contentType: "application/zip",
      fileName,
    };
  } catch (error) {
    console.error("Download error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      contentType: "",
      fileName: "",
    };
  }
}
