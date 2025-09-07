import { Github, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="min-h-dvh flex flex-col">
      <div className="flex-grow flex items-center">
        <div className="w-full px-4 sm:px-8 md:px-16">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-center uppercase text-3xl sm:text-4xl md:text-6xl pt-6 md:pt-0 font-bold mb-6 sm:mb-10 md:mb-16 uppercase tracking-wide">
              Contact
            </h2>
            <div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-10 md:mb-12">
              <img
                src="/my-x-profile-pic.jpg"
                alt="Profile picture of Valtteri Savonen"
                className="rounded-full object-cover w-36 h-36 md:w-48 md:h-48 shadow-lg z-10"
                loading="eager"
              />
              <p className="text-gray-300 pt-2 text-sm">(this is me!)</p>
            </div>
            <div className="space-y-4 text-center text-base sm:text-lg md:text-xl text-gray-300">
              <p>Any inquiries, collaborations, or just want to talk?</p>

              <a
                href="mailto:savonen.emppu@gmail.com"
                className="underline inline-block hover:text-gray-400 transition-colors"
                rel="noopener noreferrer"
              >
                savonen.emppu@gmail.com
              </a>

              <div className="flex space-x-6 justify-center pt-6">
                <a
                  href="https://x.com/vvaltterisa"
                  className="text-white hover:text-gray-400 transition-colors"
                  title="X / Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 512 462.799"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/valtterisa"
                  className="text-white hover:text-gray-400 transition-colors"
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/valtterisavonen/"
                  className="text-white hover:text-gray-400 transition-colors"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full mt-auto">
        <div className="w-full px-4 sm:px-8 md:px-16">
          <div className="max-w-7xl mx-auto text-center py-6">
            <p className="text-sm sm:text-base text-gray-300 flex items-center justify-center gap-1">
              Made with
              <img
                src="/tanstack.png"
                width={20}
                height={20}
                alt="TanStack Start Logo"
              />
              <a
                className="pr-1 font-bold hover:underline"
                href="https://tanstack.com/start/latest"
                target="_blank"
                rel="noopener noreferrer"
              >
                TanStack{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                  Start
                </span>
              </a>{" "}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
