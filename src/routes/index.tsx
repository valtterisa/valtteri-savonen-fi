import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/site-components/Hero";
import { ThreeBackground } from "../components/site-components/BackgroundAnimation";
import { Contact } from "~/components/site-components/Contact";
import { About } from "~/components/site-components/About";
import { Currently } from "~/components/site-components/Currently";
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
      <Currently />
      <Contact />
    </div>
  );
}
