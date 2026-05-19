/**
 * @copyright 2025 i-bee-k
 * @license Apache-2.0
 */

/**
 * Nodes modules
 */
import { useState } from "react";

/**
 * Components
 */
import Navbar from "./Navbar";
import ThemeSelector from "./ThemeSelector";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-zinc-50/70 dark:bg-zinc-900/70 backdrop-blur-lg border-b border-zinc-200 dark:border-white/5">
      <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
        <h1>
          <a href="/" className="logo">
            <img
              src="/images/ibkod-logo.png"
              width={40}
              height={40}
              alt="Ibukun Obideyi"
            />
          </a>
        </h1>
        <div className="relative flex items-center gap-3 md:justify-self-center">
          <div className="md:hidden">
            <ThemeSelector />
          </div>
          <button
            className="menu-btn md:hidden text-zinc-900 dark:text-zinc-50"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span className="material-symbols-rounded text-[18px]">
              {navOpen ? "close" : "menu"}
            </span>
          </button>
          <Navbar navOpen={navOpen} closeNav={() => setNavOpen(false)} />
        </div>
        <div className="flex items-center gap-4 md:justify-self-end max-md:hidden">
          <ThemeSelector />
          <a
            href="#contact"
            className="btn btn-secondary"
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
