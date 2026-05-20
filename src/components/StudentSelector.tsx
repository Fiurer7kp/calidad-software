import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getStudents,
  getCurrentStudent,
  setCurrentStudent,
  addStudent,
} from "../hooks/useStudent";
import { audio } from "../hooks/useAudio";

export default function StudentSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(getCurrentStudent());
  const [students, setStudents] = useState<string[]>(getStudents());
  const [newName, setNewName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const select = (name: string | null) => {
    setCurrentStudent(name);
    setCurrent(name);
    audio.click();
    setOpen(false);
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    addStudent(newName.trim());
    setStudents(getStudents());
    select(newName.trim());
    setNewName("");
  };

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current ? `Estudiante: ${current}` : "Seleccionar estudiante"}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors max-w-[130px]"
      >
        <span className="text-base">👤</span>
        <span className="truncate hidden sm:inline">
          {current ?? "Estudiante"}
        </span>
        <span className="text-slate-400 text-[10px]">{open ? "▲" : "▼"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            aria-label="Lista de estudiantes"
            className="absolute right-0 top-full mt-2 w-56 bg-[#1e2340] border border-slate-600 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Student list */}
            <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
              {students.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-2">
                  Aún no hay estudiantes
                </p>
              )}
              {current && (
                <button
                  role="option"
                  aria-selected={false}
                  onClick={() => select(null)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-700 transition font-semibold"
                >
                  🚫 Sin estudiante
                </button>
              )}
              {students.map((s) => (
                <button
                  key={s}
                  role="option"
                  aria-selected={s === current}
                  onClick={() => select(s)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    s === current
                      ? "bg-purple-600/30 text-purple-300"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span>{s === current ? "✓" : "👤"}</span>
                  <span className="truncate">{s}</span>
                </button>
              ))}
            </div>

            {/* Add new */}
            <div className="border-t border-slate-700 p-2">
              <div className="flex gap-1.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  placeholder="Nuevo estudiante…"
                  maxLength={30}
                  aria-label="Nombre del nuevo estudiante"
                  className="flex-1 bg-slate-700 border border-slate-600 text-white text-xs rounded-xl px-2.5 py-1.5 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.9 }}
                  disabled={!newName.trim()}
                  aria-label="Agregar estudiante"
                  className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-black rounded-xl transition"
                >
                  ＋
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
