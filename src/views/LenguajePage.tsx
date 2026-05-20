import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "../components/Quiz";
import GuideMascot from "../components/GuideMascot";
import type { QuizQuestion } from "../components/Quiz";
import { audio } from "../hooks/useAudio";

const STORY = {
  title: "El Viaje de Luna al Bosque Mágico",
  paragraphs: [
    {
      id: 1,
      emoji: "🌲",
      text: "Una mañana soleada, Luna, una niña de 8 años con trenzas doradas, decidió explorar el bosque que había detrás de su casa. Su mamá le dijo: «Lleva tu mochila roja y regresa antes de que caiga el sol».",
      highlight: ["explorar", "decidió"],
    },
    {
      id: 2,
      emoji: "🦋",
      text: "Al internarse entre los árboles, Luna encontró una mariposa de colores brillantes. La mariposa tenía alas azules con puntos dorados y revoloteaba alrededor de una flor enorme que Luna nunca había visto antes.",
      highlight: ["brillantes", "revoloteaba"],
    },
    {
      id: 3,
      emoji: "🦊",
      text: "De repente, apareció un zorro de pelaje naranja. «¿Estás perdida?», preguntó el zorro con voz amable. Luna respondió: «No, solo estoy explorando. ¿Puedes mostrarme los secretos del bosque?».",
      highlight: ["apareció", "respondió"],
    },
    {
      id: 4,
      emoji: "⭐",
      text: "El zorro la llevó a un claro donde los árboles formaban un círculo perfecto. En el centro había una piedra brillante que emitía una luz suave y dorada. «Esta es la Piedra de los Deseos», dijo el zorro. «Solo los niños valientes pueden encontrarla».",
      highlight: ["valientes", "brillante"],
    },
    {
      id: 5,
      emoji: "🏠",
      text: "Luna tomó la piedra con cuidado y la guardó en su mochila. Cuando el sol comenzó a bajar, el zorro la guió de regreso a casa. Esa noche, Luna le contó a su mamá la aventura más increíble de su vida.",
      highlight: ["cuidado", "aventura"],
    },
  ],
};

const VOCABULARY = [
  { word: "explorar", meaning: "Conocer lugares nuevos con curiosidad" },
  { word: "revoloteaba", meaning: "Volar dando vueltas de un lado al otro" },
  { word: "valientes", meaning: "Personas que no se rinden ante el miedo" },
  { word: "brillante", meaning: "Que refleja mucha luz, resplandeciente" },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Cómo se llamaba la niña del cuento?",
    options: ["Sofía", "Luna", "Camila", "Andrea"],
    correct: 1,
    explanation:
      "La protagonista del cuento se llama Luna, una niña de 8 años con trenzas doradas.",
  },
  {
    question: "¿Qué le pidió su mamá a Luna antes de salir?",
    options: [
      "Que no entrara al bosque",
      "Que llevara su mochila roja y regresara antes del anochecer",
      "Que fuera con un amigo",
      "Que tomara el paraguas",
    ],
    correct: 1,
    explanation:
      "Su mamá le dijo que llevara su mochila roja y que regresara antes de que cayera el sol.",
  },
  {
    question: "¿Qué animal guio a Luna por el bosque?",
    options: ["Un lobo gris", "Una mariposa azul", "Un zorro naranja", "Un búho sabio"],
    correct: 2,
    explanation:
      "Un zorro de pelaje naranja fue quien guio a Luna y le mostró los secretos del bosque.",
  },
  {
    question: "¿Qué encontró Luna en el centro del claro?",
    options: [
      "Un tesoro de monedas",
      "Una Piedra de los Deseos brillante",
      "Una fuente de agua",
      "Un nido de pájaros",
    ],
    correct: 1,
    explanation:
      "En el centro del círculo de árboles había una Piedra de los Deseos que emitía luz dorada.",
  },
  {
    question: "¿Qué significa la palabra 'valientes' según el cuento?",
    options: [
      "Personas muy inteligentes",
      "Personas que corren muy rápido",
      "Personas que no se rinden ante el miedo",
      "Personas que tienen mucha fuerza",
    ],
    correct: 2,
    explanation:
      "Valientes son aquellas personas que enfrentan sus miedos sin rendirse. ¡Luna fue una niña muy valiente!",
  },
];

export default function LenguajePage() {
  const [vocabOpen, setVocabOpen] = useState<number | null>(null);
  const [readDone, setReadDone] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const markRead = (id: number) => {
    if (id > readProgress) {
      setReadProgress(id);
      audio.click();
    }
    if (id === STORY.paragraphs.length) setReadDone(true);
  };

  return (
    <div className="bg-[var(--mp-bg)] min-h-full px-4 py-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/40 border border-rose-600/40 text-rose-300 text-xs font-black uppercase tracking-widest mb-3">
          📖 Lenguaje · Lectura y Comprensión
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
          {STORY.title}
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Lee el cuento con atención y luego responde el quiz
        </p>
      </motion.div>

      {/* Mascot */}
      <GuideMascot
        message="¡Hola! Soy Profe Búho. Lee cada párrafo despacio y presta atención a las palabras resaltadas en amarillo — ¡son el vocabulario del día!"
        mood="explaining"
      />

      {/* Progress */}
      <div
        className="flex items-center gap-3"
        role="progressbar"
        aria-valuenow={readProgress}
        aria-valuemax={STORY.paragraphs.length}
        aria-label={`Lectura: ${readProgress} de ${STORY.paragraphs.length} párrafos leídos`}
      >
        <span className="text-slate-400 text-xs font-bold whitespace-nowrap">
          Lectura
        </span>
        <div className="flex-1 h-2 bg-slate-700 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
            animate={{
              width: `${(readProgress / STORY.paragraphs.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-rose-400 text-xs font-black">
          {readProgress}/{STORY.paragraphs.length}
        </span>
      </div>

      {/* Story paragraphs */}
      <div className="space-y-4" role="article" aria-label="Cuento: El Viaje de Luna">
        {STORY.paragraphs.map((para, idx) => {
          const isRead = idx < readProgress;
          const isCurrent = idx === readProgress;
          return (
            <motion.div
              key={para.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-2xl border p-4 transition-all ${
                isRead
                  ? "bg-[var(--mp-card)] border-[var(--mp-border)] opacity-80"
                  : isCurrent
                    ? "bg-[var(--mp-card)] border-rose-500/50 shadow-lg shadow-rose-500/10"
                    : "bg-[var(--mp-card)] border-[var(--mp-border)] opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  {para.emoji}
                </span>
                <div className="flex-1">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {para.text.split(/(\w+)/).map((part, i) =>
                      para.highlight.includes(part) ? (
                        <mark
                          key={i}
                          className="bg-yellow-400/20 text-yellow-300 rounded px-0.5 font-bold not-italic"
                        >
                          {part}
                        </mark>
                      ) : (
                        part
                      )
                    )}
                  </p>
                  {isCurrent && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => markRead(para.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-3 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      ✓ Ya leí este párrafo
                    </motion.button>
                  )}
                  {isRead && (
                    <span className="text-xs text-green-400 font-bold mt-2 inline-block">
                      ✓ Leído
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vocabulary section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        aria-label="Vocabulario del cuento"
      >
        <h2 className="text-white font-black text-xl mb-4">
          📚 Vocabulario del cuento
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VOCABULARY.map((v, i) => (
            <motion.button
              key={v.word}
              onClick={() => {
                setVocabOpen(vocabOpen === i ? null : i);
                audio.click();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-expanded={vocabOpen === i}
              aria-label={`Palabra: ${v.word}`}
              className="text-left bg-[var(--mp-card)] border border-[var(--mp-border)] hover:border-rose-500/50 rounded-2xl p-4 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-yellow-300 font-black text-base">
                  {v.word}
                </span>
                <span className="text-slate-500 text-sm" aria-hidden="true">
                  {vocabOpen === i ? "▲" : "▼"}
                </span>
              </div>
              <AnimatePresence>
                {vocabOpen === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-slate-300 text-sm mt-2 leading-relaxed"
                  >
                    {v.meaning}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Quiz */}
      <AnimatePresence>
        {readDone ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Quiz
              title="Comprensión Lectora"
              questions={QUIZ_QUESTIONS}
              moduleId="lenguaje"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--mp-card)] border border-[var(--mp-border)] rounded-3xl p-6 text-center"
            aria-live="polite"
          >
            <p className="text-slate-400 text-sm font-semibold">
              📖 Termina de leer el cuento para desbloquear el quiz
            </p>
            <div className="mt-3 flex justify-center gap-1">
              {STORY.paragraphs.map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i < readProgress ? "bg-rose-500" : "bg-slate-600"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
