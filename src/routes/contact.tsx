import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  useEffect(() => {
    // Import GSAP dynamically on the client side only
    const loadGsap = async () => {
      if (typeof window !== "undefined") {
        const gsap = (await import("gsap")).gsap;
        const ScrollToPlugin = await import("gsap/ScrollToPlugin");

        // Register the plugin
        gsap.registerPlugin(ScrollToPlugin.ScrollToPlugin);

        // Now use GSAP for scrolling
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: "#contact",
            offsetY: 0,
          },
          ease: "power3.inOut",
          onComplete: () => {
            // Optional: Highlight the contact form to draw attention
            gsap.fromTo(
              "#contact form",
              { boxShadow: "0 0 0 0px rgba(255,255,255,0)" },
              {
                boxShadow: "0 0 0 2px rgba(255,255,255,0.5)",
                duration: 1,
                repeat: 1,
                yoyo: true,
                ease: "power2.inOut",
              }
            );
          },
        });
      }
    };

    loadGsap();
  }, []);

  return <Navigate to="/#contact" replace />;
}
