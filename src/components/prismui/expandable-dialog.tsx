"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

const TRANSITION = {
  type: "spring",
  stiffness: 200,
  damping: 24,
};

interface ExpandableDialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const ExpandableDialogContext = React.createContext<
  ExpandableDialogContextType | undefined
>(undefined);

function useExpandableDialog() {
  const context = React.useContext(ExpandableDialogContext);
  if (!context) {
    throw new Error(
      "useExpandableDialog must be used within an ExpandableDialogProvider"
    );
  }
  return context;
}

interface ExpandableDialogProps {
  children: React.ReactNode;
  transition?: typeof TRANSITION;
}

function ExpandableDialogRoot({
  children,
  transition = TRANSITION,
}: ExpandableDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const uniqueId = React.useId();
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
    }),
    [isOpen, uniqueId]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ExpandableDialogContext.Provider value={value}>
      <MotionConfig transition={transition}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {children}
          {mounted &&
            createPortal(
              <AnimatePresence initial={false} mode="sync">
                {isOpen && (
                  <motion.div
                    key={`backdrop-${uniqueId}`}
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>,
              document.body
            )}
        </Dialog>
      </MotionConfig>
    </ExpandableDialogContext.Provider>
  );
}

interface ExpandableDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function ExpandableDialogTrigger({
  children,
  className,
  style,
}: ExpandableDialogTriggerProps) {
  const { uniqueId, triggerRef, setIsOpen, isOpen } = useExpandableDialog();

  const handleClick = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <DialogTrigger asChild>
      <motion.div
        ref={triggerRef}
        layoutId={`dialog-${uniqueId}`}
        className={cn("relative cursor-pointer", className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={style}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {children}
      </motion.div>
    </DialogTrigger>
  );
}

interface ExpandableDialogImageProps
  extends React.ComponentProps<typeof motion.img> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

function ExpandableDialogImage({
  src,
  alt,
  className,
  style,
  ...props
}: ExpandableDialogImageProps) {
  const { uniqueId } = useExpandableDialog();

  return (
    <motion.img
      layoutId={`dialog-image-${uniqueId}`}
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
}

interface ExpandableDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

function ExpandableDialogTitle({
  children,
  className,
}: ExpandableDialogTitleProps) {
  const { uniqueId } = useExpandableDialog();

  return (
    <motion.div layoutId={`dialog-title-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

interface ExpandableDialogSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

function ExpandableDialogSubtitle({
  children,
  className,
}: ExpandableDialogSubtitleProps) {
  const { uniqueId } = useExpandableDialog();

  return (
    <motion.div layoutId={`dialog-subtitle-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

interface ExpandableDialogContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function ExpandableDialogContent({
  children,
  className,
  style,
}: ExpandableDialogContentProps) {
  const { uniqueId } = useExpandableDialog();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const focusableElements = contentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, []);

  return (
    <DialogContent className="p-0 border-none bg-transparent shadow-none outline-none">
      <motion.div
        ref={contentRef}
        layoutId={`dialog-${uniqueId}`}
        className={cn(
          "relative rounded-lg border bg-background shadow-lg outline-none max-h-[85vh] overflow-auto",
          className
        )}
        style={style}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </motion.div>
    </DialogContent>
  );
}

interface ExpandableDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  variants?: {
    initial?: any;
    animate?: any;
    exit?: any;
  };
  disableLayoutAnimation?: boolean;
}

function ExpandableDialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation = false,
}: ExpandableDialogDescriptionProps) {
  const { uniqueId } = useExpandableDialog();

  const props = disableLayoutAnimation
    ? {
        initial: variants?.initial,
        animate: variants?.animate,
        exit: variants?.exit,
      }
    : {
        layoutId: `dialog-description-${uniqueId}`,
      };

  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}

export {
  ExpandableDialogRoot,
  ExpandableDialogTrigger,
  ExpandableDialogContent,
  ExpandableDialogImage,
  ExpandableDialogTitle,
  ExpandableDialogSubtitle,
  ExpandableDialogDescription,
};
