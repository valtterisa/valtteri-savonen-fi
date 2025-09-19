import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-16 h-14 flex items-center justify-center">
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link
            to="/"
            activeProps={{ className: "text-white" }}
            className="text-gray-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/thoughts"
            activeProps={{ className: "text-white" }}
            className="text-gray-300 hover:text-white"
          >
            Thoughts
          </Link>
        </nav>
        <button
          aria-label="Toggle menu"
          className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-zinc-800 hover:bg-zinc-900"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            ></span>
          </div>
        </button>
      </div>
      {open ? (
        <div className="sm:hidden border-t border-zinc-900/70">
          <div className="px-4 py-3 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/thoughts"
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              Thoughts
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
