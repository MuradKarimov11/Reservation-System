"use client";

import { motion } from "framer-motion";
import { YEAR_MAX, YEAR_MIN, formatYear } from "@/lib/years";

type Props = { year: number; onYearChange: (year: number) => void };

export function TimelineSlider({ year, onYearChange }: Props) {
  return (
    <motion.div className="glass rounded-2xl p-4 shadow-glow" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="mb-2 text-xs text-cyan-200">Chrono Timeline • {formatYear(year)}</div>
      <input
        type="range"
        min={YEAR_MIN}
        max={YEAR_MAX}
        step={1}
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="w-full accent-cyan-400"
      />
    </motion.div>
  );
}
