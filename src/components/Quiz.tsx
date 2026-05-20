import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "../hooks/useAudio";
import { getCurrentStudent, saveResult } from "../hooks/useStudent";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
  moduleId?: string;
}

const CELEBRATION_EMOJIS = ["⭐", "🌟", "✨", "💫", "🎉", "🏆"];

function CorrectBurst() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
      aria-hidden="true"
    >
      {CELEBRATION_EMOJIS.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-xl select-none"
          style={{ left: `${15 + i * 14}%`, top: "50%" }}
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -70, scale: 1.4, x: (i - 2.5) * 12 }}
          transition={{ duration: 0.9, delay: i * 0.07, ease: "easeOut" }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default function Quiz({ title, questions, moduleId }: QuizProps) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) {
      setScore((s) => s + 1);
      setShowBurst(true);
      audio.correct();
      setTimeout(() => setShowBurst(false), 1000);
    } else {
      audio.wrong();
    }
  };

  const handleNext = () => {
    const isLast = current + 1 >= questions.length;
    if (isLast) {
      const finalScore = selected === q.correct ? score : score;
      const pct = Math.round((finalScore / questions.length) * 100);
      const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
      if (stars === 3) audio.victory();
      const student = getCurrentStudent();
      if (student && moduleId) {
        saveResult(student, moduleId, finalScore, questions.length, stars);
      }
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setStarted(false);
  };

  /* ── Start screen ── */
  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="region"
        aria-label={`Quiz: ${title}`}
        className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-3xl p-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none" aria-hidden="true" />
        <motion.div
          animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-5xl mb-3"
          aria-hidden="true"
        >
          🧠
        </motion.div>
        <h3 className="text-[var(--mp-text)] font-black text-lg mb-1">{title}</h3>
        <p className="text-slate-400 text-sm mb-5">
          {questions.length} preguntas · ¡Pon a prueba lo que aprendiste!
        </p>
        <motion.button
          onClick={() => { audio.start(); setStarted(true); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black px-8 py-2.5 rounded-2xl transition shadow-lg shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          ¡Empezar quiz! 🚀
        </motion.button>
      </motion.div>
    );
  }

  /* ── Results screen ── */
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
    const msg =
      pct >= 80
        ? "¡Excelente trabajo, eres un crack! 🎓"
        : pct >= 50
          ? "¡Bien! Sigue practicando y lo lograrás. 💪"
          : "¡Repasa el tema e inténtalo de nuevo! 📚";

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        role="region"
        aria-label="Resultados del quiz"
        aria-live="polite"
        className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-3xl p-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="flex justify-center gap-1 mb-3" aria-label={`${stars} de 3 estrellas obtenidas`}>
          {[1, 2, 3].map((n) => (
            <motion.span
              key={n}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: n <= stars ? 1 : 0.4, rotate: 0, opacity: n <= stars ? 1 : 0.3 }}
              transition={{ delay: n * 0.15, type: "spring", stiffness: 200 }}
              className="text-4xl"
              aria-hidden="true"
            >
              ⭐
            </motion.span>
          ))}
        </div>
        <h3 className="text-[var(--mp-text)] font-black text-2xl mb-1">
          {score}/{questions.length} correctas
        </h3>
        <p className="text-slate-400 text-sm mb-1">{pct}% de aciertos</p>
        <p className="text-slate-300 text-sm mb-5 font-semibold">{msg}</p>
        <motion.button
          onClick={restart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black px-8 py-2.5 rounded-2xl transition shadow-lg shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Intentar de nuevo 🔄
        </motion.button>
      </motion.div>
    );
  }

  /* ── Question screen ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      role="region"
      aria-label={`Pregunta ${current + 1} de ${questions.length}`}
      className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-3xl p-5 relative overflow-hidden"
    >
      {showBurst && <CorrectBurst />}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[var(--mp-text-3)] text-xs font-bold" aria-live="polite">
          Pregunta {current + 1} de {questions.length}
        </span>
        <span className="text-purple-400 text-xs font-black" aria-hidden="true">🧠 {title}</span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-2.5 bg-slate-700 rounded-full mb-4"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-label={`Progreso: pregunta ${current + 1} de ${questions.length}`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-[var(--mp-text)] text-base font-black mb-4 leading-snug"
        >
          {q.question}
        </motion.p>
      </AnimatePresence>

      {/* Options */}
      <div className="space-y-2.5 mb-3" role="group" aria-label="Opciones de respuesta">
        {q.options.map((opt, idx) => {
          const letter = ["A", "B", "C", "D"][idx];
          let cls = "bg-[var(--mp-option)] hover:bg-[var(--mp-card-2,#f0f2ff)] border-[var(--mp-border)] cursor-pointer";
          let ariaLabel = `${letter}: ${opt}`;
          if (selected !== null) {
            if (idx === q.correct) {
              cls = "bg-green-700/50 border-green-500 shadow-lg shadow-green-500/20";
              ariaLabel += " — Respuesta correcta";
            } else if (idx === selected) {
              cls = "bg-red-700/50 border-red-500 shadow-lg shadow-red-500/20";
              ariaLabel += " — Respuesta incorrecta";
            } else {
              cls = "bg-slate-700/50 border-slate-700 opacity-40";
            }
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              whileHover={selected === null ? { scale: 1.02, x: 3 } : {}}
              whileTap={selected === null ? { scale: 0.98 } : {}}
              disabled={selected !== null && idx !== q.correct && idx !== selected}
              aria-label={ariaLabel}
              aria-pressed={selected === idx}
              className={`w-full text-left px-4 py-3 rounded-2xl border text-sm text-white font-semibold transition-all relative focus:outline-none focus:ring-2 focus:ring-purple-400 ${cls}`}
            >
              <span className="font-black text-slate-300 mr-2">{letter}.</span>
              {opt}
              {selected !== null && idx === q.correct && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 font-black" aria-hidden="true">✓</span>
              )}
              {selected !== null && idx === selected && idx !== q.correct && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 font-black" aria-hidden="true">✗</span>
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
          >
            <div
              className="bg-[var(--mp-card-2,#f4f6ff)] rounded-2xl px-4 py-3 mb-3 border border-[var(--mp-border)]"
              role="alert"
              aria-live="polite"
            >
              <p className="text-slate-300 text-sm leading-relaxed">
                <span className="font-black text-yellow-400" aria-hidden="true">💡 </span>
                {q.explanation}
              </p>
            </div>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black rounded-2xl transition shadow-lg shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {current + 1 >= questions.length ? "Ver resultados 🏆" : "Siguiente →"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
