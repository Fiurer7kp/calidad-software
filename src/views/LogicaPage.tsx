import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuideMascot from "../components/GuideMascot";
import { audio } from "../hooks/useAudio";
import { getCurrentStudent, saveResult } from "../hooks/useStudent";

interface Puzzle {
  id: number;
  type: "pattern" | "oddone" | "numbers";
  question: string;
  sequence: string[];
  options: string[];
  correct: number;
  explanation: string;
  difficulty: "fácil" | "medio" | "difícil";
}

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    type: "pattern",
    question: "¿Qué figura sigue en el patrón?",
    sequence: ["🔴", "🔵", "🔴", "🔵", "🔴", "?"],
    options: ["🔵", "🟢", "🔴", "🟡"],
    correct: 0,
    explanation: "El patrón alterna: rojo → azul → rojo → azul. Después de rojo viene azul.",
    difficulty: "fácil",
  },
  {
    id: 2,
    type: "pattern",
    question: "¿Qué figura sigue en el patrón?",
    sequence: ["⭐", "⭐", "🌙", "⭐", "⭐", "🌙", "⭐", "⭐", "?"],
    options: ["⭐", "🌙", "☀️", "🌟"],
    correct: 1,
    explanation: "El patrón es: estrella, estrella, luna (se repite cada 3). Después de dos estrellas viene la luna.",
    difficulty: "fácil",
  },
  {
    id: 3,
    type: "oddone",
    question: "¿Cuál NO pertenece al grupo?",
    sequence: ["🐶", "🐱", "🐟", "🐰"],
    options: ["🐶 Perro", "🐱 Gato", "🐟 Pez", "🐰 Conejo"],
    correct: 2,
    explanation: "El pez vive en el agua y es un animal acuático. Los demás son mamíferos terrestres domésticos.",
    difficulty: "fácil",
  },
  {
    id: 4,
    type: "numbers",
    question: "¿Qué número sigue en la secuencia? 2 → 4 → 6 → 8 → ?",
    sequence: ["2", "4", "6", "8", "?"],
    options: ["9", "10", "12", "11"],
    correct: 1,
    explanation: "Esta es la secuencia de números pares. Se suma 2 cada vez: 8 + 2 = 10.",
    difficulty: "fácil",
  },
  {
    id: 5,
    type: "pattern",
    question: "¿Qué figura sigue en el patrón?",
    sequence: ["🟥", "🟧", "🟨", "🟩", "🟦", "?"],
    options: ["🟪", "🟥", "🟫", "⬛"],
    correct: 0,
    explanation: "Es el orden del arcoíris: rojo, naranja, amarillo, verde, azul... ¡y luego violeta!",
    difficulty: "medio",
  },
  {
    id: 6,
    type: "oddone",
    question: "¿Cuál NO pertenece al grupo?",
    sequence: ["🍎", "🍊", "🥕", "🍋"],
    options: ["Manzana", "Naranja", "Zanahoria", "Limón"],
    correct: 2,
    explanation: "La zanahoria es una verdura, no una fruta. Las manzanas, naranjas y limones son todas frutas.",
    difficulty: "medio",
  },
  {
    id: 7,
    type: "numbers",
    question: "¿Qué número sigue? 1 → 3 → 6 → 10 → ?",
    sequence: ["1", "3", "6", "10", "?"],
    options: ["13", "14", "15", "12"],
    correct: 2,
    explanation: "Se suma 2, luego 3, luego 4... el incremento crece. 10 + 5 = 15. ¡Son los números triangulares!",
    difficulty: "difícil",
  },
  {
    id: 8,
    type: "pattern",
    question: "¿Qué figura sigue en el patrón?",
    sequence: ["🔺", "🔺🔺", "🔺🔺🔺", "🔺🔺🔺🔺", "?"],
    options: [
      "🔺🔺🔺🔺🔺",
      "🔺🔺🔺",
      "🔺🔺🔺🔺🔺🔺",
      "🔺🔺",
    ],
    correct: 0,
    explanation: "Cada paso agrega un triángulo más. Hay 1, 2, 3, 4... entonces el siguiente es 5 triángulos.",
    difficulty: "difícil",
  },
];

const DIFFICULTY_COLOR: Record<string, string> = {
  fácil: "bg-green-500/20 text-green-400 border-green-500/30",
  medio: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  difícil: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function LogicaPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const puzzle = PUZZLES[currentIdx];
  const progress = (currentIdx / PUZZLES.length) * 100;

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      if (idx === puzzle.correct) {
        setScore((s) => s + 1);
        audio.correct();
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 900);
      } else {
        audio.wrong();
      }
    },
    [selected, puzzle.correct]
  );

  const handleNext = () => {
    const isLast = currentIdx + 1 >= PUZZLES.length;
    if (isLast) {
      const total = PUZZLES.length;
      const pct = Math.round((score / total) * 100);
      const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
      if (stars === 3) audio.victory();
      const student = getCurrentStudent();
      if (student) saveResult(student, "logica", score, total, stars);
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  /* ── Results ── */
  if (finished) {
    const pct = Math.round((score / PUZZLES.length) * 100);
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
    const msg =
      pct >= 80
        ? "¡Eres un genio de la lógica! 🧠"
        : pct >= 50
          ? "¡Bien hecho! Con práctica serás imparable. 💪"
          : "¡La lógica se entrena! Inténtalo de nuevo. 📚";

    return (
      <div className="bg-[#0d1117] min-h-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-3xl p-8 text-center max-w-sm w-full"
          role="region"
          aria-label="Resultados del juego de lógica"
          aria-live="polite"
        >
          <div className="text-6xl mb-4" aria-hidden="true">🧩</div>
          <div className="flex justify-center gap-2 mb-4" aria-label={`${stars} de 3 estrellas`}>
            {[1, 2, 3].map((n) => (
              <motion.span
                key={n}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: n <= stars ? 1 : 0.4, rotate: 0, opacity: n <= stars ? 1 : 0.25 }}
                transition={{ delay: n * 0.15, type: "spring", stiffness: 200 }}
                className="text-4xl"
                aria-hidden="true"
              >
                ⭐
              </motion.span>
            ))}
          </div>
          <h2 className="text-white font-black text-2xl mb-1">
            {score}/{PUZZLES.length} resueltos
          </h2>
          <p className="text-slate-400 text-sm mb-2">{pct}% correcto</p>
          <p className="text-slate-300 text-sm font-semibold mb-6">{msg}</p>
          <motion.button
            onClick={restart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black rounded-2xl transition shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Jugar de nuevo 🔄
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--mp-bg)] min-h-full px-4 py-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-600/40 text-emerald-300 text-xs font-black uppercase tracking-widest mb-3">
          🧩 Lógica · Puzzles y Patrones
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
          ¡Pon a prueba tu mente!
        </h1>
      </motion.div>

      {/* Mascot */}
      <GuideMascot
        message="¡Este juego entrena tu cerebro! Observa los patrones con atención antes de responder. No hay prisa — piensa bien cada puzzle."
        mood="thinking"
      />

      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-xs font-bold whitespace-nowrap">
          Puzzle {currentIdx + 1}/{PUZZLES.length}
        </span>
        <div
          className="flex-1 h-2.5 bg-slate-700 rounded-full"
          role="progressbar"
          aria-valuenow={currentIdx}
          aria-valuemax={PUZZLES.length}
          aria-label={`Progreso: puzzle ${currentIdx + 1} de ${PUZZLES.length}`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-emerald-400 text-xs font-black">
          {score} ✓
        </span>
      </div>

      {/* Puzzle card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-3xl p-6 relative overflow-hidden"
          role="region"
          aria-label={`Puzzle ${currentIdx + 1}: ${puzzle.question}`}
        >
          {/* Burst */}
          {showBurst && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {["🎉", "⭐", "✨", "💡", "🧠", "🌟"].map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl"
                  style={{ left: `${10 + i * 15}%`, top: "40%" }}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.8, delay: i * 0.07 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          )}

          {/* Difficulty badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-xs font-black px-2.5 py-1 rounded-full border ${DIFFICULTY_COLOR[puzzle.difficulty]}`}
            >
              {puzzle.difficulty.toUpperCase()}
            </span>
            <span className="text-slate-500 text-xs">
              {puzzle.type === "pattern"
                ? "🔁 Patrón"
                : puzzle.type === "oddone"
                  ? "🔍 Intruso"
                  : "🔢 Números"}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-white font-black text-lg mb-5 leading-snug">
            {puzzle.question}
          </h2>

          {/* Sequence display */}
          <div
            className="flex flex-wrap items-center gap-2 mb-6 bg-slate-900/60 rounded-2xl p-4 justify-center"
            aria-label={`Secuencia: ${puzzle.sequence.join(", ")}`}
          >
            {puzzle.sequence.map((item, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.07, type: "spring" }}
                className={`text-3xl md:text-4xl select-none ${
                  item === "?" ? "opacity-50" : ""
                }`}
                aria-label={item === "?" ? "signo de interrogación" : item}
              >
                {item}
              </motion.span>
            ))}
          </div>

          {/* Options */}
          <div
            className="grid grid-cols-2 gap-3"
            role="group"
            aria-label="Opciones de respuesta"
          >
            {puzzle.options.map((opt, idx) => {
              let cls =
                "bg-slate-700 hover:bg-slate-600 border-slate-600 cursor-pointer";
              if (selected !== null) {
                if (idx === puzzle.correct)
                  cls = "bg-green-700/50 border-green-500 shadow-green-500/20 shadow-lg";
                else if (idx === selected)
                  cls = "bg-red-700/50 border-red-500 shadow-red-500/20 shadow-lg";
                else cls = "bg-slate-700/40 border-slate-700 opacity-40";
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  whileHover={selected === null ? { scale: 1.04 } : {}}
                  whileTap={selected === null ? { scale: 0.96 } : {}}
                  disabled={selected !== null && idx !== puzzle.correct && idx !== selected}
                  aria-label={`Opción ${idx + 1}: ${opt}`}
                  aria-pressed={selected === idx}
                  className={`relative flex items-center justify-center text-2xl md:text-3xl py-4 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 min-h-[70px] ${cls}`}
                >
                  <span aria-hidden="true">{opt}</span>
                  {selected !== null && idx === puzzle.correct && (
                    <span
                      className="absolute top-1.5 right-2 text-green-400 text-sm font-black"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                  {selected !== null && idx === selected && idx !== puzzle.correct && (
                    <span
                      className="absolute top-1.5 right-2 text-red-400 text-sm font-black"
                      aria-hidden="true"
                    >
                      ✗
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation + Next */}
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 bg-slate-900/70 rounded-2xl px-4 py-3 border border-slate-700"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="font-black text-yellow-400" aria-hidden="true">💡 </span>
                    {puzzle.explanation}
                  </p>
                </div>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black rounded-2xl transition shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {currentIdx + 1 >= PUZZLES.length ? "Ver resultados 🏆" : "Siguiente puzzle →"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Mini score */}
      <div className="flex justify-center gap-2 flex-wrap" aria-hidden="true">
        {PUZZLES.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentIdx
                ? "bg-emerald-500"
                : i === currentIdx
                  ? "bg-emerald-300 ring-2 ring-emerald-400/50"
                  : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
