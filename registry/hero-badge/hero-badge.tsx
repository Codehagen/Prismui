import * as React from "react";
import { cn } from "@/lib/utils";

interface HeroBadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export function HeroBadge({
  text,
  icon,
  endIcon,
  className,
  ...props
}: HeroBadgeProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </a>
  );
}
