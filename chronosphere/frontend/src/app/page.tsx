"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { TimelineSlider } from "@/components/TimelineSlider";
import { CountryInfoPanel } from "@/components/CountryInfoPanel";
import { RealtimeChat } from "@/components/RealtimeChat";
import { formatYear } from "@/lib/years";
import { HistoricalState } from "@/types";

const HistoricalMap = dynamic(() => import("@/components/HistoricalMap").then((m) => m.HistoricalMap), { ssr: false });

export default function HomePage() {
  const [year, setYear] = useState(2026);
  const [selected, setSelected] = useState<HistoricalState | null>(null);
  const yearLabel = useMemo(() => formatYear(year), [year]);

  return (
    <main className="min-h-screen p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cyan-200">ChronoSphere</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <HistoricalMap year={year} onSelectState={setSelected} />
          <TimelineSlider year={year} onYearChange={setYear} />
        </div>
        <div className="space-y-4">
          <CountryInfoPanel state={selected} yearLabel={yearLabel} />
          <RealtimeChat />
        </div>
      </div>
    </main>
  );
}
