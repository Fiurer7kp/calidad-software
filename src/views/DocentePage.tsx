import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getStudents,
  getAllProgress,
  addStudent,
  removeStudent,
  MODULE_LABELS,
} from "../hooks/useStudent";
import type { AllProgress } from "../hooks/useStudent";
import { audio } from "../hooks/useAudio";

const MODULE_EMOJI: Record<string, string> = {
  matematicas: "🔢",
  "ciencias-naturales": "💧",
  "ciencias-sociales": "🌍",
  lenguaje: "📖",
  historia: "⏳",
  logica: "🧩",
};

const ALL_MODULES = Object.keys(MODULE_LABELS);

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span aria-label={`${stars} de 3 estrellas`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= stars ? "text-yellow-400" : "text-slate-600"} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

function ScoreBar({ score, total }: { score: number; total: number }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const color =
    pct >= 80 ? "from-green-500 to-emerald-400" : pct >= 50 ? "from-yellow-500 to-amber-400" : "from-red-500 to-rose-400";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-700 rounded-full" role="presentation">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-black text-slate-400 w-8 text-right">{pct}%</span>
    </div>
  );
}

export default function DocentePage() {
  const [students, setStudents] = useState<string[]>(getStudents());
  const [progress, setProgress] = useState<AllProgress>(getAllProgress());
  const [newName, setNewName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const refresh = () => {
    setStudents(getStudents());
    setProgress(getAllProgress());
  };

  useEffect(() => {
    const id = setInterval(refresh, 3000);
    return () => clearInterval(id);
  }, []);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addStudent(newName.trim());
    audio.click();
    setNewName("");
    refresh();
  };

  const handleDelete = (name: string) => {
    if (confirmDelete === name) {
      removeStudent(name);
      audio.wrong();
      setConfirmDelete(null);
      setExpanded(null);
      refresh();
    } else {
      setConfirmDelete(name);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const totalModules = ALL_MODULES.length;
  const globalStats = students.map((s) => {
    const sp = progress[s] ?? {};
    const done = Object.keys(sp).length;
    const avgScore =
      done > 0
        ? Math.round(
            Object.values(sp).reduce(
              (acc, r) => acc + Math.round((r.score / r.total) * 100),
              0
            ) / done
          )
        : 0;
    const totalStars = Object.values(sp).reduce((a, r) => a + r.stars, 0);
    return { name: s, done, avgScore, totalStars };
  });

  return (
    <div className="bg-[var(--mp-bg)] min-h-full px-4 py-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-600/40 text-purple-300 text-xs font-black uppercase tracking-widest mb-3">
          👩‍🏫 Panel Docente
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
          Panel del Docente
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Gestiona estudiantes y visualiza su progreso en cada módulo
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="region" aria-label="Resumen general">
        {[
          {
            label: "Estudiantes",
            value: students.length,
            emoji: "👤",
            color: "from-blue-600 to-indigo-700",
          },
          {
            label: "Módulos",
            value: totalModules,
            emoji: "📚",
            color: "from-teal-600 to-cyan-700",
          },
          {
            label: "Quizzes completados",
            value: Object.values(progress).reduce(
              (a, sp) => a + Object.keys(sp).length,
              0
            ),
            emoji: "✅",
            color: "from-green-600 to-emerald-700",
          },
          {
            label: "Estrellas totales",
            value: globalStats.reduce((a, s) => a + s.totalStars, 0),
            emoji: "⭐",
            color: "from-yellow-500 to-amber-600",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white`}
          >
            <div className="text-3xl mb-1" aria-hidden="true">{stat.emoji}</div>
            <div className="text-2xl font-black">{stat.value}</div>
            <div className="text-xs opacity-80 font-semibold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Add student */}
      <section
        className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-2xl p-5"
        aria-label="Agregar nuevo estudiante"
      >
        <h2 className="text-white font-black text-base mb-4">
          ➕ Registrar Estudiante
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Nombre del estudiante…"
            maxLength={40}
            aria-label="Nombre del nuevo estudiante"
            className="flex-1 bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={!newName.trim()}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-black rounded-xl transition focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Agregar
          </motion.button>
        </div>
      </section>

      {/* Student list */}
      <section aria-label="Lista de estudiantes y su progreso">
        <h2 className="text-white font-black text-xl mb-4">
          👥 Estudiantes ({students.length})
        </h2>

        {students.length === 0 && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3" aria-hidden="true">🦉</div>
            <p className="text-slate-400 text-sm font-semibold">
              Aún no hay estudiantes registrados.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Usa el formulario de arriba para agregar el primero.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {students.map((student, idx) => {
            const sp = progress[student] ?? {};
            const stats = globalStats[idx];
            const isExpanded = expanded === student;

            return (
              <motion.div
                key={student}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-2xl overflow-hidden"
              >
                {/* Student header */}
                <div className="flex items-center gap-4 p-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                    aria-hidden="true"
                  >
                    {student.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-black text-base">{student}</h3>
                      <StarRating stars={Math.min(stats.totalStars, 3 * totalModules)} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-slate-400 text-xs">
                        {stats.done}/{totalModules} módulos
                      </span>
                      {stats.done > 0 && (
                        <span
                          className={`text-xs font-bold ${
                            stats.avgScore >= 80
                              ? "text-green-400"
                              : stats.avgScore >= 50
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          Promedio: {stats.avgScore}%
                        </span>
                      )}
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2">
                      <ScoreBar score={stats.done} total={totalModules} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <motion.button
                      onClick={() => {
                        audio.click();
                        setExpanded(isExpanded ? null : student);
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Ocultar" : "Ver"} detalle de ${student}`}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold rounded-xl transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {isExpanded ? "▲ Ocultar" : "▼ Detalle"}
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(student)}
                      whileTap={{ scale: 0.95 }}
                      aria-label={
                        confirmDelete === student
                          ? `Confirmar eliminación de ${student}`
                          : `Eliminar ${student}`
                      }
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition focus:outline-none focus:ring-2 focus:ring-red-400 ${
                        confirmDelete === student
                          ? "bg-red-600 text-white animate-pulse"
                          : "bg-slate-700 hover:bg-red-900/40 text-slate-400 hover:text-red-400"
                      }`}
                    >
                      {confirmDelete === student ? "¿Seguro? ✕" : "🗑️"}
                    </motion.button>
                  </div>
                </div>

                {/* Module detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-700 p-4">
                        <h4 className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">
                          Progreso por módulo
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ALL_MODULES.map((mod) => {
                            const result = sp[mod];
                            return (
                              <div
                                key={mod}
                                className={`rounded-xl p-3 border ${
                                  result
                                    ? "bg-slate-700/40 border-slate-600"
                                    : "bg-slate-800/40 border-slate-700/40"
                                }`}
                                aria-label={`${MODULE_LABELS[mod]}: ${result ? `${result.score}/${result.total} correctas` : "No completado"}`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-base" aria-hidden="true">
                                      {MODULE_EMOJI[mod]}
                                    </span>
                                    <span className="text-slate-300 text-xs font-bold">
                                      {MODULE_LABELS[mod]}
                                    </span>
                                  </div>
                                  {result ? (
                                    <StarRating stars={result.stars} />
                                  ) : (
                                    <span className="text-slate-600 text-xs">—</span>
                                  )}
                                </div>
                                {result ? (
                                  <>
                                    <ScoreBar score={result.score} total={result.total} />
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="text-slate-500 text-[10px]">
                                        {result.score}/{result.total} correctas ·{" "}
                                        {result.attempts} intento
                                        {result.attempts !== 1 ? "s" : ""}
                                      </span>
                                      <span className="text-slate-600 text-[10px]">
                                        {formatDate(result.date)}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-slate-600 text-[10px] mt-1">
                                    No completado aún
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Legend */}
      <div
        className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-2xl p-4"
        aria-label="Información del panel"
      >
        <h2 className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">
          ℹ️ Cómo usar este panel
        </h2>
        <ul className="space-y-1.5 text-slate-400 text-xs">
          <li>• Registra cada estudiante con su nombre en el formulario de arriba.</li>
          <li>
            • El estudiante debe seleccionar su nombre en el menú <strong className="text-slate-300">👤 Estudiante</strong> de la barra superior antes de comenzar.
          </li>
          <li>• Los resultados de cada quiz se guardan automáticamente al completarlo.</li>
          <li>• El panel se actualiza cada 3 segundos. Haz clic en "Detalle" para ver el desglose por módulo.</li>
          <li>• Para eliminar un estudiante, haz clic en 🗑️ dos veces para confirmar.</li>
        </ul>
      </div>
    </div>
  );
}
