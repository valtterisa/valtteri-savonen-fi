import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Menu */}
      <header
        className="hidden md:flex fixed left-0 top-0 h-full bg-black text-white transition-all duration-300 z-40 border-r"
        style={{ width: isMenuOpen ? "280px" : "80px" }}
      >
        {/* Hamburger button for desktop */}
        <div className="p-6">
          <button
            onClick={toggleMenu}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div
            className={`transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Link
              to="/"
              className="text-5xl font-archivo-black mt-10 mb-16 block tracking-tighter"
            >
              VS
            </Link>
            <nav className="flex flex-col space-y-8 mt-16">
              <Link
                to="/info"
                className="text-3xl hover:text-gray-400 transition-colors font-archivo uppercase tracking-wide"
              >
                Info
              </Link>
              <Link
                to="/contact"
                className="text-3xl hover:text-gray-400 transition-colors font-archivo uppercase tracking-wide"
              >
                Contact
              </Link>
            </nav>

            <div className="flex space-x-6 mt-20">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <Github className="w-7 h-7" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <Linkedin className="w-7 h-7" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <Mail className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Mobile Menu Button at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 flex justify-center items-center h-16 z-50">
        <button
          onClick={toggleMenu}
          className="text-white p-3"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu Popup */}
      <div
        className={`md:hidden fixed left-0 w-full bg-black z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "bottom-16" : "-bottom-full"
        }`}
      >
        <div className="p-8 flex flex-col items-center">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-archivo-black mb-8 block tracking-tighter"
          >
            VS
          </Link>
          <nav className="flex flex-col space-y-6 items-center mb-8">
            <Link
              to="/info"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl hover:text-gray-400 transition-colors font-archivo uppercase tracking-wide"
            >
              Info
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl hover:text-gray-400 transition-colors font-archivo uppercase tracking-wide"
            >
              Contact
            </Link>
          </nav>

          <div className="flex space-x-8 mb-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-white hover:text-gray-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
