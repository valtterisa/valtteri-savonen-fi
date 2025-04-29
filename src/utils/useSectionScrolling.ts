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

    // Improved scroll back to hero section with optimized animation
    function scrollToHeroSection() {
      if (isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime < 100) return; // Prevent rapid fire scrolls
      lastScrollTime = now;

      isScrolling = true;

      // Temporarily disable scrolling during transition
      document.body.style.overflow = "hidden";

      // Use a shorter duration for scrolling back to top for better responsiveness
      const backToTopDuration = 700;

      // Use requestAnimationFrame for smoother animation
      const startTime = performance.now();
      const startPosition = window.scrollY;

      function animateScroll(currentTime: any) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / backToTopDuration, 1);

        // Use easeOutQuart for a fast start and smooth finish
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const newPosition = startPosition * (1 - easeOut);

        window.scrollTo(0, newPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // Ensure we're exactly at the top
          window.scrollTo(0, 0);

          // Reset scrolling state
          setTimeout(() => {
            isScrolling = false;
            document.body.style.overflow = "";
          }, 50);
        }
      }

      requestAnimationFrame(animateScroll);
    }

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

    // Check if we're near the top of the second section (for back-to-top detection)
    function isNearTopOfNextSection() {
      const scrollPosition = window.scrollY;
      const nextSectionTop = nextSection.offsetTop;

      // Consider "near top" if within 25% of the viewport height from the section start
      const threshold = window.innerHeight * 0.25;
      return (
        scrollPosition >= nextSectionTop &&
        scrollPosition <= nextSectionTop + threshold
      );
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
      // If already scrolling, ignore the event
      if (isScrolling) return;

      // Going down from hero section
      if (isInHeroSection()) {
        if (e.deltaY > 10) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
      // Going up from next section back to hero
      else if (isNearTopOfNextSection() && e.deltaY < -10) {
        e.preventDefault();
        scrollToHeroSection();
      }
    }

    // Touch handling for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchMoving = false;

    function handleTouchStart(e: TouchEvent) {
      // Track touch start in both hero section and near top of next section
      if (isInHeroSection() || isNearTopOfNextSection()) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        isTouchMoving = false;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      // Ignore if already scrolling
      if (isScrolling) return;

      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const diffY = touchY - touchStartY;
      const diffX = touchX - touchStartX;

      // If primarily vertical movement
      if (Math.abs(diffY) > Math.abs(diffX)) {
        isTouchMoving = true;

        // In hero section, handle downward swipes
        if (isInHeroSection() && diffY < -10) {
          // Prevent default only for significant vertical scrolls
          if (Math.abs(diffY) > 30) {
            e.preventDefault();
          }
        }
        // Near top of next section, handle upward swipes
        else if (isNearTopOfNextSection() && diffY > 10) {
          // Prevent default for significant upward swipes
          if (diffY > 30) {
            e.preventDefault();
          }
        }
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      // Ignore if already scrolling
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchEndY - touchStartY;

      // Only proceed if we detected movement
      if (isTouchMoving) {
        // In hero section, handle downward swipes
        if (isInHeroSection() && touchDiff < -30) {
          e.preventDefault();
          scrollToNextSection();
        }
        // Near top of next section, handle upward swipes
        else if (isNearTopOfNextSection() && touchDiff > 30) {
          e.preventDefault();
          scrollToHeroSection();
        }
      }

      isTouchMoving = false;
    }

    // Keyboard navigation
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if already scrolling
      if (isScrolling) return;

      // Navigate down from hero section
      if (isInHeroSection()) {
        if (
          e.key === "ArrowDown" ||
          e.key === "PageDown" ||
          e.key === "Space"
        ) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
      // Navigate up to hero from next section
      else if (isNearTopOfNextSection()) {
        if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home") {
          e.preventDefault();
          scrollToHeroSection();
        }
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
