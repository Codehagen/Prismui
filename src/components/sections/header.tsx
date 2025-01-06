"use client";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import Menu from "@/components/menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { DocsSidebar } from "../docs-sidebar";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={"sticky top-0 z-50 bg-background/60 backdrop-blur border-b"}
    >
      <div className="flex justify-between items-center ml-8 sm:ml:0 sm:container  py-2">
        <div className="flex items-center">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="w-auto h-[32px] sm:h-[40px]" />
            <span className="font-bold text-xl  hidden sm:block">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden lg:block">
            <Menu />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/updates"
            className={buttonVariants({
              variant: "default",
              size: "sm",
            })}
          >
            Get Updates
          </Link>
          <ThemeToggle />
          <div className="lg:hidden">
            {/* <Drawer /> */}
            <DocsSidebar />
          </div>
        </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out"
        )}
      />
    </header>
  );
}
