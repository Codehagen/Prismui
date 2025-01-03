import { useEffect, useState } from "react";

export default function useCurrentAnchor() {
  const [currentAnchor, setCurrentAnchor] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headings = document.querySelectorAll("h2[id], h3[id], h4[id]");
    if (headings.length === 0) return;

    const getActiveHeading = () => {
      const scrollY = window.scrollY;
      const headerOffset = 100; // Adjust based on your header height

      // Find the last heading that's above our scroll position
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const headingTop = heading.getBoundingClientRect().top + scrollY;

        if (scrollY >= headingTop - headerOffset) {
          return heading.id;
        }
      }

      // If no heading is found, return the first one
      return headings[0].id;
    };

    // Update active section on scroll
    const onScroll = () => {
      const activeHeading = getActiveHeading();
      if (activeHeading) setCurrentAnchor(activeHeading);
    };

    // Also use IntersectionObserver for more precise detection when headings come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const id = entry.target.getAttribute("id");
            if (id) setCurrentAnchor(id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: [0, 1],
      }
    );

    // Observe all headings
    headings.forEach((heading) => observer.observe(heading));

    // Initial check
    onScroll();

    // Add scroll listener
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return currentAnchor;
}
