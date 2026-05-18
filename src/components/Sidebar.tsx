import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
];

export default function Sidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    matematicas: true,
    "ciencias-naturales": true,
    "ciencias-sociales": true,
  });

  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="hidden md:flex flex-col w-[252px] min-h-0 bg-[#1a1f3c] border-r border-slate-700/60">

      {/* Top label */}
      <div className="px-4 py-3.5 border-b border-slate-700/60">
        <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
          📖 Materias
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {sections.map((sec) => (
          <div key={sec.id}>
            {/* Section header button */}
            <button
              onClick={() => toggle(sec.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-700/40 transition group"
            >
              <span className="flex items-center gap-2.5">
                {/* Color pill */}
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br ${sec.gradient} text-base shadow-md group-hover:scale-110 transition-transform`}
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
              >
                ▼
              </motion.span>
            </button>

            {/* Sub-items */}
            <AnimatePresence initial={false}>
              {open[sec.id] && (
                <motion.div
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
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          isActive
                            ? `${sec.activeBg} ${sec.activeText} shadow-sm`
                            : "text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
                        }`
                      }
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span className="flex-1">{item.label}</span>
                      <span className={`${sec.dot} text-xs`}>›</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Footer mascot */}
      <div className="px-4 py-4 border-t border-slate-700/60">
        <div className="flex items-center gap-2 bg-yellow-950/40 border border-yellow-700/40 rounded-xl px-3 py-2">
          <motion.span
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-2xl select-none"
          >
            🦉
          </motion.span>
          <p className="text-[11px] text-yellow-300 font-bold leading-snug">
            Profe Búho te guía<br />
            <span className="text-yellow-500 font-semibold">en cada lección</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
