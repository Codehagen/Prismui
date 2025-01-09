"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
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

function usePopover() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}

function usePopoverLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote("");
  };

  return { isOpen, openPopover, closePopover, uniqueId, note, setNote };
}

interface PopoverRootProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverRoot = React.forwardRef<HTMLDivElement, PopoverRootProps>(
  ({ children, className }, ref) => {
    const popoverLogic = usePopoverLogic();

    return (
      <PopoverContext.Provider value={popoverLogic}>
        <MotionConfig transition={TRANSITION}>
          <div
            ref={ref}
            className={cn(
              "relative flex items-center justify-center isolate",
              className
            )}
          >
            {children}
          </div>
        </MotionConfig>
      </PopoverContext.Provider>
    );
  }
);
PopoverRoot.displayName = "PopoverRoot";

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, variant = "outline" }, ref) => {
    const { openPopover, uniqueId } = usePopover();

    return (
      <motion.div key="button" layoutId={`popover-${uniqueId}`}>
        <Button
          ref={ref}
          variant={variant}
          className={className}
          onClick={openPopover}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="text-sm"
          >
            {children}
          </motion.span>
        </Button>
      </motion.div>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className }, ref) => {
    const { isOpen, closePopover, uniqueId } = usePopover();
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
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
          <motion.div
            ref={contentRef}
            layoutId={`popover-${uniqueId}`}
            className={cn(
              "absolute z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
              className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

interface PopoverHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-b px-4 py-2.5 font-medium text-foreground/90",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
PopoverHeader.displayName = "PopoverHeader";

interface PopoverBodyProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverBody = React.forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("p-4", className)}>
        {children}
      </div>
    );
  }
);
PopoverBody.displayName = "PopoverBody";

interface PopoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const PopoverButton = React.forwardRef<HTMLButtonElement, PopoverButtonProps>(
  ({ children, onClick, className }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-4 py-2 font-normal",
          className
        )}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
);
PopoverButton.displayName = "PopoverButton";

interface PopoverFooterProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        key="close"
        className={cn(
          "flex items-center justify-between border-t bg-muted/50 px-4 py-3",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
PopoverFooter.displayName = "PopoverFooter";

interface PopoverCloseButtonProps {
  className?: string;
}

const PopoverCloseButton = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseButtonProps
>(({ className }, ref) => {
  const { closePopover } = usePopover();

  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={closePopover}
      aria-label="Close popover"
    >
      <X className="h-4 w-4" />
    </Button>
  );
});
PopoverCloseButton.displayName = "PopoverCloseButton";

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
  PopoverFooter,
  PopoverCloseButton,
};
