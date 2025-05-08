import { useEffect, useRef } from "react";

export const useSectionScrolling = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    );

    if (sections.length < 2) return; // Need at least 2 sections (hero + next)

    // Only control scrolling for the hero section (first section)
    const heroSection = sections[0];
    const nextSection = sections[1];

    // Log the real position of all sections and compare to offset
    console.log("Section positions:");
    sections.forEach((section, idx) => {
      const rect = section.getBoundingClientRect();
      console.log(
        `Section ${idx}: offsetTop=${section.offsetTop}, rect.top=${rect.top}, rect.bottom=${rect.bottom}, scrollY=${window.scrollY}`
      );
    });
    console.log(
      `Next section offsetTop: ${nextSection.offsetTop}, window.scrollY: ${window.scrollY}`
    );

    // Track if animation is in progress
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollAnimationDuration = 800; // ms - reduced from 1000ms for faster response

    // Scroll from hero to next section with animation
    function scrollToNextSection() {
      if (isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime < 100) return; // Prevent rapid fire scrolls
      lastScrollTime = now;

      isScrolling = true;

      // Smooth scroll to the next section with enhanced animation
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });

      // Log after scroll is triggered
      setTimeout(() => {
        const rect = nextSection.getBoundingClientRect();
        console.log(
          `After scroll: nextSection.offsetTop=${nextSection.offsetTop}, rect.top=${rect.top}, window.scrollY=${window.scrollY}`
        );
        isScrolling = false;
      }, scrollAnimationDuration);
    }

    // Determine if we're currently in the hero section
    function isInHeroSection() {
      const scrollPosition = window.scrollY;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

      // We're in hero if scroll position is before the end of hero section
      return scrollPosition < heroBottom - window.innerHeight / 3;
    }

    // Handle wheel events (mouse/trackpad)
    function handleWheel(e: WheelEvent) {
      // Only control scrolling when in the hero section and only for downward scrolling
      if (!isInHeroSection()) return;

      // Only trigger animation when scrolling downwards
      if (e.deltaY > 10) {
        e.preventDefault();
        scrollToNextSection();
      }
      // Upward scrolling is allowed to function normally
    }

    // Touch handling for mobile
    let touchStartY = 0;

    function handleTouchStart(e: TouchEvent) {
      // Only track touch start if in hero section
      if (isInHeroSection()) {
        touchStartY = e.touches[0].clientY;
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      // Only handle touch end if in hero section and not currently scrolling
      if (!isInHeroSection() || isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY; // Positive means finger moved upward on screen (scrolling down)

      // Only trigger animation when finger moves upward (which is scrolling down)
      if (touchDiff > 30) {
        scrollToNextSection();
      }
      // When finger moves downward (scrolling up), behave normally
    }

    // Keyboard navigation from hero section
    function handleKeyDown(e: KeyboardEvent) {
      // Only handle keyboard when in hero section and not currently scrolling
      if (!isInHeroSection() || isScrolling) return;

      // Only trigger animation for downward navigation keys
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "Space") {
        e.preventDefault();
        scrollToNextSection();
      }
      // Upward navigation keys behave normally
    }

    // Add event listeners - removed the general scroll handler to reduce lag
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return containerRef;
};
