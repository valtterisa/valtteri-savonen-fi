import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

function isMobile() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.userAgent.toLowerCase().includes("mobi")
  );
}

export function Hero() {
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

  const MotionSection = motion.section;

  return (
    <MotionSection
      id="hero"
      className="min-h-dvh flex items-center relative"
      ref={sectionRef}
      {...dragProps}
    >
      <div className="section w-full px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-archivo-black mb-6 sm:mb-10 tracking-tighter uppercase text-center overflow-hidden flex flex-col">
            <span className="inline-block">Valtteri</span>
            <span className="inline-block">Savonen</span>
          </h1>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="rounded-xl shadow-lg">
              <blockquote className="text-center">
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  <span className="font-serif">"</span>
                  Your time is limited, so don't waste it living someone else's
                  life.
                  <span className="font-serif">"</span>
                </p>
                <footer className="text-gray-300 font-medium mt-2">
                  <span className="font-bold">- Steve Jobs</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center animate-pulse">
        <span className="text-gray-300 text-sm mb-2">Scroll Down</span>
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </MotionSection>
  );
}
