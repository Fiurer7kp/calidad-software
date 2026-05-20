import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "../hooks/useAudio";

interface SubItem {
  label: string;
  route: string;
  emoji: string;
}

interface Section {
  id: string;
  label: string;
  emoji: string;
  gradient: string;
  activeBg: string;
  activeText: string;
  dot: string;
  items: SubItem[];
}

const sections: Section[] = [
  {
    id: "matematicas",
    label: "Matemáticas",
    emoji: "🔢",
    gradient: "from-blue-600 to-indigo-700",
    activeBg: "bg-blue-700/30",
    activeText: "text-blue-300",
    dot: "text-blue-400",
    items: [
      { label: "Figuras 3D", route: "/matematicas/descomposicion", emoji: "🧊" },
    ],
  },
  {
    id: "ciencias-naturales",
    label: "Ciencias Naturales",
    emoji: "🌿",
    gradient: "from-teal-600 to-cyan-700",
    activeBg: "bg-teal-700/30",
    activeText: "text-teal-300",
    dot: "text-teal-400",
    items: [
      { label: "Ciclo del Agua", route: "/ciencias-naturales", emoji: "💧" },
    ],
  },
  {
    id: "ciencias-sociales",
    label: "Ciencias Sociales",
    emoji: "🌍",
    gradient: "from-amber-500 to-orange-600",
    activeBg: "bg-amber-700/30",
    activeText: "text-amber-300",
    dot: "text-amber-400",
    items: [
      { label: "Nuestro Planeta", route: "/ciencias-sociales", emoji: "🗺️" },
    ],
  },
  {
    id: "lenguaje",
    label: "Lenguaje",
    emoji: "📖",
    gradient: "from-rose-500 to-pink-600",
    activeBg: "bg-rose-700/30",
    activeText: "text-rose-300",
    dot: "text-rose-400",
    items: [
      { label: "Lectura y Comprensión", route: "/lenguaje", emoji: "📝" },
    ],
  },
  {
    id: "historia",
    label: "Historia",
    emoji: "⏳",
    gradient: "from-violet-600 to-purple-700",
    activeBg: "bg-violet-700/30",
    activeText: "text-violet-300",
    dot: "text-violet-400",
    items: [
      { label: "Línea del Tiempo", route: "/historia", emoji: "🏛️" },
    ],
  },
  {
    id: "logica",
    label: "Lógica",
    emoji: "🧩",
    gradient: "from-emerald-500 to-green-600",
    activeBg: "bg-emerald-700/30",
    activeText: "text-emerald-300",
    dot: "text-emerald-400",
    items: [
      { label: "Puzzles y Patrones", route: "/logica", emoji: "🎯" },
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );

  const toggle = (id: string) => {
    audio.click();
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className="hidden md:flex flex-col w-[252px] min-h-0 bg-[#1a1f3c] border-r border-slate-700/60"
      aria-label="Menú de materias"
    >
      {/* Top label */}
      <div className="px-4 py-3.5 border-b border-slate-700/60">
        <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
          📖 Materias
        </p>
      </div>

      <nav
        className="flex-1 overflow-y-auto p-3 space-y-2"
        aria-label="Navegación de materias"
      >
        {sections.map((sec) => (
          <div key={sec.id}>
            {/* Section header button */}
            <button
              onClick={() => toggle(sec.id)}
              aria-expanded={open[sec.id]}
              aria-controls={`section-${sec.id}`}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-700/40 transition group focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br ${sec.gradient} text-base shadow-md group-hover:scale-110 transition-transform`}
                  aria-hidden="true"
                >
                  {sec.emoji}
                </span>
                <span className="font-black text-sm text-slate-200 group-hover:text-white transition-colors">
                  {sec.label}
                </span>
              </span>
              <motion.span
                animate={{ rotate: open[sec.id] ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-slate-500 text-xs"
                aria-hidden="true"
              >
                ▼
              </motion.span>
            </button>

            {/* Sub-items */}
            <AnimatePresence initial={false}>
              {open[sec.id] && (
                <motion.div
                  id={`section-${sec.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden pl-3 mt-0.5 space-y-0.5"
                >
                  {sec.items.map((item) => (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      onClick={() => audio.click()}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          isActive
                            ? `${sec.activeBg} ${sec.activeText} shadow-sm`
                            : "text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
                        }`
                      }
                    >
                      <span className="text-base" aria-hidden="true">{item.emoji}</span>
                      <span className="flex-1">{item.label}</span>
                      <span className={`${sec.dot} text-xs`} aria-hidden="true">›</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Docente link */}
        <div className="pt-2 border-t border-slate-700/40 mt-2">
          <NavLink
            to="/docente"
            onClick={() => audio.click()}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                isActive
                  ? "bg-purple-700/30 text-purple-300 shadow-sm"
                  : "text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
              }`
            }
          >
            <span className="text-base" aria-hidden="true">👩‍🏫</span>
            <span className="flex-1">Panel Docente</span>
            <span className="text-slate-500 text-xs" aria-hidden="true">›</span>
          </NavLink>
        </div>
      </nav>

      {/* Footer mascot */}
      <div className="px-4 py-4 border-t border-slate-700/60">
        <div
          className="flex items-center gap-2 bg-yellow-950/40 border border-yellow-700/40 rounded-xl px-3 py-2"
          aria-label="Profe Búho te guía en cada lección"
        >
          <motion.span
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-2xl select-none"
            aria-hidden="true"
          >
            🦉
          </motion.span>
          <p className="text-[11px] text-yellow-300 font-bold leading-snug">
            Profe Búho te guía
            <br />
            <span className="text-yellow-500 font-semibold">en cada lección</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
