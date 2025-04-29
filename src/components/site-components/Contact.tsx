import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function Contact() {
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
        <h2 className={`${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl md:text-5xl'} font-bold mb-6 sm:mb-10 md:mb-16`}>
          Contact
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p className={`${isMobile ? 'text-base sm:text-lg' : 'text-lg md:text-xl'} text-gray-300 mb-6 sm:mb-8 md:mb-10`}>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to collaborate.
            </p>
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="border border-gray-700 p-2 sm:p-3 md:p-4">
                  <Mail className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'}`} />
                </div>
                <span className={`${isMobile ? 'text-base sm:text-lg' : 'text-lg md:text-xl'}`}>
                  hello@valtterisavonen.fi
                </span>
              </div>
            </div>
          </div>
          <form className="space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <label
                htmlFor="name"
                className={`block mb-1.5 sm:mb-2 md:mb-3 ${isMobile ? 'text-base sm:text-lg' : 'text-lg md:text-xl'}`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full p-2.5 sm:p-3 md:p-4 bg-transparent border border-gray-800 focus:outline-none focus:border-gray-600 ${isMobile ? 'text-sm sm:text-base' : 'text-base'}`}
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block mb-1.5 sm:mb-2 md:mb-3 ${isMobile ? 'text-base sm:text-lg' : 'text-lg md:text-xl'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-2.5 sm:p-3 md:p-4 bg-transparent border border-gray-800 focus:outline-none focus:border-gray-600 ${isMobile ? 'text-sm sm:text-base' : 'text-base'}`}
                placeholder="Your email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className={`block mb-1.5 sm:mb-2 md:mb-3 ${isMobile ? 'text-base sm:text-lg' : 'text-lg md:text-xl'}`}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={isMobile ? 4 : 5}
                className={`w-full p-2.5 sm:p-3 md:p-4 bg-transparent border border-gray-800 focus:outline-none focus:border-gray-600 ${isMobile ? 'text-sm sm:text-base' : 'text-base'}`}
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full ${isMobile ? 'px-4 py-2.5 text-sm sm:text-base' : 'px-6 md:px-8 py-3 md:py-4 text-lg'} border border-white hover:bg-white hover:text-black transition-colors`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
