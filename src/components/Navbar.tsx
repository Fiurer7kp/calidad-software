import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    setIsDark(next === "dark");
    document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
  };

  return (
    <header className="h-14 sticky top-0 z-10 bg-[#1a1f3c] border-b border-slate-700/80 shadow-lg">
      <div className="h-full px-4 flex items-center justify-between">

        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <motion.div
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 text-lg"
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            🦉
          </motion.div>
          <div className="leading-tight">
            <span className="text-white font-black text-sm md:text-base tracking-tight">
              Mentes Pensantes
            </span>
            <span className="hidden md:inline text-slate-400 font-semibold text-sm ml-2">
              — ¡Aprende y Diviértete!
            </span>
          </div>
        </div>

        {/* Theme toggle */}
        <motion.button
          type="button"
          onClick={toggleTheme}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-bold transition-colors"
        >
          <motion.span
            key={String(isDark)}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? "☀️" : "🌙"}
          </motion.span>
          <span className="hidden sm:inline">{isDark ? "Modo Claro" : "Modo Oscuro"}</span>
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
