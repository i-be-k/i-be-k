import { useEffect, useState, useRef } from "react";

const ThemeSelector = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    root.classList.remove("light", "dark");

    let activeTheme = theme;
    if (theme === "system") {
      activeTheme = mediaQuery.matches ? "dark" : "light";
    }

    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system changes if system mode is active
  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const getIcon = (mode) => {
    if (mode === "light") return "light_mode";
    if (mode === "dark") return "dark_mode";
    return "contrast";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-btn text-zinc-900 dark:text-zinc-50"
        title="Theme Selector"
      >
        <span className="material-symbols-rounded text-[18px]">
          {getIcon(theme)}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 md:left-0 md:right-auto min-w-32 p-1 bg-white dark:bg-zinc-800 rounded-xl ring-1 ring-zinc-900/5 dark:ring-zinc-50/10 shadow-lg backdrop-blur-md z-50">
          <button
            onClick={() => selectTheme("light")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'light' ? 'bg-zinc-100 dark:bg-zinc-700 text-sky-500' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50'}`}
          >
            <span className="material-symbols-rounded text-[18px]">light_mode</span>
            Light
          </button>
          <button
            onClick={() => selectTheme("dark")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mt-1 ${theme === 'dark' ? 'bg-zinc-100 dark:bg-zinc-700 text-sky-500' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50'}`}
          >
            <span className="material-symbols-rounded text-[18px]">dark_mode</span>
            Dark
          </button>
          <button
            onClick={() => selectTheme("system")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mt-1 ${theme === 'system' ? 'bg-zinc-100 dark:bg-zinc-700 text-sky-500' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50'}`}
          >
            <span className="material-symbols-rounded text-[18px]">contrast</span>
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
