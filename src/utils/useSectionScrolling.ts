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

      // Smooth scroll to the very top of the next section
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
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
    let touchMoved = false;
    let touchShouldScroll = false;

    function handleTouchStart(e: TouchEvent) {
      // Only track touch start if in hero section
      if (isInHeroSection()) {
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
        touchShouldScroll = false;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isInHeroSection() || isScrolling) return;
      if (e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const touchDiff = touchStartY - currentY;
      // Only trigger if finger moved upward (scrolling down)
      if (touchDiff > 30) {
        // Prevent browser native scroll
        e.preventDefault();
        touchShouldScroll = true;
      }
      touchMoved = true;
    }

    function handleTouchEnd(e: TouchEvent) {
      // Only handle touch end if in hero section and not currently scrolling
      if (!isInHeroSection() || isScrolling) return;
      if (!touchMoved) return;
      if (touchShouldScroll) {
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
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return containerRef;
};
