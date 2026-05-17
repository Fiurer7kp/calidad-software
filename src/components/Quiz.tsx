import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
}

export default function Quiz({ title, questions }: QuizProps) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
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

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center"
      >
        <div className="text-3xl mb-2">🧠</div>
        <h3 className="text-white font-bold text-base mb-1">{title}</h3>
        <p className="text-slate-400 text-xs mb-4">{questions.length} preguntas · ¡Pon a prueba lo que aprendiste!</p>
        <button
          onClick={() => setStarted(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl transition text-sm"
        >
          Empezar quiz
        </button>
      </motion.div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center"
      >
        <div className="text-4xl mb-2">{emoji}</div>
        <h3 className="text-white font-bold text-lg mb-1">
          {score}/{questions.length} correctas
        </h3>
        <p className="text-slate-400 text-sm mb-1">{pct}% de aciertos</p>
        <p className="text-slate-300 text-xs mb-4">
          {pct >= 80 ? "¡Excelente trabajo, ya eres un experto!" : pct >= 50 ? "¡Bien! Sigue practicando." : "¡Repasa el tema e inténtalo de nuevo!"}
        </p>
        <button
          onClick={restart}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl transition text-sm"
        >
          Intentar de nuevo
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-xs font-medium">
          {current + 1} / {questions.length}
        </span>
        <span className="text-purple-400 text-xs font-bold">🧠 {title}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-700 rounded-full mb-4">
        <motion.div
          className="h-full bg-purple-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <p className="text-white text-sm font-semibold mb-3">{q.question}</p>

      {/* Options */}
      <div className="space-y-2 mb-3">
        {q.options.map((opt, idx) => {
          let bg = "bg-slate-700 hover:bg-slate-600 border-slate-600";
          if (selected !== null) {
            if (idx === q.correct) bg = "bg-green-700/60 border-green-500";
            else if (idx === selected) bg = "bg-red-700/60 border-red-500";
            else bg = "bg-slate-700 border-slate-600 opacity-50";
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm text-white transition ${bg}`}
            >
              <span className="font-bold mr-2 text-slate-300">
                {["A", "B", "C", "D"][idx]}.
              </span>
              {opt}
            </button>
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
            <div className="bg-slate-900/60 rounded-xl px-3 py-2 mb-3">
              <p className="text-slate-300 text-xs leading-relaxed">
                <span className="font-bold text-yellow-400">💡 </span>
                {q.explanation}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition text-sm"
            >
              {current + 1 >= questions.length ? "Ver resultados" : "Siguiente →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
