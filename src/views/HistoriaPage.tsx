import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "../components/Quiz";
import GuideMascot from "../components/GuideMascot";
import type { QuizQuestion } from "../components/Quiz";
import { audio } from "../hooks/useAudio";

interface TimelineEvent {
  id: number;
  year: string;
  era: string;
  title: string;
  description: string;
  detail: string;
  emoji: string;
  color: string;
  dotColor: string;
}

const EVENTS: TimelineEvent[] = [
  {
    id: 1,
    year: "~3000 a.C.",
    era: "Antigüedad",
    title: "Civilización Egipcia",
    description:
      "Los egipcios construyeron las pirámides y desarrollaron uno de los sistemas de escritura más antiguos del mundo: los jeroglíficos.",
    detail:
      "Las pirámides de Giza, como la Gran Pirámide de Keops, eran tumbas gigantescas para los faraones. ¡La Gran Pirámide tardó más de 20 años en construirse con más de 2 millones de bloques de piedra!",
    emoji: "🏺",
    color: "from-yellow-500 to-amber-600",
    dotColor: "bg-yellow-500",
  },
  {
    id: 2,
    year: "~500 a.C.",
    era: "Grecia Antigua",
    title: "La Democracia Griega",
    description:
      "Los griegos inventaron la democracia en Atenas. Por primera vez, los ciudadanos podían votar para tomar decisiones importantes.",
    detail:
      "La palabra 'democracia' viene del griego: 'demos' (pueblo) y 'kratos' (gobierno). Aunque no todos podían votar (solo hombres libres adultos), fue el primer sistema donde las personas participaban en las decisiones del gobierno.",
    emoji: "🏛️",
    color: "from-blue-500 to-cyan-600",
    dotColor: "bg-blue-500",
  },
  {
    id: 3,
    year: "27 a.C.",
    era: "Imperio Romano",
    title: "El Imperio Romano",
    description:
      "Roma se convirtió en el Imperio más grande de Europa, con calzadas, acueductos y leyes que aún influyen en el mundo de hoy.",
    detail:
      "Los romanos construyeron más de 85,000 km de carreteras. Su sistema legal y su idioma (el latín) son la base del español, francés, italiano y portugués. ¡El español que hablas viene del latín romano!",
    emoji: "⚔️",
    color: "from-red-500 to-rose-600",
    dotColor: "bg-red-500",
  },
  {
    id: 4,
    year: "~500 d.C.",
    era: "Edad Media",
    title: "La Edad Media",
    description:
      "Europa se llenó de castillos, caballeros y catedrales. Los reyes y la iglesia tenían el poder sobre las personas.",
    detail:
      "Durante la Edad Media surgieron las universidades más antiguas del mundo: Bolonia (1088) y Oxford (1096). También fue la época de los vikingos, que navegaron hasta América antes que Colón.",
    emoji: "🏰",
    color: "from-slate-500 to-gray-600",
    dotColor: "bg-slate-500",
  },
  {
    id: 5,
    year: "~1400 d.C.",
    era: "Renacimiento",
    title: "El Renacimiento",
    description:
      "Un período de gran creatividad donde artistas como Leonardo da Vinci y científicos como Galileo cambiaron para siempre la forma de ver el mundo.",
    detail:
      "Leonardo da Vinci fue pintor, inventor, músico y científico al mismo tiempo. Diseñó máquinas voladoras, tanques de guerra y estudió el cuerpo humano. ¡La Mona Lisa que pintó tiene más de 500 años!",
    emoji: "🎨",
    color: "from-purple-500 to-violet-600",
    dotColor: "bg-purple-500",
  },
  {
    id: 6,
    year: "1492",
    era: "Exploración",
    title: "El Encuentro de Dos Mundos",
    description:
      "Cristóbal Colón llegó a América en 1492, conectando por primera vez Europa con un continente que los europeos desconocían.",
    detail:
      "En octubre de 1492, Colón llegó a las Bahamas creyendo que estaba en Asia. América ya tenía civilizaciones avanzadas: los Mayas, Aztecas e Incas construyeron ciudades, pirámides y calendarios muy precisos.",
    emoji: "🚢",
    color: "from-teal-500 to-emerald-600",
    dotColor: "bg-teal-500",
  },
  {
    id: 7,
    year: "~1760",
    era: "Revolución Industrial",
    title: "La Revolución Industrial",
    description:
      "Las máquinas de vapor reemplazaron el trabajo manual. Las fábricas, los trenes y las ciudades crecieron enormemente.",
    detail:
      "La máquina de vapor inventada por James Watt (1769) cambió todo. Antes, todo se hacía a mano; después, las máquinas podían hacer el trabajo de cientos de personas. Surgieron los trenes, barcos a vapor y fábricas textiles.",
    emoji: "⚙️",
    color: "from-orange-500 to-amber-600",
    dotColor: "bg-orange-500",
  },
  {
    id: 8,
    year: "1969",
    era: "Era Moderna",
    title: "El Hombre en la Luna",
    description:
      "El 20 de julio de 1969, Neil Armstrong se convirtió en el primer ser humano en caminar sobre la Luna.",
    detail:
      "La misión Apolo 11 llevó a tres astronautas al espacio. Neil Armstrong dijo las famosas palabras: «Un pequeño paso para el hombre, un gran salto para la humanidad». ¡Viajaron 384,400 km para llegar a la Luna!",
    emoji: "🚀",
    color: "from-indigo-500 to-blue-600",
    dotColor: "bg-indigo-500",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Qué civilización construyó las pirámides?",
    options: ["Los griegos", "Los romanos", "Los egipcios", "Los mayas"],
    correct: 2,
    explanation:
      "Los egipcios construyeron las pirámides como tumbas para sus faraones. La Gran Pirámide de Keops tardó más de 20 años en construirse.",
  },
  {
    question: "¿Qué significa la palabra 'democracia'?",
    options: [
      "Gobierno del rey",
      "Gobierno del pueblo",
      "Gobierno de los dioses",
      "Gobierno de los sabios",
    ],
    correct: 1,
    explanation:
      "Democracia viene del griego 'demos' (pueblo) y 'kratos' (gobierno). Los griegos inventaron este sistema en Atenas.",
  },
  {
    question: "¿Qué idioma hablaban los romanos y del cual viene el español?",
    options: ["El griego", "El latín", "El árabe", "El celta"],
    correct: 1,
    explanation:
      "El español, francés, italiano y portugués vienen del latín que hablaban los romanos. Por eso se llaman lenguas 'romances'.",
  },
  {
    question: "¿Quién fue el primer hombre en caminar en la Luna?",
    options: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"],
    correct: 2,
    explanation:
      "Neil Armstrong fue el primer ser humano en pisar la Luna el 20 de julio de 1969, durante la misión Apolo 11.",
  },
];

export default function HistoriaPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  const handleSelect = (id: number) => {
    audio.click();
    setSelected(selected === id ? null : id);
    setVisited((v) => new Set(v).add(id));
  };

  const selectedEvent = EVENTS.find((e) => e.id === selected);

  return (
    <div className="bg-[var(--mp-bg)] min-h-full px-4 py-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-900/40 border border-violet-600/40 text-violet-300 text-xs font-black uppercase tracking-widest mb-3">
          ⏳ Historia · Línea del Tiempo
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
          Viaje por la Historia
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Haz clic en cada evento para descubrir más detalles
        </p>
      </motion.div>

      {/* Mascot */}
      <GuideMascot
        message="¡Bienvenido al viaje del tiempo! Haz clic en cada evento de la línea del tiempo para leer detalles fascinantes. ¡Intenta visitar todos antes del quiz!"
        mood="excited"
      />

      {/* Progress */}
      <div
        className="flex items-center gap-3"
        role="progressbar"
        aria-valuenow={visited.size}
        aria-valuemax={EVENTS.length}
        aria-label={`Exploración: ${visited.size} de ${EVENTS.length} eventos visitados`}
      >
        <span className="text-slate-400 text-xs font-bold whitespace-nowrap">
          Explorado
        </span>
        <div className="flex-1 h-2 bg-slate-700 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
            animate={{ width: `${(visited.size / EVENTS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-violet-400 text-xs font-black">
          {visited.size}/{EVENTS.length}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative" aria-label="Línea del tiempo histórica">
        {/* Center line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="space-y-6">
          {EVENTS.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const isOpen = selected === event.id;
            const wasVisited = visited.has(event.id);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
                className={`flex items-start gap-4 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className={`flex-1 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.button
                    onClick={() => handleSelect(event.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={isOpen}
                    aria-label={`${event.year}: ${event.title}`}
                    className={`w-full text-left bg-[var(--mp-card)] border rounded-2xl p-4 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      isOpen
                        ? "border-purple-500/60 shadow-lg shadow-purple-500/10"
                        : wasVisited
                          ? "border-[var(--mp-border)]"
                          : "border-[var(--mp-border)] hover:border-slate-400/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center text-2xl shadow-md`}
                        aria-hidden="true"
                      >
                        {event.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                            {event.year}
                          </span>
                          <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                            {event.era}
                          </span>
                          {wasVisited && (
                            <span className="text-xs text-green-400 font-bold">✓</span>
                          )}
                        </div>
                        <h3 className="text-white font-black text-base leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      <span
                        className="text-slate-500 text-sm flex-shrink-0 mt-1"
                        aria-hidden="true"
                      >
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </div>

                    {/* Detail panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="flex items-start gap-2">
                              <span
                                className="text-yellow-400 text-base flex-shrink-0"
                                aria-hidden="true"
                              >
                                💡
                              </span>
                              <p className="text-slate-300 text-sm leading-relaxed">
                                {event.detail}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Center dot (desktop) */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 w-8">
                  <motion.div
                    animate={wasVisited ? { scale: [1, 1.3, 1] } : {}}
                    className={`w-4 h-4 rounded-full border-2 border-[#0d1117] ${wasVisited ? event.dotColor : "bg-slate-600"} shadow-md`}
                    aria-hidden="true"
                  />
                </div>

                {/* Empty space (desktop alternating layout) */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail modal for mobile */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-20 left-4 right-4 bg-[#1e2340] border border-purple-500/40 rounded-2xl p-4 shadow-2xl z-40"
            role="dialog"
            aria-label={`Detalle: ${selectedEvent.title}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-300 font-black text-sm">
                {selectedEvent.emoji} {selectedEvent.title}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-white text-lg focus:outline-none"
                aria-label="Cerrar detalle"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedEvent.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz */}
      <Quiz
        title="Viaje por la Historia"
        questions={QUIZ_QUESTIONS}
        moduleId="historia"
      />
    </div>
  );
}
