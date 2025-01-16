"use client";

import { Button } from "@/components/ui/button";
import { downloadTemplate } from "@/app/actions/download-template";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface DownloadButtonProps {
  fileName: string;
}

const loadingStates = [
  "Preparing download...",
  "Fetching template...",
  "Almost there...",
  "Starting download...",
];

export function DownloadButton({ fileName }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingStates[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setMessageIndex(0);
      setLoadingMessage(loadingStates[0]);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((current) => {
        const nextIndex = (current + 1) % loadingStates.length;
        setLoadingMessage(loadingStates[nextIndex]);
        return nextIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await downloadTemplate(fileName);

      if (!response.success || !response.data) {
        return;
      }

      const uint8Array = new Uint8Array(response.data);
      const blob = new Blob([uint8Array], {
        type: "application/zip",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = response.fileName;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      // Silent fail - you might want to add toast here later
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex-1 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingMessage}
        </>
      ) : (
        "Free Download"
      )}
    </Button>
  );
}
