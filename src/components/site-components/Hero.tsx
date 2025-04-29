export function Hero() {
  return (
    <div className="section w-full px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-archivo-black mb-6 sm:mb-10 tracking-tighter uppercase text-center overflow-hidden flex flex-col">
          <span className="inline-block">Valtteri</span>
          <span className="inline-block">Savonen</span>
        </h1>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white-100/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg">
            <blockquote className="text-center">
              <p className="text-lg sm:text-2xl leading-relaxed mb-3 text-gray-200 font-light">
                <span className="text-gray-400 font-serif">"</span>
                Your time is limited, so don't waste it living someone else's
                life.
                <span className="text-gray-400 font-serif">"</span>
              </p>
              <footer className="text-gray-300 font-medium mt-2">
                <span className="font-bold">Steve Jobs</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
