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

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  logos: Logo[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  return <div>Logo Carousel</div>;
}`,
    files: [
      {
        path: "components/prismui/logo-carousel.tsx",
        type: "registry:ui",
        content: `"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  logos: Logo[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  return <div>Logo Carousel</div>;
}`,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useExpandable } from "@/hooks/use-expandable";

interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  contributors: Array<{ name: string; image?: string }>;
  tasks: Array<{ title: string; completed: boolean }>;
  githubStars: number;
  openIssues: number;
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
    dependencies: ["framer-motion", "lucide-react", "@/hooks/use-expandable"],
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
  title = "Bullshit",
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
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
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
];
