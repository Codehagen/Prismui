"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Upload,
  Palette,
  Share2,
  BookMarked,
  StickyNote,
} from "lucide-react";
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

const useFloatingActionPanel = () => {
  const context = React.useContext(FloatingActionPanelContext);
  if (!context) {
    throw new Error(
      "useFloatingActionPanel must be used within a FloatingActionPanelProvider"
    );
  }
  return context;
};

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

const FloatingActionPanelRoot = React.forwardRef<
  HTMLDivElement,
  FloatingActionPanelRootProps
>(({ children, className }, ref) => {
  const floatingPanelLogic = useFloatingActionPanelLogic();

  return (
    <FloatingActionPanelContext.Provider value={floatingPanelLogic}>
      <MotionConfig transition={TRANSITION}>
        <div ref={ref} className={cn("relative", className)}>
          {children(floatingPanelLogic)}
        </div>
      </MotionConfig>
    </FloatingActionPanelContext.Provider>
  );
});
FloatingActionPanelRoot.displayName = "FloatingActionPanelRoot";

interface FloatingActionPanelTriggerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  mode: "actions" | "note";
}

const FloatingActionPanelTrigger = React.forwardRef<
  HTMLButtonElement,
  FloatingActionPanelTriggerProps
>(({ children, className, title, mode }, ref) => {
  const { openPanel, uniqueId, setTitle } = useFloatingActionPanel();
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
      layoutId={`floating-panel-trigger-${uniqueId}-${mode}`}
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
});
FloatingActionPanelTrigger.displayName = "FloatingActionPanelTrigger";

interface FloatingActionPanelContentProps {
  children?: React.ReactNode;
  className?: string;
}

const FloatingActionPanelContent = React.forwardRef<
  HTMLDivElement,
  FloatingActionPanelContentProps
>(({ children, className }, ref) => {
  const { isOpen, closePanel, uniqueId, triggerRect, title, mode } =
    useFloatingActionPanel();
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

  const getPosition = () => {
    if (!triggerRect) return { left: "50%", top: "50%" };

    // Get scroll position
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Calculate position
    const left = triggerRect.left + scrollX;
    const top = triggerRect.bottom + scrollY + 8; // 8px gap

    return {
      position: "absolute" as const,
      left: 0,
      top: 0,
      transform: `translate3d(${left}px, ${top}px, 0)`,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative">
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-black/5"
          />
          <motion.div
            ref={contentRef}
            layoutId={`floating-panel-${uniqueId}-${mode}`}
            className={cn(
              "absolute z-50 min-w-[200px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-950",
              className
            )}
            style={getPosition()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="px-4 py-3 font-medium">{title}</div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
FloatingActionPanelContent.displayName = "FloatingActionPanelContent";

interface FloatingActionPanelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const FloatingActionPanelButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionPanelButtonProps
>(({ children, onClick, className }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
});
FloatingActionPanelButton.displayName = "FloatingActionPanelButton";

interface FloatingActionPanelFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

const FloatingActionPanelForm = React.forwardRef<
  HTMLFormElement,
  FloatingActionPanelFormProps
>(({ children, onSubmit, className }, ref) => {
  const { note, closePanel } = useFloatingActionPanel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closePanel();
  };

  return (
    <form
      ref={ref}
      className={cn("flex h-full flex-col", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
});
FloatingActionPanelForm.displayName = "FloatingActionPanelForm";

interface FloatingActionPanelTextareaProps {
  className?: string;
  id?: string;
}

const FloatingActionPanelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingActionPanelTextareaProps
>(({ className, id }, ref) => {
  const { note, setNote } = useFloatingActionPanel();

  return (
    <textarea
      ref={ref}
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
});
FloatingActionPanelTextarea.displayName = "FloatingActionPanelTextarea";

export {
  FloatingActionPanelRoot,
  FloatingActionPanelTrigger,
  FloatingActionPanelContent,
  FloatingActionPanelButton,
  FloatingActionPanelForm,
  FloatingActionPanelTextarea,
  FloatingActionPanelContext,
};
