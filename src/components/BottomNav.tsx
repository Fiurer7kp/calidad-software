import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Inicio", route: "/", emoji: "🏠", end: true },
  { label: "Mates", route: "/matematicas/descomposicion", emoji: "🔢", end: false },
  { label: "Agua", route: "/ciencias-naturales", emoji: "💧", end: false },
  { label: "Planeta", route: "/ciencias-sociales", emoji: "🌍", end: false },
  { label: "Lengua", route: "/lenguaje", emoji: "📖", end: false },
  { label: "Historia", route: "/historia", emoji: "⏳", end: false },
  { label: "Lógica", route: "/logica", emoji: "🧩", end: false },
  { label: "Docente", route: "/docente", emoji: "👩‍🏫", end: false },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1f3c]/95 backdrop-blur border-t border-slate-700/80 flex items-center overflow-x-auto gap-0.5 px-1 py-1 pb-safe"
      style={{ paddingBottom: "max(4px, env(safe-area-inset-bottom))" }}
    >
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.route}
          to={item.route}
          end={item.end}
          aria-label={item.label}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] py-1.5 px-1.5 rounded-xl transition-all text-center ${
              isActive
                ? "bg-purple-600/30 text-purple-300"
                : "text-slate-400 hover:text-slate-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <motion.span
                animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl leading-none"
              >
                {item.emoji}
              </motion.span>
              <span className="text-[9px] font-bold mt-0.5 leading-none truncate w-full text-center">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
