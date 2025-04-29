import { useEffect, useRef, useState } from "react";

/**
 * A custom hook for smooth section-by-section scrolling using GSAP
 * Shows one section at a time with smooth transitions
 * Optimized for both desktop and mobile
 */
export const useSectionScrolling = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Avoid running on server
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize to update mobile state
    window.addEventListener("resize", checkMobile);

    // Dynamic import to avoid SSR issues
    const setupScrolling = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const ScrollToPlugin = await import("gsap/ScrollToPlugin");

      // Register plugins
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin.default);

      // Get all sections within the container
      const sections = gsap.utils.toArray<HTMLElement>(".section");

      // Skip if no sections found
      if (!sections.length) return;

      // Enable regular scrolling
      document.body.style.overflow = "auto";

      // Create scroll triggers for each section
      sections.forEach((section, index) => {
        // Skip the first section - it's already visible
        if (index === 0) {
          // Ensure first section is fully visible
          gsap.set(section, { autoAlpha: 1, y: 0 });
          return;
        }

        // Set initial state for other sections
        gsap.set(section, { autoAlpha: 0, y: 100 });

        // Create a scroll trigger for each section
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=100",
          end: "bottom top+=100",
          markers: false,
          onEnter: () => {
            // Animate section in when scrolled to
            gsap.to(section, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
            setCurrentSection(index);
          },
          onLeaveBack: () => {
            // Animate section out when scrolled past (upward)
            gsap.to(section, {
              autoAlpha: 0,
              y: 100,
              duration: 0.5,
              ease: "power2.in",
              overwrite: "auto",
            });
            setCurrentSection(index - 1);
          },
        });
      });

      // Track scroll accumulation to require more deliberate scrolling
      let scrollAccumulator = 0;
      // Use smaller threshold on mobile for easier scrolling
      const getScrollThreshold = () => (isMobile ? 80 : 150);
      let isTransitioning = false;
      let lastScrollTime = 0;
      const SCROLL_TIMEOUT = 300; // Reset accumulator after this many ms of no scrolling

      // Add wheel event to help with smoother scrolling
      const handleWheel = (e: WheelEvent) => {
        // Always prevent default to take full control of scrolling
        e.preventDefault();

        // Reset accumulator if enough time has passed between scroll events
        const now = Date.now();
        if (now - lastScrollTime > SCROLL_TIMEOUT) {
          scrollAccumulator = 0;
        }
        lastScrollTime = now;

        // Skip if currently transitioning between sections
        if (isTransitioning) return;

        // Add to accumulator based on scroll amount
        scrollAccumulator += Math.abs(e.deltaY);

        // Only move to next section when accumulator exceeds threshold
        if (scrollAccumulator > getScrollThreshold()) {
          scrollAccumulator = 0; // Reset accumulator

          // Calculate new section index based on scroll direction
          const newIndex =
            e.deltaY > 0
              ? Math.min(currentSection + 1, sections.length - 1)
              : Math.max(currentSection - 1, 0);

          // If we're changing sections, animate to it
          if (newIndex !== currentSection) {
            isTransitioning = true;

            gsap.to(window, {
              duration: isMobile ? 0.7 : 0.9, // Faster on mobile
              scrollTo: { y: sections[newIndex], offsetY: 0 },
              ease: "power2.inOut",
              onComplete: () => {
                isTransitioning = false;
                setCurrentSection(newIndex);
              },
            });
          }
        }
      };

      // Track touch position for swipe detection
      let touchStartY = 0;
      let touchStartX = 0;
      let touchMoved = false;
      // Lower threshold on mobile for easier swiping
      const getTouchThreshold = () => (isMobile ? 60 : 80);

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      };

      // Special handling for touch move - we need to detect horizontal scrolling
      // and only prevent default for vertical scrolling
      const handleTouchMove = (e: TouchEvent) => {
        if (!touchMoved) {
          const touchY = e.touches[0].clientY;
          const touchX = e.touches[0].clientX;
          const deltaY = touchY - touchStartY;
          const deltaX = touchX - touchStartX;

          // If vertical scrolling is dominant, prevent default
          if (Math.abs(deltaY) > Math.abs(deltaX)) {
            e.preventDefault();
            touchMoved = true;
          }
        } else {
          e.preventDefault();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (isTransitioning) return;

        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const touchDiffY = touchEndY - touchStartY;
        const touchDiffX = touchEndX - touchStartX;

        // Only proceed if vertical swipe was dominant and long enough
        if (
          Math.abs(touchDiffY) < getTouchThreshold() ||
          Math.abs(touchDiffX) > Math.abs(touchDiffY)
        )
          return;

        // Calculate new section based on swipe direction (negative = swipe up)
        const newIndex =
          touchDiffY < 0
            ? Math.min(currentSection + 1, sections.length - 1)
            : Math.max(currentSection - 1, 0);

        // If we're changing sections, animate to it
        if (newIndex !== currentSection) {
          isTransitioning = true;

          gsap.to(window, {
            duration: isMobile ? 0.7 : 0.9, // Faster on mobile
            scrollTo: { y: sections[newIndex], offsetY: 0 },
            ease: "power2.inOut",
            onComplete: () => {
              isTransitioning = false;
              setCurrentSection(newIndex);
            },
          });
        }
      };

      // Add touch event handlers
      document.addEventListener("touchstart", handleTouchStart, { passive: true });
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });

      // Conditionally add wheel event listener only on desktop
      window.addEventListener("wheel", handleWheel, { passive: false });

      // Make the content navigable by keyboard
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isTransitioning) return;

        // Arrow keys for navigation
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowRight" ||
          e.key === "PageDown"
        ) {
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            isTransitioning = true;
            const nextSection = sections[currentSection + 1];
            gsap.to(window, {
              duration: isMobile ? 0.7 : 0.9, // Faster on mobile
              scrollTo: { y: nextSection, offsetY: 0 },
              ease: "power2.inOut",
              onComplete: () => {
                isTransitioning = false;
                setCurrentSection(currentSection + 1);
              },
            });
          }
        } else if (
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "PageUp"
        ) {
          e.preventDefault();
          if (currentSection > 0) {
            isTransitioning = true;
            const prevSection = sections[currentSection - 1];
            gsap.to(window, {
              duration: isMobile ? 0.7 : 0.9, // Faster on mobile
              scrollTo: { y: prevSection, offsetY: 0 },
              ease: "power2.inOut",
              onComplete: () => {
                isTransitioning = false;
                setCurrentSection(currentSection - 1);
              },
            });
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Clean up
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", checkMobile);
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.body.style.overflow = "";
      };
    };

    // Execute and store the cleanup function
    const cleanupPromise = setupScrolling();

    return () => {
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };
  }, [currentSection, isMobile]);

  return containerRef;
};
