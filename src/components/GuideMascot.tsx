import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GuideMascotProps {
  message: string;
  mood?: "happy" | "thinking" | "excited" | "explaining";
}

const MOOD_CONFIG: Record<
  string,
  { emoji: string; bg: string; border: string; text: string; label: string; labelColor: string }
> = {
  happy: {
    emoji: "🦉",
    bg: "bg-yellow-950/50",
    border: "border-yellow-600/50",
    text: "text-yellow-100/90",
    label: "Profe Búho",
    labelColor: "text-yellow-400",
  },
  thinking: {
    emoji: "🤔",
    bg: "bg-blue-950/50",
    border: "border-blue-600/50",
    text: "text-blue-100/90",
    label: "Profe Búho piensa...",
    labelColor: "text-blue-400",
  },
  excited: {
    emoji: "🎉",
    bg: "bg-pink-950/50",
    border: "border-pink-600/50",
    text: "text-pink-100/90",
    label: "¡Profe Búho está emocionado!",
    labelColor: "text-pink-400",
  },
  explaining: {
    emoji: "📚",
    bg: "bg-purple-950/50",
    border: "border-purple-600/50",
    text: "text-purple-100/90",
    label: "Profe Búho explica",
    labelColor: "text-purple-400",
  },
};

export default function GuideMascot({ message, mood = "happy" }: GuideMascotProps) {
  const [visible, setVisible] = useState(true);
  const cfg = MOOD_CONFIG[mood];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className={`flex items-start gap-4 ${cfg.bg} border ${cfg.border} rounded-3xl p-4 relative shadow-lg`}
        >
          {/* Owl avatar */}
          <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
            <motion.div
              animate={{ rotate: [-10, 10, -10], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="text-5xl select-none"
            >
              {cfg.emoji}
            </motion.div>
            <span className={`text-[10px] font-black whitespace-nowrap ${cfg.labelColor}`}>
              {cfg.label}
            </span>
          </div>

          {/* Speech bubble */}
          <div className="relative flex-1 mt-1">
            {/* Triangle pointer */}
            <div
              className="absolute -left-2.5 top-3 w-0 h-0"
              style={{
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "10px solid rgba(255,255,255,0.07)",
              }}
            />
            <div className="bg-white/5 rounded-2xl px-4 py-3">
              <p className={`${cfg.text} text-sm leading-relaxed font-semibold`}>{message}</p>
            </div>
          </div>

          {/* Close button */}
          <motion.button
            onClick={() => setVisible(false)}
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-3 right-3 ${cfg.labelColor} hover:text-white text-xs leading-none transition-colors`}
            aria-label="Cerrar ayuda"
          >
            ✕
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
