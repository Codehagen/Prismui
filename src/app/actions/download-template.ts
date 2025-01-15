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

export async function downloadTemplate(
  fileName: string
): Promise<DownloadResponse> {
  try {
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

    return {
      success: true,
      data: plainArray,
      contentType: "application/zip",
      fileName,
    };
  } catch (error) {
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
