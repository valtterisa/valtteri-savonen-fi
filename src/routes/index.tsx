import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/site-components/Hero";
import { ThreeBackground } from "../components/site-components/ThreeBackground";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { Contact } from "~/components/site-components/Contact";
import { About } from "~/components/site-components/About";
import { useSectionScrolling } from "~/utils/useSectionScrolling";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useSectionScrolling();

  return (
    <div ref={containerRef} className="bg-black text-white relative">
      <ThreeBackground />

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-24 right-6 z-30 p-3 bg-black/80 backdrop-blur-md border border-gray-800 rounded-full"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>

      {/* Sections */}
      <div id="hero" className="section h-screen flex items-center">
        <Hero />
      </div>

      <div id="about" className="section h-screen flex items-center">
        <About />
      </div>

      <div id="contact" className="section h-screen flex items-center">
        <Contact />
      </div>
    </div>
  );
}
