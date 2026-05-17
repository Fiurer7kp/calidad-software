import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTable, FaLeaf, FaGlobe, FaCog } from "react-icons/fa";

interface SubItem {
  label: string;
  route: string;
  icon: React.ReactNode;
}

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: SubItem[];
}

const sections: Section[] = [
  {
    id: "matematicas",
    label: "Matemáticas",
    icon: <FaTable />,
    items: [
      { label: "Descomposición", route: "/matematicas/descomposicion", icon: <FaCog /> },
    ],
  },
  {
    id: "ciencias-naturales",
    label: "Ciencias Naturales",
    icon: <FaLeaf />,
    items: [
      { label: "Ciencias Naturales", route: "/ciencias-naturales", icon: <FaLeaf /> },
    ],
  },
  {
    id: "ciencias-sociales",
    label: "Ciencias Sociales",
    icon: <FaGlobe />,
    items: [
      { label: "Ciencias Sociales", route: "/ciencias-sociales", icon: <FaGlobe /> },
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
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sections.map((sec) => (
          <div key={sec.id}>
            {/* Section header */}
            <button
              onClick={() => toggle(sec.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-700/50 font-semibold text-sm transition"
            >
              <span className="flex items-center gap-2">
                <span className="text-slate-400">{sec.icon}</span>
                {sec.label}
              </span>
              <span className="text-slate-400 text-xs">{open[sec.id] ? "▲" : "▼"}</span>
            </button>

            {/* Sub-items */}
            {open[sec.id] && (
              <div className="pl-4 mt-0.5 space-y-0.5">
                {sec.items.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                        isActive
                          ? "bg-purple-800/40 text-purple-300 font-medium"
                          : "text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
                      }`
                    }
                  >
                    <span>{item.icon}</span>
                    {item.label}
                    <span className="text-purple-400 text-xs ml-auto">·</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
