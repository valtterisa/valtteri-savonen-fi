import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Contact() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 md:mb-16 uppercase">
          Contact
        </h2>

        <div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 md:mb-12">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to collaborate.
          </p>

          <div className="space-y-6 sm:space-y-8">
            <a
              href="mailto:hello@valtterisavonen.fi"
              className="flex items-center space-x-4 group hover:text-gray-400 transition-colors"
            >
              <div className="border border-gray-700 p-3 sm:p-4 group-hover:border-gray-400 transition-colors">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl">
                hello@valtterisavonen.fi
              </span>
            </a>

            <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 pt-4">
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:text-gray-400 transition-colors"
              >
                <div className="border border-gray-700 p-3 sm:p-4 group-hover:border-gray-400 transition-colors">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg md:text-xl">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:text-gray-400 transition-colors"
              >
                <div className="border border-gray-700 p-3 sm:p-4 group-hover:border-gray-400 transition-colors">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg md:text-xl">
                  LinkedIn
                </span>
              </a>

              <a
                href="https://x.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:text-gray-400 transition-colors"
              >
                <div className="border border-gray-700 p-3 sm:p-4 group-hover:border-gray-400 transition-colors">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg md:text-xl">X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
