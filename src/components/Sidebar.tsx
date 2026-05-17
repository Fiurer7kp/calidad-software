import { useState } from "react";
import { NavLink } from "react-router-dom";

interface SubItem {
  label: string;
  route: string;
  emoji: string;
}

interface Section {
  id: string;
  label: string;
  emoji: string;
  color: string;       // Tailwind text color class
  bgActive: string;    // active bg class
  textActive: string;  // active text class
  dot: string;         // dot color class
  items: SubItem[];
}

const sections: Section[] = [
  {
    id: "matematicas",
    label: "Matemáticas",
    emoji: "🔢",
    color: "text-blue-400",
    bgActive: "bg-blue-800/40",
    textActive: "text-blue-300",
    dot: "text-blue-400",
    items: [
      { label: "Figuras 3D", route: "/matematicas/descomposicion", emoji: "🧊" },
    ],
  },
  {
    id: "ciencias-naturales",
    label: "Ciencias Naturales",
    emoji: "🌿",
    color: "text-green-400",
    bgActive: "bg-green-800/40",
    textActive: "text-green-300",
    dot: "text-green-400",
    items: [
      { label: "Ciclo del Agua", route: "/ciencias-naturales", emoji: "💧" },
    ],
  },
  {
    id: "ciencias-sociales",
    label: "Ciencias Sociales",
    emoji: "🌍",
    color: "text-amber-400",
    bgActive: "bg-amber-800/40",
    textActive: "text-amber-300",
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
    <aside className="hidden md:flex flex-col w-[240px] min-h-0 bg-[#1a1f3c] border-r border-slate-700">
      {/* Top brand strip */}
      <div className="px-4 py-3 border-b border-slate-700/60">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Materias</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {sections.map((sec) => (
          <div key={sec.id}>
            {/* Section header */}
            <button
              onClick={() => toggle(sec.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-700/40 font-semibold text-sm transition group`}
            >
              <span className="flex items-center gap-2">
                <span className={`text-base ${sec.color} group-hover:scale-110 transition-transform`}>
                  {sec.emoji}
                </span>
                <span className={`${sec.color}`}>{sec.label}</span>
              </span>
              <span className="text-slate-500 text-xs">{open[sec.id] ? "▲" : "▼"}</span>
            </button>

            {/* Sub-items */}
            {open[sec.id] && (
              <div className="pl-3 mt-0.5 space-y-0.5">
                {sec.items.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition ${
                        isActive
                          ? `${sec.bgActive} ${sec.textActive} font-medium`
                          : "text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
                      }`
                    }
                  >
                    <span className="text-base">{item.emoji}</span>
                    {item.label}
                    <span className={`${sec.dot} text-xs ml-auto`}>›</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-700/60">
        <p className="text-[10px] text-slate-600 text-center leading-relaxed">
          🦉 Profe Búho te guía<br />en cada lección
        </p>
      </div>
    </aside>
  );
}
