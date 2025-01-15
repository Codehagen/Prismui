"use client";

import { Button } from "@/components/ui/button";
import { downloadTemplate } from "@/app/actions/download-template";
import { useState } from "react";

export function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    console.log("Client: Starting download process");
    try {
      setIsLoading(true);
      console.log("Client: Calling downloadTemplate");
      const response = await downloadTemplate("portfolio");
      console.log("Client: Received response");

      if (!response.success || !response.data) {
        console.error("Client: Download failed:", response.error);
        return;
      }

      console.log(
        "Client: Creating blob from data, size:",
        response.data.length
      );

      // Convert number array back to Uint8Array
      const uint8Array = new Uint8Array(response.data);

      // Create blob from Uint8Array
      const blob = new Blob([uint8Array], {
        type: "application/zip",
      });
      console.log("Client: Created blob, size:", blob.size);

      const url = URL.createObjectURL(blob);
      console.log("Client: Created URL:", url);

      const a = document.createElement("a");
      a.href = url;
      a.download = response.fileName;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log("Client: Download process complete");
    } catch (error) {
      console.error("Client: Download failed with error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex-1 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {isLoading ? "Downloading..." : "Free Download"}
    </Button>
  );
}
