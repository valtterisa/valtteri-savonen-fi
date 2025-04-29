import { useEffect, useState } from "react";

export function About() {
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
      <div className="w-full max-w-7xl mx-auto">
        {/* Add extra padding at the top on mobile to ensure title visibility */}
        <h2
          className={`${isMobile ? "text-3xl sm:text-4xl pt-6" : "text-4xl md:text-5xl"} font-bold mb-6 sm:mb-10 md:mb-16`}
        >
          About Me
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p
              className={`${isMobile ? "text-base sm:text-lg" : "text-lg md:text-xl"} text-gray-300 mb-6 sm:mb-8`}
            >
              I'm a passionate developer with expertise in modern web
              technologies. With a strong foundation in both frontend and
              backend development, I create seamless, user-focused applications.
            </p>
            <p
              className={`${isMobile ? "text-base sm:text-lg" : "text-lg md:text-xl"} text-gray-300`}
            >
              My approach combines technical precision with creative
              problem-solving, resulting in elegant solutions that meet
              real-world needs.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            <div className="border border-gray-800 p-4 sm:p-6 md:p-8">
              <h3
                className={`${isMobile ? "text-lg sm:text-xl" : "text-xl md:text-2xl"} font-medium mb-3 sm:mb-4 md:mb-6`}
              >
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span
                  className={`${isMobile ? "px-2 py-1 text-sm" : "px-3 md:px-4 py-1 md:py-2"} border border-gray-700 text-gray-300`}
                >
                  React
                </span>
                <span
                  className={`${isMobile ? "px-2 py-1 text-sm" : "px-3 md:px-4 py-1 md:py-2"} border border-gray-700 text-gray-300`}
                >
                  TypeScript
                </span>
                <span
                  className={`${isMobile ? "px-2 py-1 text-sm" : "px-3 md:px-4 py-1 md:py-2"} border border-gray-700 text-gray-300`}
                >
                  Tailwind
                </span>
              </div>
            </div>
            <div className="border border-gray-800 p-4 sm:p-6 md:p-8">
              <h3
                className={`${isMobile ? "text-lg sm:text-xl" : "text-xl md:text-2xl"} font-medium mb-3 sm:mb-4 md:mb-6`}
              >
                Backend
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span
                  className={`${isMobile ? "px-2 py-1 text-sm" : "px-3 md:px-4 py-1 md:py-2"} border border-gray-700 text-gray-300`}
                >
                  Node.js
                </span>
                <span
                  className={`${isMobile ? "px-2 py-1 text-sm" : "px-3 md:px-4 py-1 md:py-2"} border border-gray-700 text-gray-300`}
                >
                  Express
                </span>
                <span
                  className={`${isMobile ? "px-2 py-1 text-sm" : "px-3 md:px-4 py-1 md:py-2"} border border-gray-700 text-gray-300`}
                >
                  MongoDB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
