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
    const scrollAnimationDuration = 1000; // ms

    // Scroll from hero to next section with animation
    function scrollToNextSection() {
      if (isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime < 100) return; // Prevent rapid fire scrolls
      lastScrollTime = now;

      isScrolling = true;

      // Calculate exact position to ensure consistent landing point
      const exactScrollTarget = nextSection.offsetTop;

      // Smooth scroll to the next section with enhanced animation
      window.scrollTo({
        top: exactScrollTarget,
        behavior: "smooth",
      });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling = false;
        document.body.style.overflow = "";

        // Ensure we're exactly at the target position after animation
        if (Math.abs(window.scrollY - exactScrollTarget) > 5) {
          window.scrollTo({
            top: exactScrollTarget,
            behavior: "auto",
          });
        }
      }, scrollAnimationDuration);
    }

    // Determine if we're currently in the hero section
    function isInHeroSection() {
      const scrollPosition = window.scrollY;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

      // We're in hero if scroll position is before the end of hero section
      return scrollPosition < heroBottom - window.innerHeight / 3;
    }

    // Handle native scroll events to intercept all scrolling in hero
    function handleScroll(e: Event) {
      if (isScrolling) return;

      if (isInHeroSection() && window.scrollY > 0) {
        // If user tries to scroll within hero section, snap back to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    // Handle wheel events
    function handleWheel(e: WheelEvent) {
      // Only control scrolling when in the hero section
      if (!isInHeroSection()) return;

      // If scrolling down with enough force, go to next section
      if (e.deltaY > 10) {
        e.preventDefault();
        scrollToNextSection();
      }
    }

    // Touch handling for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchMoving = false;

    function handleTouchStart(e: TouchEvent) {
      // Only track touch start if in hero section
      if (isInHeroSection()) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        isTouchMoving = false;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      // Only handle in hero section
      if (!isInHeroSection() || isScrolling) return;

      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const diffY = touchY - touchStartY;
      const diffX = touchX - touchStartX;

      // If primarily vertical movement and downward swipe
      if (Math.abs(diffY) > Math.abs(diffX) && diffY < -10) {
        isTouchMoving = true;
        // Prevent default only for significant vertical scrolls to avoid interrupting other touch interactions
        if (Math.abs(diffY) > 30) {
          e.preventDefault();
        }
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      // Only handle touch end if in hero section and not currently scrolling
      if (!isInHeroSection() || isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchEndY - touchStartY;

      // Only trigger section change if we detected movement in touchMove
      // and if the swipe was significant enough
      if (isTouchMoving && touchDiff < -30) {
        e.preventDefault();
        scrollToNextSection();
      }

      isTouchMoving = false;
    }

    // Keyboard navigation from hero section
    function handleKeyDown(e: KeyboardEvent) {
      // Only handle keyboard when in hero section and not currently scrolling
      if (!isInHeroSection() || isScrolling) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "Space") {
        e.preventDefault();
        scrollToNextSection();
      }
    }

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false, // Need non-passive to call preventDefault()
    });
    document.addEventListener("touchend", handleTouchEnd, {
      passive: false, // Need non-passive to call preventDefault()
    });

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return containerRef;
};
