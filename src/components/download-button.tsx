"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadTemplate } from "@/app/actions/download-template";
import { useState, useEffect } from "react";
import { Loader2, Download, Crown } from "lucide-react";
import { useSession } from "@/lib/pro/auth/auth-client";
import { hasProAccess } from "@/lib/pro/auth/user-actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  fileName: string;
  isPro?: boolean;
  className?: string;
}

const loadingStates = [
  "Preparing download...",
  "Fetching template...",
  "Almost there...",
  "Starting download...",
];

export function DownloadButton({ fileName, isPro = false, className }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingStates[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [userHasProAccess, setUserHasProAccess] = useState<boolean | null>(null);
  
  const { data: session } = useSession();
  const router = useRouter();

  // Check Pro access when component mounts or session changes
  useEffect(() => {
    const checkProAccess = async () => {
      if (isPro && session?.user) {
        try {
          const hasAccess = await hasProAccess();
          setUserHasProAccess(hasAccess);
        } catch (error) {
          setUserHasProAccess(false);
        }
      } else if (isPro && !session?.user) {
        setUserHasProAccess(false);
      } else {
        setUserHasProAccess(true); // Non-pro templates are always accessible
      }
    };

    checkProAccess();
  }, [isPro, session]);

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

  const handleUpgrade = () => {
    router.push('/pro/upgrade');
  };

  // Show skeleton while checking Pro access
  if (userHasProAccess === null) {
    return (
      <Skeleton 
        className={cn(
          "flex-1 h-9 rounded-md", 
          className
        )} 
      />
    );
  }

  // Show upgrade button for Pro templates when user doesn't have access
  if (isPro && !userHasProAccess) {
    return (
      <Button
        onClick={handleUpgrade}
        className={cn("flex-1 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-sm font-medium text-white shadow hover:from-purple-700 hover:to-purple-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", className)}
      >
        <Crown className="h-4 w-4" />
        Buy Pro
      </Button>
    );
  }

  // Show download button for users with access
  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className={cn("flex-1 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingMessage}
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download
        </>
      )}
    </Button>
  );
}
