import { motion, useTransform } from "framer-motion";

export function Navbar({ currentSection, isScrolling }) {
  // Home: always visible, no border
  if (currentSection === "home") {
    return (
      <nav className="fixed top-4 left-1/2 -translate-0-x-1/2 flex gap-8 text-lg font-semibold bg-black/50 backdrop-blur-md px-6 py-3 rounded-full text-white shadow-lg z-50">
        <a href="#home" className="hover:text-red-400 transition">
          Home
        </a>
        <a href="#about" className="hover:text-red-400 transition">
          About
        </a>
        <a href="#design" className="hover:text-red-400 transition">
          Design
        </a>
        <a href="#project" className="hover:text-red-400 transition">
          Project
        </a>
        <a href="#footer" className="hover:text-red-400 transition">
          Contact
        </a>
      </nav>
    );
  }

  // other sections: show only while scrolling
  if (isScrolling) {
    return (
      <nav className="fixed top-4 left-1/2 -translate-0-x-1/2 flex gap-8 text-lg font-semibold bg-black/50 backdrop-blur-md px-6 py-3 rounded-full text-white shadow-lg z-50">
        <a href="#home" className="hover:text-red-400 transition">
          Home
        </a>
        <a href="#about" className="hover:text-red-400 transition">
          About
        </a>
        <a href="#design" className="hover:text-red-400 transition">
          Design
        </a>
        <a href="#project" className="hover:text-red-400 transition">
          Project
        </a>
        <a href="#footer" className="hover:text-red-400 transition">
          Contact
        </a>
      </nav>
    );
  }

  return null; // hidden when stopped at other sections
}
