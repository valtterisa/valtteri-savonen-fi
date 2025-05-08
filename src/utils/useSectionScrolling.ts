// This hook is now deprecated. Drag-to-scroll is handled directly in the Hero component using framer-motion.
// You can safely remove this file if not used elsewhere.
import { useEffect, useRef, useCallback } from "react";

function isMobile() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) ||
    (typeof navigator !== "undefined" &&
      navigator.userAgent.toLowerCase().includes("mobi"))
  );
}

export function useSectionScrolling() {
  const sectionRef = useRef<HTMLElement>(null);

  // Helper to scroll to next section with mobile fallback
  const scrollToNextSection = useCallback(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    );
    if (sections.length < 2) return;
    const nextSection = sections[1];
    const startY = window.scrollY;
    nextSection.scrollIntoView({ behavior: "smooth" });
    // Fallback for mobile browsers where scrollIntoView may not work
    if (isMobile()) {
      setTimeout(() => {
        // If scroll position hasn't changed, use window.scrollTo
        if (window.scrollY === startY) {
          window.scrollTo({ top: nextSection.offsetTop, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  // Desktop: handle wheel and keyboard
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      // Only trigger if in hero section and scrolling down
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top > -window.innerHeight / 3 && e.deltaY > 10) {
        e.preventDefault();
        scrollToNextSection();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top > -window.innerHeight / 3) {
        if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
    };
    // Only add on non-touch devices
    if (!("ontouchstart" in window)) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [scrollToNextSection]);

  // Mobile: drag only if touch
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  const dragProps = isTouch
    ? {
        drag: "y" as const,
        dragConstraints: { top: 0, bottom: 0 },
        onDragEnd: (_: any, info: { offset: { y: number } }) => {
          if (info.offset.y < -60) scrollToNextSection();
        },
        dragElastic: 0.2,
        dragMomentum: false,
        style: { touchAction: "pan-y" },
      }
    : {};

  return { sectionRef, dragProps };
}
