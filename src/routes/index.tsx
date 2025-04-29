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
  const containerRef = useSectionScrolling();

  return (
    <div ref={containerRef} className="bg-black text-white relative w-full">
      <ThreeBackground />

      {/* Sections */}
      <section id="hero" className="section h-screen flex items-center">
        <Hero />
      </section>

      <section id="about" className="section h-screen flex items-center">
        <About />
      </section>

      <section id="contact" className="section h-screen flex items-center">
        <Contact />
      </section>
    </div>
  );
}
