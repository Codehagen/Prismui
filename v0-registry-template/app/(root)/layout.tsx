import { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link"

import "@/app/globals.css"
import { Providers } from "@/components/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/sonner"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "v0 Templates",
    template: `%s - v0 Templates`,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="flex flex-col">
            <header className="supports-[backdrop-filter]:bg-background/60 bg-background/95 z-20 flex h-[100px] w-full flex-col gap-3 p-3 backdrop-blur md:h-14 md:flex-row md:items-center lg:px-4">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <svg
                    className="size-8 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 40 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                <span className="text-muted-foreground/40 hidden items-center gap-2 text-sm sm:flex">
                  <svg
                    className="text-gs-gray-500 shrink-0"
                    fill="none"
                    height="22"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 21 14.5 1" stroke="currentColor" />
                  </svg>
                  <span className="text-primary/90 max-w-[100px] truncate font-medium sm:max-w-none sm:whitespace-nowrap">
                    Templates
                  </span>
                </span>
              </div>
            </header>
            <div className="flex-1">{children}</div>
          </div>
          <TailwindIndicator />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
