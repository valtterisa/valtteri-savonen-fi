import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1
          className={`${isMobile ? "text-5xl sm:text-6xl" : "text-6xl md:text-8xl lg:text-9xl"} font-archivo-black mb-6 sm:mb-10 tracking-tighter uppercase text-left overflow-hidden flex flex-col`}
        >
          <span className="inline-block">Valtteri</span>
          <span className="inline-block">Savonen</span>
        </h1>

        <p
          className={`${isMobile ? "text-lg sm:text-xl" : "text-xl md:text-2xl lg:text-3xl"} text-gray-300 mb-8 sm:mb-16 max-w-3xl text-left`}
        >
          Building stuff with code.
        </p>

        <div className="flex flex-wrap gap-4 sm:gap-6">
          <Link
            to="/contact"
            className={`uppercase ${isMobile ? "px-6 py-3 text-base" : "px-8 md:px-10 py-4 md:py-5 text-xl md:text-2xl"} border-2 border-white hover:bg-white hover:text-black transition-colors font-archivo tracking-wide`}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
