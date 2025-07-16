import { useEffect, useState } from "react";

export default function useCurrentAnchor() {
  const [currentAnchor, setCurrentAnchor] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headings = document.querySelectorAll("h2[id], h3[id], h4[id]");
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 400; // Increased offset to bridge gaps
      let currentId = "";

      // Find the last heading that we've scrolled past
      for (const heading of headings) {
        const element = heading as HTMLElement;
        if (element && scrollPosition >= element.offsetTop) {
          currentId = element.id;
        }
      }

      // Always ensure we have an active heading
      if (!currentId && headings.length > 0) {
        const firstHeading = headings[0] as HTMLElement;
        currentId = firstHeading.id;
      }

      // Update state if we have a valid ID and it's different
      if (currentId && currentId !== currentAnchor) {
        setCurrentAnchor(currentId);
      }
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    
    // Set initial active heading
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [currentAnchor]);

  return currentAnchor;
}
