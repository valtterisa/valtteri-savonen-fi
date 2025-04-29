import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/site-components/Hero";
import { ThreeBackground } from "../components/site-components/ThreeBackground";
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
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
