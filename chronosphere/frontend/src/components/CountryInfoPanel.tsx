"use client";

import { motion } from "framer-motion";
import { usePopulationTween } from "@/hooks/usePopulationTween";
import { HistoricalState } from "@/types";

export function CountryInfoPanel({ state, yearLabel }: { state: HistoricalState | null; yearLabel: string }) {
  const population = usePopulationTween(state?.population ?? 0);

  if (!state) return <div className="glass rounded-2xl p-4 text-sm text-slate-300">Select a territory to inspect.</div>;

  return (
    <motion.div className="glass rounded-2xl p-4 shadow-glow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-lg font-semibold text-cyan-200">{state.name} — {yearLabel}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        <li>Population: <motion.span>{population}</motion.span></li>
        <li>Area: {state.areaKm2.toLocaleString()} km²</li>
        <li>Government: {state.government}</li>
        <li>Timeline Year: {yearLabel}</li>
      </ul>
    </motion.div>
  );
}
