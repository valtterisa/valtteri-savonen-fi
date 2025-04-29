import { useEffect, useRef } from "react";

// Types for GSAP
type GSAPTimeline = any;
type GSAPVars = any;
interface ScrollTriggerVars {
  trigger: Element;
  start?: string;
  end?: string;
  markers?: boolean;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  snap?: number | object;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

type AnimationOptions = {
  pin?: boolean;
  snap?: boolean;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  markers?: boolean;
  animationType?:
    | "fadeUp"
    | "fadeIn"
    | "scaleUp"
    | "slideInLeft"
    | "slideInRight"
    | "custom";
  ease?: string;
  toggleActions?: string;
  pinSpacing?: boolean;
};

type CustomAnimationProps = {
  from: GSAPVars;
  to: GSAPVars;
};

export const useGsapAnimation = (options: AnimationOptions = {}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const addToElementsRef = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const getAnimationProps = (): CustomAnimationProps => {
    switch (options.animationType) {
      case "fadeIn":
        return {
          from: { opacity: 0 },
          to: { opacity: 1 },
        };
      case "scaleUp":
        return {
          from: { opacity: 0, scale: 0.8 },
          to: { opacity: 1, scale: 1 },
        };
      case "slideInLeft":
        return {
          from: { opacity: 0, x: -100 },
          to: { opacity: 1, x: 0 },
        };
      case "slideInRight":
        return {
          from: { opacity: 0, x: 100 },
          to: { opacity: 1, x: 0 },
        };
      case "fadeUp":
      default:
        return {
          from: { opacity: 0, y: 100 },
          to: { opacity: 1, y: 0 },
        };
    }
  };

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const elements = elementsRef.current;

    if (!section || elements.length === 0) return;

    let timeline: GSAPTimeline | null = null;
    let scrollTriggerInstance: any = null;

    // Dynamically import GSAP on the client side only
    const initAnimation = async () => {
      try {
        // Import GSAP and ScrollTrigger dynamically
        const gsapModule = await import("gsap");
        const { gsap } = gsapModule;
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");
        const { ScrollTrigger } = ScrollTriggerModule;

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // For full-screen sections, make sure the height is correct
        if (options.pin) {
          gsap.set(section, { height: window.innerHeight });

          window.addEventListener("resize", () => {
            gsap.set(section, { height: window.innerHeight });
          });
        }

        const animProps = getAnimationProps();

        // Pre-hide all elements
        gsap.set(elements, animProps.from);

        // Create the timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: options.start || "top top",
            end: options.end || "bottom top",
            markers: options.markers || false,
            pin: options.pin !== undefined ? options.pin : true,
            pinSpacing:
              options.pinSpacing !== undefined ? options.pinSpacing : true,
            snap: options.snap ? 1 : false,
            toggleActions: options.toggleActions || "play none none reverse",
          } as ScrollTriggerVars,
        });

        // Add the animation for all elements
        tl.to(elements, {
          ...animProps.to,
          duration: options.duration || 1,
          stagger: options.stagger || 0.2,
          ease: options.ease || "power2.out",
          clearProps: "transform",
        });

        timeline = tl;

        // Store a reference to the ScrollTrigger instance
        const triggers = ScrollTrigger.getAll();
        scrollTriggerInstance = triggers[triggers.length - 1];

        timelineRef.current = tl;
      } catch (error) {
        console.error("Error initializing GSAP animation:", error);
      }
    };

    // Initialize the animation
    initAnimation();

    // Cleanup function
    return () => {
      if (timeline) {
        timeline.kill();
      }

      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      } else {
        // Alternative cleanup method that doesn't rely on stored references
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars.trigger === section) {
              trigger.kill();
            }
          });
        });
      }
    };
  }, [options]);

  return {
    sectionRef,
    addToElementsRef,
    timeline: timelineRef.current,
  };
};
