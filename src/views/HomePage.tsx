import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SUBJECTS = [
  {
    emoji: "🔢",
    title: "Matemáticas",
    subtitle: "Figuras 3D",
    desc: "Explora cubos, pirámides y conos en 3D. ¡Descubre sus caras, aristas y vértices con la fórmula de Euler!",
    route: "/matematicas/descomposicion",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/30",
    badge: "bg-blue-400/20 text-blue-100",
    hoverBorder: "hover:ring-2 hover:ring-blue-400/60",
  },
  {
    emoji: "💧",
    title: "Ciencias Naturales",
    subtitle: "Ciclo del Agua",
    desc: "Observa 200 partículas animadas que muestran la evaporación, condensación, precipitación y acumulación.",
    route: "/ciencias-naturales",
    gradient: "from-teal-500 to-cyan-600",
    shadow: "shadow-cyan-500/30",
    badge: "bg-cyan-400/20 text-cyan-100",
    hoverBorder: "hover:ring-2 hover:ring-cyan-400/60",
  },
  {
    emoji: "🌍",
    title: "Ciencias Sociales",
    subtitle: "Nuestro Planeta",
    desc: "Gira el globo terráqueo en 3D y aprende sobre los continentes del mundo con un quiz interactivo.",
    route: "/ciencias-sociales",
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/30",
    badge: "bg-amber-400/20 text-amber-100",
    hoverBorder: "hover:ring-2 hover:ring-amber-400/60",
  },
];

const STARS = ["✨", "⭐", "🌟", "💫", "✨", "⭐"];

const TIPS = [
  { icon: "🎮", text: "Cada sección tiene simulaciones interactivas que puedes controlar." },
  { icon: "🧠", text: "Al final de cada lección hay un quiz para poner a prueba lo aprendido." },
  { icon: "🦉", text: "Profe Búho te guía con pistas y explicaciones en cada actividad." },
  { icon: "🌙", text: "Usa el botón de tema en la barra superior para cambiar entre claro y oscuro." },
];

export default function HomePage() {
  return (
    <div className="bg-[#0d1117] min-h-full overflow-x-hidden">

      {/* ── Hero ───────────────────────────────────────── */}
      <div className="relative flex flex-col items-center text-center px-6 pt-14 pb-10 overflow-hidden">

        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-cyan-700/15 blur-3xl pointer-events-none" />

        {/* Floating stars */}
        {STARS.map((star, i) => (
          <motion.span
            key={i}
            className="absolute text-xl pointer-events-none select-none"
            style={{ top: `${8 + i * 14}%`, left: `${4 + i * 18}%`, opacity: 0.55 }}
            animate={{ y: [-7, 7, -7], rotate: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 + i * 0.35, ease: "easeInOut" }}
          >
            {star}
          </motion.span>
        ))}

        {/* Author badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-bold"
            style={{ background: "linear-gradient(90deg, #7c3aed, #db2777)" }}
          >
            🦉 Profe Búho te enseña · Sebastián Coral
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight"
        >
          ¡Mentes{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Pensantes!
          </span>{" "}
          🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
        >
          Tu plataforma de aprendizaje interactivo. ¡Elige una materia y comienza tu aventura!
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-slate-500 text-sm flex flex-col items-center gap-1"
        >
          <span>Ver materias</span>
          <span>↓</span>
        </motion.div>
      </div>

      {/* ── Subject cards ──────────────────────────────── */}
      <div className="px-6 pb-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-2xl font-black text-white mb-8"
        >
          📚 Elige una Materia
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.route}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              whileHover={{ scale: 1.04, y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={s.route}
                className={`block bg-gradient-to-br ${s.gradient} rounded-3xl p-6 shadow-2xl ${s.shadow} ${s.hoverBorder} transition-all group`}
              >
                {/* Floating emoji */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 2.8 + i * 0.3, ease: "easeInOut" }}
                  className="text-6xl mb-4 text-center"
                >
                  {s.emoji}
                </motion.div>

                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${s.badge}`}>
                  {s.subtitle}
                </span>
                <h3 className="text-2xl font-black text-white mb-2">{s.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5">{s.desc}</p>

                <div className="flex items-center gap-1 text-white font-bold text-sm group-hover:gap-3 transition-all">
                  ¡Explorar ahora! <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Tips grid ──────────────────────────────────── */}
      <div className="px-6 pb-16 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xl font-black text-white mb-6"
        >
          💡 ¿Cómo usar la plataforma?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIPS.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-start gap-4 bg-slate-800/60 border border-slate-700 rounded-2xl p-4"
            >
              <span className="text-3xl flex-shrink-0">{tip.icon}</span>
              <p className="text-slate-300 text-sm leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Mascot tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-6 flex items-start gap-4 bg-yellow-950/40 border border-yellow-700/50 rounded-2xl p-5"
        >
          <motion.span
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-5xl flex-shrink-0 select-none"
          >
            🦉
          </motion.span>
          <div>
            <p className="font-black text-yellow-300 text-base mb-1">Profe Búho te dice...</p>
            <p className="text-yellow-100/80 text-sm leading-relaxed">
              ¡El aprendizaje es la mejor aventura! Haz clic en cualquier materia para comenzar.
              En cada sección encontrarás quizzes y actividades interactivas. ¡Tú puedes lograrlo! 🌟
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
