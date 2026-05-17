import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GuideMascotProps {
  message: string;
  mood?: "happy" | "thinking" | "excited" | "explaining";
}

const MOOD_EMOJI: Record<string, string> = {
  happy: "🦉",
  thinking: "🤔",
  excited: "🎉",
  explaining: "📚",
};

export default function GuideMascot({ message, mood = "happy" }: GuideMascotProps) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="flex items-end gap-3 bg-yellow-950/40 border border-yellow-700/50 rounded-2xl p-4 relative"
        >
          {/* Owl avatar */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-4xl select-none"
            >
              {MOOD_EMOJI[mood]}
            </motion.div>
            <span className="text-yellow-400 text-[10px] font-bold mt-0.5 whitespace-nowrap">
              Profe Búho
            </span>
          </div>

          {/* Speech bubble */}
          <div className="relative bg-yellow-900/60 rounded-xl px-4 py-2.5 flex-1">
            {/* Triangle pointer */}
            <div className="absolute -left-2 bottom-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-yellow-900/60" />
            <p className="text-yellow-100 text-sm leading-relaxed">{message}</p>
          </div>

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-yellow-600 hover:text-yellow-400 text-xs leading-none"
            aria-label="Cerrar ayuda"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
