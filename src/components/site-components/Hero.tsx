export function Hero() {
  return (
    <section id="hero" className="section h-dvh flex items-center">
      <div className="section w-full px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-archivo-black mb-6 sm:mb-10 tracking-tighter uppercase text-center overflow-hidden flex flex-col">
            <span className="inline-block">Valtteri</span>
            <span className="inline-block">Savonen</span>
          </h1>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="rounded-xl shadow-lg">
              <blockquote className="text-center">
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  <span className="font-serif">"</span>
                  Your time is limited, so don't waste it living someone else's
                  life.
                  <span className="font-serif">"</span>
                </p>
                <footer className="text-gray-300 font-medium mt-2">
                  <span className="font-bold">- Steve Jobs</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
