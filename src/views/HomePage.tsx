import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6 bg-[#0d1117] min-h-full">

      {/* Spinner animado */}
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent mb-8"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ boxShadow: "0 0 18px rgba(59,130,246,0.5)" }}
      />

      {/* Badge autores */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-medium"
          style={{ background: "linear-gradient(90deg, #7c3aed, #db2777)" }}>
          <span className="font-bold text-pink-200">Autores:</span>
          Sebastian Coral
          <span className="text-pink-300">&amp;</span>
          Daniela Torres
        </span>
      </motion.div>

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-6xl font-black text-white mb-4"
      >
        Bienvenido a React 🚀
      </motion.h2>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl"
      >
        Este es un ejemplo simple de una landing page responsiva usando{" "}
        <span className="font-bold text-blue-400">React + TailwindCSS</span>.
      </motion.p>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex gap-4 mb-14"
      >
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-7 py-3 rounded-2xl shadow-lg transition">
          Empezar
        </button>
        <button className="border-2 border-white text-white bg-transparent px-7 py-3 rounded-2xl hover:bg-white hover:text-slate-900 transition font-semibold">
          Ver más
        </button>
      </motion.div>

      {/* Guía para niños */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-lg w-full text-left"
      >
        <h3 className="text-xl font-bold text-white text-center mb-1">Guía para niños</h3>
        <p className="text-slate-400 text-center mb-4">Explora las opciones de la API educativa:</p>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">•</span>
            <span>
              <span className="font-semibold text-white">Matemáticas:</span> descompón figuras 3D en caras, aristas y vértices.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">•</span>
            <span>
              <span className="font-semibold text-white">Ciencias Naturales:</span> descubre el ciclo del agua con partículas animadas.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>
              <span className="font-semibold text-white">Ciencias Sociales:</span> aprende ubicaciones en el globo interactivo.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">•</span>
            <span>
              Usa el botón <span className="font-semibold text-white">"Tema"</span> para cambiar entre claro y oscuro.
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
