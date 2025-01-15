"use server";

import { createClient } from "@supabase/supabase-js";

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

const TEMPLATE_FILES = {
  portfolio: "portfolio-template.zip",
} as const;

export async function downloadTemplate(
  template: keyof typeof TEMPLATE_FILES
): Promise<DownloadResponse> {
  console.log("Server: Starting download for template:", template);
  try {
    const fileName = TEMPLATE_FILES[template];
    console.log("Server: Attempting to download file:", fileName);

    const { data, error } = await supabase.storage
      .from("templates")
      .download(fileName);

    if (error) {
      console.error("Server: Supabase download error:", error);
      return {
        success: false,
        error: `Failed to download template: ${error.message}`,
        contentType: "",
        fileName: "",
      };
    }

    if (!data) {
      console.error("Server: No data received from Supabase");
      return {
        success: false,
        error: "Template file not found.",
        contentType: "",
        fileName: "",
      };
    }

    // Convert to Uint8Array and then to regular array
    const arrayBuffer = await data.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const plainArray = Array.from(uint8Array);

    console.log(
      "Server: Successfully downloaded file, size:",
      plainArray.length
    );

    return {
      success: true,
      data: plainArray,
      contentType: "application/zip",
      fileName: "portfolio-template.zip",
    };
  } catch (error) {
    console.error("Server: Unexpected error:", error);
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
