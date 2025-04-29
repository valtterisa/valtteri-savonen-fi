import { useEffect, useRef } from "react";

export const useSectionScrolling = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    );

    if (!sections.length) return;

    // Track if we're currently in a scroll transition
    let isScrolling = false;
    let lastScrollTop = window.scrollY;
    let lastScrollDirection = 0; // 0: none, 1: down, -1: up

    // Get the currently visible section based on scroll position
    function getCurrentSectionIndex() {
      const scrollPosition = window.scrollY;
      
      // For sections taller than the viewport, we need to determine
      // which section covers the majority of the viewport
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // If section is taller than viewport
        if (section.offsetHeight > window.innerHeight) {
          // If we're scrolled within this tall section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom - (window.innerHeight / 2)) {
            return i;
          }
        } else {
          // Standard section height check - use the midpoint of the viewport
          const viewportMidpoint = scrollPosition + (window.innerHeight / 2);
          if (viewportMidpoint >= sectionTop && viewportMidpoint < sectionBottom) {
            return i;
          }
        }
      }

      // If we're near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        return sections.length - 1;
      }

      return 0; // Default to first section
    }

    function scrollToSection(index: number) {
      if (index < 0 || index >= sections.length || isScrolling) return;

      isScrolling = true;
      const targetSection = sections[index];
      
      // For tall sections, we need special handling
      const targetPosition = targetSection.offsetTop;
      
      // If we're already in a tall section and moving within it, handle differently
      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === index && targetSection.offsetHeight > window.innerHeight) {
        // If already in the tall section, allow normal scrolling
        isScrolling = false;
        return;
      }

      // Smooth scroll to section
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }

    // Track scroll position to detect direction
    function handleScroll() {
      const currentScrollTop = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollTop > lastScrollTop) {
        lastScrollDirection = 1; // scrolling down
      } else if (currentScrollTop < lastScrollTop) {
        lastScrollDirection = -1; // scrolling up
      }
      
      lastScrollTop = currentScrollTop;
    }

    function handleWheel(e: WheelEvent) {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const currentIndex = getCurrentSectionIndex();

      // Determine scroll direction
      if (e.deltaY > 50 && currentIndex < sections.length - 1) {
        // Scrolling down - go to next section
        e.preventDefault();
        scrollToSection(currentIndex + 1);
      } else if (e.deltaY < -50 && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
      }
    }

    // Touch handling for mobile
    let touchStartY = 0;

    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchEndY - touchStartY;

      // Only respond to significant swipes
      if (Math.abs(touchDiff) < 70) return;

      const currentIndex = getCurrentSectionIndex();

      if (touchDiff < 0 && currentIndex < sections.length - 1) {
        // Swipe up - go to next section
        scrollToSection(currentIndex + 1);
      } else if (touchDiff > 0 && currentIndex > 0) {
        // Swipe down - go to previous section
        scrollToSection(currentIndex - 1);
      }
    }

    // Keyboard navigation
    function handleKeyDown(e: KeyboardEvent) {
      if (isScrolling) return;

      const currentIndex = getCurrentSectionIndex();

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (currentIndex < sections.length - 1) {
          e.preventDefault();
          scrollToSection(currentIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(currentIndex - 1);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSection(sections.length - 1);
      }
    }

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll);

    // Also scroll to sections when hash changes (for direct linking)
    function handleHashChange() {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const sectionIndex = sections.findIndex(
          (section) => section.id === hash
        );
        if (sectionIndex >= 0) {
          scrollToSection(sectionIndex);
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange);

    // Handle direct navigation to a hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return containerRef;
};
