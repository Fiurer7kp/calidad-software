import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StudentSelector from "./StudentSelector";
import { audio } from "../hooks/useAudio";

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [muted, setMuted] = useState(audio.muted());

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const dark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    setIsDark(next === "dark");
    document.dispatchEvent(
      new CustomEvent("theme:changed", { detail: { theme: next } })
    );
    audio.click();
  };

  const toggleMute = () => {
    const next = !muted;
    audio.setMuted(next);
    setMuted(next);
    if (!next) audio.click();
  };

  return (
    <header
      className="h-14 sticky top-0 z-10 bg-[#1a1f3c] border-b border-slate-700/80 shadow-lg"
      role="banner"
    >
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Ir al contenido principal
      </a>

      <div className="h-full px-4 flex items-center justify-between gap-2">
        {/* Logo + title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <motion.div
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 text-lg flex-shrink-0"
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            aria-hidden="true"
          >
            🦉
          </motion.div>
          <div className="leading-tight min-w-0">
            <span className="text-white font-black text-sm md:text-base tracking-tight">
              Mentes Pensantes
            </span>
            <span className="hidden md:inline text-slate-400 font-semibold text-sm ml-2">
              — ¡Aprende y Diviértete!
            </span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <StudentSelector />

          {/* Mute toggle */}
          <motion.button
            type="button"
            onClick={toggleMute}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            aria-label={muted ? "Activar sonido" : "Silenciar sonido"}
            aria-pressed={muted}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            aria-pressed={isDark}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <motion.span
              key={String(isDark)}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              {isDark ? "☀️" : "🌙"}
            </motion.span>
            <span className="hidden sm:inline">
              {isDark ? "Claro" : "Oscuro"}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
