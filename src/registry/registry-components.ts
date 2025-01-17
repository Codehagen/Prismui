// DO NOT REMOVE - Component Registry Guide
/**
 * This file registers UI components for the PrismUI registry.
 * To add a new component:
 * 1. Create the component in src/components/prismui/[component-name].tsx
 * 2. Add a new entry to the components array below
 * 3. Run `pnpm build:registry` to update the registry
 *
 * Each component must follow this structure to be properly displayed in the documentation.
 *
 * Component Registration Schema:
 * {
 *   name: "component-name",          // Name of the component (must be unique)
 *   type: "registry:ui",             // Type must be "registry:ui"
 *   category: "components",          // Category for documentation organization
 *   subcategory: "display",          // Subcategory (display|layout|form|navigation|etc)
 *   code: `"use client";            // The component source code that will be displayed
 *
 *     import { cn } from "@/lib/utils";
 *
 *     interface ComponentProps {
 *       // Props definition
 *     }
 *
 *     export default function Component({ ...props }: ComponentProps) {
 *       return (
 *         // Component implementation
 *       );
 *     }`,
 *   files: [{                       // Component file information
 *     path: "components/prismui/component-name.tsx",
 *     type: "registry:ui"
 *   }],
 *   cli: {                          // REQUIRED: CLI installation commands
 *     npm: "npx prismui@latest add component-name",
 *     pnpm: "pnpm dlx prismui@latest add component-name",
 *     yarn: "yarn dlx prismui@latest add component-name",
 *     bun: "bunx prismui@latest add component-name"
 *   },
 *   dependencies: ["@/lib/utils"]    // Required component dependencies
 * }
 *
 * IMPORTANT:
 * - Always include CLI commands for all package managers (npm, pnpm, yarn, bun)
 * - Use proper TypeScript types and interfaces
 * - Follow the design system color tokens and styling
 * - Include all necessary imports and dependencies
 * - Add detailed comments for complex logic
 * - Use consistent naming conventions
 */

import { type RegistryItem } from "./schema";

export const components: RegistryItem[] = [
  {
    name: "word-reveal",
    type: "registry:ui",
    category: "components",
    subcategory: "animation",
    code: `"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function WordReveal({
  text,
  className,
  delay = 0.15,
}: WordRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * delay,
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className
      )}
    >
      {words.map((word, i) => (
        <motion.span
          key={word + i}
          variants={child}
          custom={i}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}`,
    files: [
      {
        path: "components/prismui/word-reveal.tsx",
        type: "registry:ui",
        content: `"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function WordReveal({
  text,
  className,
  delay = 0.15,
}: WordRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * delay,
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className
      )}
    >
      {words.map((word, i) => (
        <motion.span
          key={word + i}
          variants={child}
          custom={i}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}`,
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/word-reveal.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/word-reveal.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/word-reveal.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/word-reveal.json"',
    },
    dependencies: ["framer-motion"],
  },
  {
    name: "card",
    type: "registry:ui",
    category: "components",
    subcategory: "layout",
    code: `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional hover effect */
  hover?: boolean;
  /** Optional gradient background */
  gradient?: boolean;
  /** Optional border style */
  bordered?: boolean;
}

export default function Card({
  className,
  hover = false,
  gradient = false,
  bordered = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card p-6",
        {
          "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg": hover,
          "bg-gradient-to-br from-card/50 to-card": gradient,
          "border border-border": bordered,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("mb-4", className)} {...props} />;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("", className)} {...props} />;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("mt-4 flex items-center justify-between", className)}
      {...props}
    />
  );
}`,
    files: [
      {
        path: "components/prismui/card.tsx",
        type: "registry:ui",
        content: `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional hover effect */
  hover?: boolean;
  /** Optional gradient background */
  gradient?: boolean;
  /** Optional border style */
  bordered?: boolean;
}

export default function Card({
  className,
  hover = false,
  gradient = false,
  bordered = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card p-6",
        {
          "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg": hover,
          "bg-gradient-to-br from-card/50 to-card": gradient,
          "border border-border": bordered,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("mb-4", className)} {...props} />;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("", className)} {...props} />;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("mt-4 flex items-center justify-between", className)}
      {...props}
    />
  );
}`,
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/card.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/card.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/card.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/card.json"',
    },
    dependencies: [],
  },
  {
    name: "logo-carousel",
    type: "registry:ui",
    category: "components",
    subcategory: "display",
    code: `"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SVGProps } from "react";
import Image from "next/image";

// Define types
interface Logo {
  id: number;
  name: string;
  src: string;
}

interface LogoColumnProps {
  logos: Logo[];
  columnIndex: number;
  currentTime: number;
}

// Main component
export function LogoCarousel({ columns = 2 }: { columns?: number }) {
  const [logoColumns, setLogoColumns] = useState<Logo[][]>([]);
  const [time, setTime] = useState(0);
  const CYCLE_DURATION = 2000; // 2 seconds per logo

  // Define logos using public SVGs
  const logos = useMemo<Logo[]>(
    () => [
      { id: 1, name: "Dub", src: "/logo/dub.svg" },
      { id: 2, name: "Supabase", src: "/logo/supabase.svg" },
      { id: 3, name: "Vercel", src: "/logo/vercel.svg" },
      { id: 4, name: "Resend", src: "/logo/resend.svg" },
      { id: 5, name: "Shadcn", src: "/logo/shadcn.svg" },
    ],
    []
  );

  // Distribute logos across columns
  const distributeLogos = useCallback(
    (logos: Logo[]) => {
      const shuffled = [...logos].sort(() => Math.random() - 0.5);
      const result: Logo[][] = Array.from({ length: columns }, () => []);

      shuffled.forEach((logo, index) => {
        result[index % columns].push(logo);
      });

      // Ensure equal length columns
      const maxLength = Math.max(...result.map((col) => col.length));
      result.forEach((col) => {
        while (col.length < maxLength) {
          col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
        }
      });

      return result;
    },
    [columns]
  );

  // Initialize logo columns
  useEffect(() => {
    setLogoColumns(distributeLogos(logos));
  }, [logos, distributeLogos]);

  // Update time for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-4 py-8">
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          columnIndex={index}
          currentTime={time}
        />
      ))}
    </div>
  );
}

// Column component
function LogoColumn({ logos, columnIndex, currentTime }: LogoColumnProps) {
  const CYCLE_DURATION = 2000;
  const columnDelay = columnIndex * 200;
  const adjustedTime =
    (currentTime + columnDelay) % (CYCLE_DURATION * logos.length);
  const currentIndex = Math.floor(adjustedTime / CYCLE_DURATION);
  const currentLogo = logos[currentIndex];

  return (
    <motion.div
      className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: columnIndex * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={\`\${currentLogo.id}-\${currentIndex}\`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "10%", opacity: 0 }}
          animate={{
            y: "0%",
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={currentLogo.src}
            alt={currentLogo.name}
            width={120}
            height={40}
            className="h-auto w-auto max-h-[80%] max-w-[80%] object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}`,
    files: [
      {
        path: "components/prismui/logo-carousel.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/logo-carousel.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/logo-carousel.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/logo-carousel.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/logo-carousel.json"',
    },
    dependencies: ["framer-motion"],
  },
  {
    name: "floating-action-panel",
    type: "registry:ui",
    category: "components",
    subcategory: "overlay",
    code: `"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TRANSITION = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
};

interface FloatingActionPanelContextType {
  isOpen: boolean;
  openPanel: (rect: DOMRect, mode: "actions" | "note") => void;
  closePanel: () => void;
  uniqueId: string;
  triggerRect: DOMRect | null;
  title: string;
  setTitle: (title: string) => void;
  note: string;
  setNote: (note: string) => void;
  mode: "actions" | "note";
}

const FloatingActionPanelContext = React.createContext<
  FloatingActionPanelContextType | undefined
>(undefined);

function useFloatingActionPanelLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [mode, setMode] = React.useState<"actions" | "note">("actions");

  const openPanel = (rect: DOMRect, newMode: "actions" | "note") => {
    setTriggerRect(rect);
    setMode(newMode);
    setIsOpen(true);
  };
  const closePanel = () => {
    setIsOpen(false);
    setNote("");
  };

  return {
    isOpen,
    openPanel,
    closePanel,
    uniqueId,
    triggerRect,
    title,
    setTitle,
    note,
    setNote,
    mode,
  };
}

interface FloatingActionPanelRootProps {
  children: (context: FloatingActionPanelContextType) => React.ReactNode;
  className?: string;
}

export function FloatingActionPanelRoot({
  children,
  className,
}: FloatingActionPanelRootProps) {
  const floatingPanelLogic = useFloatingActionPanelLogic();

  return (
    <FloatingActionPanelContext.Provider value={floatingPanelLogic}>
      <MotionConfig transition={TRANSITION}>
        <div className={cn("relative", className)}>
          {children(floatingPanelLogic)}
        </div>
      </MotionConfig>
    </FloatingActionPanelContext.Provider>
  );
}

interface FloatingActionPanelTriggerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  mode: "actions" | "note";
}

export function FloatingActionPanelTrigger({
  children,
  className,
  title,
  mode,
}: FloatingActionPanelTriggerProps) {
  const { openPanel, uniqueId, setTitle } = React.useContext(FloatingActionPanelContext)!;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (triggerRef.current) {
      openPanel(triggerRef.current.getBoundingClientRect(), mode);
      setTitle(title);
    }
  };

  return (
    <motion.button
      ref={triggerRef}
      layoutId={\`floating-panel-trigger-\${uniqueId}-\${mode}\`}
      className={cn(
        "flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

interface FloatingActionPanelContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function FloatingActionPanelContent({
  children,
  className,
}: FloatingActionPanelContentProps) {
  const { isOpen, closePanel, uniqueId, triggerRect, title, mode } =
    React.useContext(FloatingActionPanelContext)!;
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePanel]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePanel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-black/5"
          />
          <motion.div
            ref={contentRef}
            layoutId={\`floating-panel-\${uniqueId}-\${mode}\`}
            className={cn(
              "fixed z-50 min-w-[200px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-950",
              className
            )}
            style={{
              left: triggerRect ? triggerRect.left : "50%",
              top: triggerRect ? triggerRect.bottom + 8 : "50%",
              transformOrigin: "top left",
            }}
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
          >
            <div className="px-4 py-3 font-medium">{title}</div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface FloatingActionPanelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FloatingActionPanelButton({
  children,
  onClick,
  className,
}: FloatingActionPanelButtonProps) {
  return (
    <motion.button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className
      )}
      onClick={onClick}
      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

interface FloatingActionPanelFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

export function FloatingActionPanelForm({
  children,
  onSubmit,
  className,
}: FloatingActionPanelFormProps) {
  const { note, closePanel } = React.useContext(FloatingActionPanelContext)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closePanel();
  };

  return (
    <form
      className={cn("flex h-full flex-col", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

interface FloatingActionPanelTextareaProps {
  className?: string;
  id?: string;
}

export function FloatingActionPanelTextarea({
  className,
  id,
}: FloatingActionPanelTextareaProps) {
  const { note, setNote } = React.useContext(FloatingActionPanelContext)!;

  return (
    <textarea
      id={id}
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
}`,
    files: [
      {
        path: "components/prismui/floating-action-panel.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/floating-action-panel.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/floating-action-panel.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/floating-action-panel.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/floating-action-panel.json"',
    },
    dependencies: ["framer-motion", "lucide-react"],
  },
  {
    name: "hero-badge",
    type: "registry:ui",
    category: "components",
    subcategory: "display",
    code: `"use client";

import { motion, useAnimation, type Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1];

interface HeroBadgeProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const badgeVariants: Record<string, string> = {
  default: "bg-background hover:bg-muted",
  outline: "border-2 hover:bg-muted",
  ghost: "hover:bg-muted/50",
};

const sizeVariants: Record<string, string> = {
  sm: "px-3 py-1 text-xs gap-1.5",
  md: "px-4 py-1.5 text-sm gap-2",
  lg: "px-5 py-2 text-base gap-2.5",
};

const iconAnimationVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: -10 },
};

export default function HeroBadge({
  href,
  text,
  icon,
  endIcon,
  variant = "default",
  size = "md",
  className,
  onClick,
}: HeroBadgeProps) {
  const controls = useAnimation();

  const BadgeWrapper = href ? Link : motion.button;
  const wrapperProps = href ? { href } : { onClick };

  const baseClassName = cn(
    "inline-flex items-center rounded-full border transition-colors",
    badgeVariants[variant],
    sizeVariants[size],
    className
  );

  return (
    <BadgeWrapper
      {...wrapperProps}
      className={cn("group", href && "cursor-pointer")}
    >
      <motion.div
        className={baseClassName}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start("hover")}
        onHoverEnd={() => controls.start("initial")}
      >
        {icon && (
          <motion.div
            className="text-foreground/60 transition-colors group-hover:text-primary"
            variants={iconAnimationVariants}
            initial="initial"
            animate={controls}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {icon}
          </motion.div>
        )}
        <span>{text}</span>
        {endIcon && (
          <motion.div className="text-foreground/60">{endIcon}</motion.div>
        )}
      </motion.div>
    </BadgeWrapper>
  );
}`,
    files: [
      {
        path: "components/prismui/hero-badge.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/hero-badge.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/hero-badge.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/hero-badge.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/hero-badge.json"',
    },
    dependencies: ["framer-motion"],
  },
  {
    name: "action-button",
    type: "registry:ui",
    category: "components",
    subcategory: "form",
    code: `"use client";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";

interface props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isPending: boolean;
  onClick?: () => void;
}

export default function ActionButton({
  children,
  isPending,
  variant,
  size,
  className,
  onClick,
}: props) {
  return (
    <Button
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      type="submit"
      disabled={isPending}
      variant={variant}
      size={size}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']"
      )}
    >
      <span
        className={cn(
          isPending && "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {children}
      </span>
      <LoaderCircle
        aria-label="Submitting"
        className={cn(
          isPending ? "visible" : "invisible",
          "size-5 animate-spin transition-opacity [grid-area:stack]"
        )}
      />
    </Button>
  );
}`,
    files: [
      {
        path: "components/prismui/action-button.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/action-button.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/action-button.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/action-button.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/action-button.json"',
    },
    dependencies: [
      "lucide-react",
      "class-variance-authority",
      "@/components/ui/button",
    ],
  },
  {
    name: "button-group",
    type: "registry:ui",
    category: "components",
    subcategory: "form",
    code: `"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonGroupVariants = cva(
  "flex sm:items-center max-sm:gap-1 max-sm:flex-col [&>*:focus-within]:ring-1 [&>*:focus-within]:z-10 [&>*]:ring-offset-0 sm:[&>*:not(:first-child)]:rounded-l-none sm:[&>*:not(:last-child)]:rounded-r-none",
  {
    variants: {
      size: {
        default: "[&>*]:h-10 [&>*]:px-4 [&>*]:py-2",
        sm: "[&>*]:h-9 [&>*]:rounded-md [&>*]:px-3",
        lg: "[&>*]:h-11 [&>*]:rounded-md [&>*]:px-8",
        icon: "[&>*]:h-10 [&>*]:w-10",
      },
      separated: {
        true: "[&>*]:outline [&>*]:outline-1 [&>*]:outline-zinc-500 gap-0.5 [&>*:focus-within]:ring-offset-2",
        false: "[&>*:focus-within]:ring-offset-1",
      },
    },
    defaultVariants: {
      separated: false,
      size: "default",
    },
  }
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  separated?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, size, separated = false, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants({ size, className, separated }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };`,
    files: [
      {
        path: "components/prismui/button-group.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/button-group.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/button-group.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/button-group.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/button-group.json"',
    },
    dependencies: ["class-variance-authority"],
  },
  {
    name: "expandable-card",
    type: "registry:ui",
    category: "components",
    subcategory: "display",
    code: `"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  GitBranch,
  Github,
  MessageSquare,
  StepForwardIcon as Progress,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { useState, useCallback } from "react";
import { useSpring } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  contributors: Array<{ name: string; image?: string }>;
  tasks: Array<{ title: string; completed: boolean }>;
  githubStars: number;
  openIssues: number;
}

export function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const springConfig = { stiffness: 300, damping: 30 };
  const animatedHeight = useSpring(0, springConfig);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, toggleExpand, animatedHeight };
}


export function ProjectStatusCard({
  title,
  progress,
  dueDate,
  contributors,
  tasks,
  githubStars,
  openIssues,
}: ProjectStatusCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    <Card
      className="w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={toggleExpand}
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className={
                progress === 100
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }
            >
              {progress === 100 ? "Completed" : "In Progress"}
            </Badge>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} className="h-2" />
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-2"
                  >
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Due {dueDate}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          <span>{githubStars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitBranch className="h-4 w-4 mr-1" />
                          <span>{openIssues} issues</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Contributors
                      </h4>
                      <div className="flex -space-x-2">
                        {contributors.map((contributor, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="border-2 border-white">
                                  <AvatarImage
                                    src={
                                      contributor.image ||
                                      \`/placeholder.svg?height=32&width=32&text=\${contributor.name[0]}\`
                                    }
                                    alt={contributor.name}
                                  />
                                  <AvatarFallback>
                                    {contributor.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{contributor.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recent Tasks</h4>
                      {tasks.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600">{task.title}</span>
                          {task.completed && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Discussion
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between w-full text-sm text-gray-600">
          <span>Last updated: 2 hours ago</span>
          <span>{openIssues} open issues</span>
        </div>
      </CardFooter>
    </Card>
  );
}`,
    files: [
      {
        path: "components/prismui/expandable-card.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/expandable-card.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/expandable-card.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/expandable-card.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/expandable-card.json"',
    },
    dependencies: ["framer-motion", "lucide-react"],
  },
  {
    name: "display-cards",
    type: "registry:ui",
    category: "components",
    subcategory: "display",
    code: `"use client";

import { cn } from "@/lib/utils";
import { AudioLines } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <AudioLines className="size-4 text-green-300" />,
  title = "Featured",
  description = "This is a skewed card with some text",
  date = "Sep 23",
  iconClassName = "text-green-500",
  titleClassName = "text-green-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-green-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}`,
    files: [
      {
        path: "components/prismui/display-cards.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/display-cards.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/display-cards.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/display-cards.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/display-cards.json"',
    },
    dependencies: ["lucide-react"],
  },
  {
    name: "hero",
    type: "registry:ui",
    category: "components",
    subcategory: "marketing",
    code: `"use client";

import { motion, useAnimation } from "framer-motion";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];

interface HeroPillProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function HeroPill({ href, text, icon, endIcon }: HeroPillProps) {
  const controls = useAnimation();

  return (
    <Link href={href || "/docs"} className="group">
      <motion.div
        className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm transition-colors hover:bg-muted"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start({ rotate: -10 })}
        onHoverEnd={() => controls.start({ rotate: 0 })}
      >
        <motion.div
          className="text-foreground/60 transition-colors group-hover:text-primary"
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon || <Icons.logo className="h-4 w-4" />}
        </motion.div>
        <span>{text}</span>
        {endIcon || <Icons.chevronRight className="h-4 w-4" />}
      </motion.div>
    </Link>
  );
}

interface HeroContentProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
}

function HeroContent({
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
}: HeroContentProps) {
  return (
    <div className="flex flex-col space-y-4">
      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        {title}{" "}
        {titleHighlight && <span className="text-primary">{titleHighlight}</span>}
      </motion.h1>
      <motion.p
        className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease }}
      >
        {description}
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
      >
        {primaryAction && (
          <Link
            href={primaryAction.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 w-full sm:w-auto justify-center"
            )}
          >
            {primaryAction.icon}
            {primaryAction.text}
          </Link>
        )}
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 w-full sm:w-auto justify-center"
            )}
          >
            {secondaryAction.icon}
            {secondaryAction.text}
          </Link>
        )}
      </motion.div>
    </div>
  );
}

interface HeroProps {
  pill?: {
    href?: string;
    text: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
  content: HeroContentProps;
  preview?: React.ReactNode;
  className?: string;
}

export default function Hero({ pill, content, preview, className }: HeroProps) {
  return (
    <div className={cn("container relative overflow-hidden", className)}>
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row items-center py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
          {pill && <HeroPill {...pill} />}
          <HeroContent {...content} />
        </div>
        {preview && (
          <div className="w-full lg:max-w-xl lg:pl-16 mt-12 lg:mt-0">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}`,
    files: [
      {
        path: "components/prismui/hero.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: "npx prismui@latest add hero",
      pnpm: "pnpm dlx prismui@latest add hero",
      yarn: "yarn dlx prismui@latest add hero",
      bun: "bunx prismui@latest add hero",
    },
    dependencies: ["framer-motion"],
  },
  {
    name: "open-source",
    type: "registry:ui",
    category: "components",
    subcategory: "marketing",
    code: `"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Contributor {
  avatar_url: string;
  login: string;
}

interface Stats {
  stars: number;
  contributors: Contributor[];
}

interface OpenSourceProps {
  /** The repository owner/name (e.g., "codehagen/prismui") */
  repository: string;
  /** Optional GitHub OAuth token for API requests */
  githubToken?: string;
  /** Optional default stats to show while loading */
  defaultStats?: Stats;
  /** Optional custom title */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom button text */
  buttonText?: string;
  /** Optional className for styling */
  className?: string;
}

async function getGithubStats(repository: string, githubToken?: string): Promise<Stats> {
  try {
    const [repoResponse, contributorsResponse] = await Promise.all([
      fetch(\`https://api.github.com/repos/\${repository}\`, {
        ...(githubToken && {
          headers: {
            Authorization: \`Bearer \${githubToken}\`,
            "Content-Type": "application/json",
          },
        }),
        next: { revalidate: 3600 },
      }),
      fetch(\`https://api.github.com/repos/\${repository}/contributors\`, {
        ...(githubToken && {
          headers: {
            Authorization: \`Bearer \${githubToken}\`,
            "Content-Type": "application/json",
          },
        }),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!repoResponse.ok || !contributorsResponse.ok) {
      return { stars: 0, contributors: [] };
    }

    const repoData = await repoResponse.json();
    const contributorsData = await contributorsResponse.json();

    return {
      stars: repoData.stargazers_count,
      contributors: contributorsData as Contributor[],
    };
  } catch (error) {
    return { stars: 0, contributors: [] };
  }
}

function StarIcon({
  className,
  delay = 0,
  size = "default",
}: {
  className?: string;
  delay?: number;
  size?: "small" | "default";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.2, rotate: 20 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
        hover: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className={className}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "text-yellow-400",
          size === "small" ? "w-4 h-4" : "w-8 h-8"
        )}
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(size === "small" && "opacity-20")}
        />
      </svg>
    </motion.div>
  );
}

function StarsDecoration() {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
      <div className="flex gap-4">
        <StarIcon delay={0.2} />
        <StarIcon delay={0.3} />
        <StarIcon delay={0.4} />
      </div>
    </div>
  );
}

function ContributorAvatars({ contributors }: { contributors: Contributor[] }) {
  const displayedContributors = contributors.slice(0, 8);

  return (
    <div className="flex flex-wrap gap-2">
      {displayedContributors.map((contributor) => (
        <motion.div
          key={contributor.login}
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image
            src={contributor.avatar_url}
            alt={\`\${contributor.login}'s avatar\`}
            width={40}
            height={40}
            className="rounded-full border-2 border-background"
          />
        </motion.div>
      ))}
    </div>
  );
}

function OpenSourceCard({
  repository,
  stars,
  contributors,
}: {
  repository: string;
  stars: number;
  contributors: Contributor[];
}) {
  return (
    <div className="relative grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center text-center"
      >
        <motion.a
          href={\`https://github.com/\${repository}\`}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <StarsDecoration />
          <div className="flex flex-col items-center mt-2">
            <div className="text-7xl font-bold">{stars}</div>
            <div className="text-xl text-muted-foreground mt-2">
              Github Stars
            </div>
          </div>
        </motion.a>
      </motion.div>

      <Separator className="md:hidden" />

      <div className="hidden md:block absolute left-1/2 top-0 h-full">
        <Separator orientation="vertical" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold">
              {contributors.length}+ Contributors
            </div>
            <div className="text-lg text-muted-foreground mt-2">
              Join our growing community
            </div>
          </div>
          <a
            href={\`https://github.com/\${repository}/graphs/contributors\`}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <div className="flex justify-center">
              <ContributorAvatars contributors={contributors} />
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function OpenSourceContent({
  repository,
  stars,
  contributors,
  title = "Proudly open-source",
  description = "Our source code is available on GitHub - feel free to read, review, or contribute to it however you want!",
  buttonText = "Star on GitHub",
}: Stats & {
  repository: string;
  title?: string;
  description?: string;
  buttonText?: string;
}) {
  return (
    <section className="container relative py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            {description}
          </p>
          <div className="mt-6">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href={\`https://github.com/\${repository}\`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 438.549 438.549" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  ></path>
                </svg>
                {buttonText}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
      <Separator className="mb-16" />
      <div className="max-w-4xl mx-auto">
        <OpenSourceCard
          repository={repository}
          stars={stars}
          contributors={contributors}
        />
      </div>
    </section>
  );
}

async function OpenSourceData({
  repository,
  githubToken,
  defaultStats = { stars: 0, contributors: [] },
  ...props
}: OpenSourceProps) {
  const stats = await getGithubStats(repository, githubToken);
  return <OpenSourceContent {...stats} {...props} />;
}

export default function OpenSource(props: OpenSourceProps) {
  return (
    <Suspense
      fallback={
        <OpenSourceContent
          stars={props.defaultStats?.stars || 0}
          contributors={props.defaultStats?.contributors || []}
          {...props}
        />
      }
    >
      <OpenSourceData {...props} />
    </Suspense>
  );
}`,
    files: [
      {
        path: "components/prismui/open-source.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/open-source.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/open-source.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/open-source.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/open-source.json"',
    },
    dependencies: ["framer-motion"],
  },
  {
    name: "number-flow",
    type: "registry:ui",
    category: "components",
    subcategory: "animation",
    code: `"use client";

import NumberFlow from "@number-flow/react";
import { type Format } from "@number-flow/react";

interface NumberFlowProps {
  value: number;
  format?: Format;
  locales?: string | string[];
  prefix?: string;
  suffix?: string;
  spinTiming?: EffectTiming;
  willChange?: boolean;
  continuous?: boolean;
}

export default function NumberFlowWrapper({
  value,
  format = {},
  locales,
  prefix,
  suffix,
  spinTiming,
  willChange = false,
  continuous = false,
}: NumberFlowProps) {
  return (
    <NumberFlow
      value={value}
      format={format}
      locales={locales}
      prefix={prefix}
      suffix={suffix}
      spinTiming={spinTiming}
      willChange={willChange}
      continuous={continuous}
    />
  );
}`,
    files: [
      {
        path: "components/prismui/number-flow.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/number-flow.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/number-flow.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/number-flow.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/number-flow.json"',
    },
    dependencies: ["@number-flow/react"],
  },
  {
    name: "popover",
    type: "registry:ui",
    category: "components",
    subcategory: "overlay",
    code: `"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TRANSITION = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
};

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

function usePopoverLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote("");
  };

  return {
    isOpen,
    openPopover,
    closePopover,
    uniqueId,
    note,
    setNote,
  };
}

interface PopoverRootProps {
  children: React.ReactNode;
}

export function PopoverRoot({ children }: PopoverRootProps) {
  const popoverLogic = usePopoverLogic();

  return (
    <PopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div className="relative">{children}</div>
      </MotionConfig>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function PopoverTrigger({
  children,
  className,
  variant = "default",
  ...props
}: PopoverTriggerProps) {
  const { openPopover, uniqueId } = React.useContext(PopoverContext)!;

  return (
    <motion.div layoutId={\`popover-trigger-\${uniqueId}\`}>
      <Button
        variant={variant}
        className={className}
        onClick={openPopover}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverContent({
  children,
  className,
}: PopoverContentProps) {
  const { isOpen, closePopover, uniqueId } = React.useContext(PopoverContext)!;
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopover]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePopover]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-black/5"
          />
          <motion.div
            ref={contentRef}
            layoutId={\`popover-\${uniqueId}\`}
            className={cn(
              "fixed z-50 min-w-[200px] overflow-hidden rounded-lg border border-border bg-background shadow-lg outline-none",
              className
            )}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface PopoverFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
}

export function PopoverForm({ children, onSubmit }: PopoverFormProps) {
  const { note, closePopover } = React.useContext(PopoverContext)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closePopover();
  };

  return (
    <form className="flex h-full flex-col" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

interface PopoverLabelProps {
  children: React.ReactNode;
}

export function PopoverLabel({ children }: PopoverLabelProps) {
  return <div className="px-4 py-3 font-medium">{children}</div>;
}

interface PopoverTextareaProps {
  className?: string;
  id?: string;
}

export function PopoverTextarea({ className, id }: PopoverTextareaProps) {
  const { note, setNote } = React.useContext(PopoverContext)!;

  return (
    <textarea
      id={id}
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
}

interface PopoverFooterProps {
  children: React.ReactNode;
}

export function PopoverFooter({ children }: PopoverFooterProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-t p-3">
      {children}
    </div>
  );
}

export function PopoverCloseButton() {
  const { closePopover } = React.useContext(PopoverContext)!;

  return (
    <Button variant="ghost" size="sm" onClick={closePopover}>
      Cancel
    </Button>
  );
}

interface PopoverSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function PopoverSubmitButton({
  children,
  variant = "default",
  ...props
}: PopoverSubmitButtonProps) {
  return (
    <Button type="submit" variant={variant} size="sm" {...props}>
      {children}
    </Button>
  );
}

interface PopoverHeaderProps {
  children: React.ReactNode;
}

export function PopoverHeader({ children }: PopoverHeaderProps) {
  return <div className="px-4 py-3">{children}</div>;
}

interface PopoverBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverBody({ children, className }: PopoverBodyProps) {
  return <div className={cn("px-2 py-1.5", className)}>{children}</div>;
}

interface PopoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PopoverButton({
  children,
  onClick,
  className,
}: PopoverButtonProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`,
    files: [
      {
        path: "components/prismui/popover.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/popover.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/popover.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/popover.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/popover.json"',
    },
    dependencies: ["framer-motion"],
  },
  {
    name: "pricing",
    type: "registry:ui",
    category: "sections",
    subcategory: "marketing",
    code: `"use client";

// ... (paste the entire component code here)
`,
    files: [
      {
        path: "components/prismui/pricing.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/pricing.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/pricing.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/pricing.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/pricing.json"',
    },
    dependencies: ["framer-motion", "canvas-confetti"],
  },
  {
    name: "timeline",
    type: "registry:ui",
    category: "components",
    subcategory: "display",
    code: `"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  initialCount?: number;
  dateFormat?: Intl.DateTimeFormatOptions;
  className?: string;
  showMoreText?: string;
  showLessText?: string;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg";
  animationDuration?: number;
  animationDelay?: number;
  showAnimation?: boolean;
}

function DesktopTimelineEntry({
  item,
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "group hidden grid-cols-9 items-center md:grid",
        !item.href && "pointer-events-none"
      )}
    >
      <dl className="col-span-2">
        <dt className="sr-only">Date</dt>
        <dd
          className={cn(
            "text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground",
            dateClassName
          )}
        >
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </dd>
      </dl>
      <div className="col-span-7 flex items-center">
        <div className="relative ml-4">
          <div
            className={cn("h-16 border-l border-border pr-8", lineClassName)}
          />
          <div
            className={cn(
              "absolute -left-1 top-[1.6875rem] flex h-5 w-5 items-center justify-center rounded-full bg-primary/60 transition-colors group-hover:bg-primary",
              !item.icon && "h-2.5 w-2.5",
              dotClassName
            )}
          >
            {item.icon && (
              <div className="h-3 w-3 text-primary-foreground">{item.icon}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3
            className={cn(
              "text-xl font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground",
              titleClassName
            )}
          >
            {item.title}
          </h3>
          {item.description && (
            <p
              className={cn(
                "text-sm text-muted-foreground group-hover:text-muted-foreground/80",
                descriptionClassName
              )}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function MobileTimelineEntry({
  item,
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center space-x-4 rounded-lg px-4 py-3 transition-colors hover:bg-muted active:bg-muted/80 md:hidden",
        !item.href && "pointer-events-none"
      )}
    >
      <div className="relative">
        <div className={cn("h-16 border-l border-border", lineClassName)} />
        <div
          className={cn(
            "absolute -left-1 top-5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/60",
            !item.icon && "h-2.5 w-2.5",
            dotClassName
          )}
        >
          {item.icon && (
            <div className="h-3 w-3 text-primary-foreground">{item.icon}</div>
          )}
        </div>
      </div>
      <div>
        <dl>
          <dt className="sr-only">Date</dt>
          <dd
            className={cn(
              "text-sm font-medium text-muted-foreground",
              dateClassName
            )}
          >
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </dd>
        </dl>
        <h3
          className={cn(
            "text-lg font-medium tracking-tight text-foreground",
            titleClassName
          )}
        >
          {item.title}
        </h3>
        {item.description && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              descriptionClassName
            )}
          >
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export function Timeline({
  items,
  initialCount = 5,
  className,
  showMoreText = "Show More",
  showLessText = "Show Less",
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
  buttonVariant = "ghost",
  buttonSize = "sm",
  animationDuration = 0.3,
  animationDelay = 0.1,
  showAnimation = true,
}: TimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const sortedItems = items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const initialItems = sortedItems.slice(0, initialCount);
  const remainingItems = sortedItems.slice(initialCount);

  return (
    <div className={cn("mx-5 max-w-2xl md:mx-auto", className)}>
      <div className="md:translate-x-28">
        <ul className="space-y-8">
          {initialItems.map((item, index) => (
            <motion.li
              key={index}
              initial={showAnimation ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: index * animationDelay,
              }}
            >
              <DesktopTimelineEntry
                item={item}
                dotClassName={dotClassName}
                lineClassName={lineClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                dateClassName={dateClassName}
              />
              <MobileTimelineEntry
                item={item}
                dotClassName={dotClassName}
                lineClassName={lineClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                dateClassName={dateClassName}
              />
            </motion.li>
          ))}
          <AnimatePresence>
            {showAll &&
              remainingItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: animationDuration,
                    delay: index * animationDelay,
                  }}
                >
                  <DesktopTimelineEntry
                    item={item}
                    dotClassName={dotClassName}
                    lineClassName={lineClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    dateClassName={dateClassName}
                  />
                  <MobileTimelineEntry
                    item={item}
                    dotClassName={dotClassName}
                    lineClassName={lineClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    dateClassName={dateClassName}
                  />
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      </div>
      {remainingItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className="gap-2"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? showLessText : showMoreText}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
`,
    files: [
      {
        path: "components/prismui/timeline.tsx",
        type: "registry:ui",
      },
    ],
    cli: {
      npm: 'npx shadcn@latest add "https://www.prismui.tech/r/styles/default/timeline.json"',
      pnpm: 'pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/timeline.json"',
      yarn: 'yarn dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/timeline.json"',
      bun: 'bunx shadcn@latest add "https://www.prismui.tech/r/styles/default/timeline.json"',
    },
    dependencies: ["framer-motion", "lucide-react"],
  },
];
