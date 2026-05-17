import React, { useEffect } from "react";

const Navbar: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    if (saved) {
      root.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
  };

  return (
    <header className="h-14 sticky top-0 z-10 bg-[#1a1f3c] border-b border-slate-700">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo + Título */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-700 text-white font-bold text-sm shadow">
            S
          </div>
          <span className="text-white font-semibold text-sm md:text-base leading-tight">
            Mentes Pensantes{" "}
            <span className="text-slate-300 font-normal">
              — API para Niños · Sebastian Coral
            </span>
          </span>
        </div>

        {/* Botón tema */}
        <button
          type="button"
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 text-sm font-medium hover:bg-white transition"
        >
          Tema
        </button>
      </div>
    </header>
  );
};

export default Navbar;
