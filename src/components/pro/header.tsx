"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ModeSwitcher } from "@/components/mode-switcher"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Settings, CreditCard, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession, signOut } from "@/lib/pro/auth/auth-client"

const proNavItems = [
  {
    href: "/pro/components",
    title: "Components",
  },
  {
    href: "/pro/templates",
    title: "Templates",
  },
]

function ProMainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-6 text-sm font-medium", className)}
      {...props}
    >
      {proNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

function ProMobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex items-center space-x-2 pb-4">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold text-lg">PrismUI Pro</span>
          <Badge variant="secondary" className="text-xs">Pro</Badge>
        </div>
        <nav className="flex flex-col space-y-3">
          {proNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function ProAccountMenu() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  if (!user) {
    return (
      <Button asChild size="sm">
        <Link href="/pro/login">Sign In</Link>
      </Button>
    )
  }

  // Get user initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{getInitials(user.name || user.email || "U")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name || "User"}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/pro/account">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pro/billing">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pro/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ProHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-14 items-center gap-2">
        <ProMobileNav />
        
        {/* Logo and Brand */}
        <Link href="/pro" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold text-lg">PrismUI</span>
          <Badge variant="default" className="text-xs">Pro</Badge>
        </Link>

        {/* Main Navigation */}
        <ProMainNav className="hidden lg:flex ml-8" />

        {/* Right Side Items */}
        <div className="ml-auto flex items-center gap-2">
          {/* Back to Main Site */}
          <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
            <Link href="/">
              <span className="text-sm">Main Site</span>
            </Link>
          </Button>
          
          <Separator orientation="vertical" className="h-4 hidden lg:block" />
          
          {/* Theme Switcher */}
          <ModeSwitcher />
          
          <Separator orientation="vertical" className="h-4" />
          
          {/* Account Menu */}
          <ProAccountMenu />
        </div>
      </div>
    </header>
  )
}