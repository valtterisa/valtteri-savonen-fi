export function Hero() {
  return (
    <section id="hero" className="min-h-dvh flex items-center relative">
      <div className="section w-full px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-10 tracking-tighter uppercase text-center overflow-hidden flex flex-col">
            <span className="inline-block">Valtteri</span>
            <span className="inline-block">Savonen</span>
          </h1>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="rounded-xl shadow-lg">
              <blockquote className="text-center">
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  <span className="font-serif">"</span>
                  Everything is figureoutable.
                  <span className="font-serif">"</span>
                </p>
                <footer className="text-gray-300 font-medium mt-2">
                  <span className="font-bold">- someone smart probably</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center animate-pulse">
        <span className="text-gray-300 text-sm mb-2">Scroll Down</span>
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
