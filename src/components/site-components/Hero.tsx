import React from "react";

export function Hero() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-archivo-black mb-6 sm:mb-10 tracking-tighter uppercase text-left overflow-hidden flex flex-col">
          <span className="inline-block">Valtteri</span>
          <span className="inline-block">Savonen</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-16 max-w-3xl text-left">
          Building stuff with code.
        </p>
      </div>
    </div>
  );
}
