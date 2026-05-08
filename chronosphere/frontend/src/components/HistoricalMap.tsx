"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { interpolate } from "d3-interpolate";
import { HistoricalState } from "@/types";

type Props = {
  year: number;
  onSelectState: (state: HistoricalState) => void;
};

function FlyToYear({ year }: { year: number }) {
  const map = useMap();
  useEffect(() => {
    const zoom = Math.max(2, Math.min(5, 5 - Math.abs(year - 2026) / 1200));
    map.flyTo([20, 0], zoom, { duration: 1.2 });
  }, [map, year]);
  return null;
}

export function HistoricalMap({ year, onSelectState }: Props) {
  const [features, setFeatures] = useState<any>(null);

  const intensity = useMemo(() => interpolate("#00d5ff", "#8f53ff")((Math.abs(year) % 500) / 500), [year]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/timeline/borders/${year}`)
      .then((r) => r.json())
      .then((data) => setFeatures(data));
  }, [year]);

  return (
    <MapContainer center={[20, 0]} zoom={2.2} className="h-[70vh] w-full rounded-3xl" zoomControl={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <FlyToYear year={year} />
      {features && (
        <GeoJSON
          data={features}
          style={() => ({ color: intensity, weight: 1.4, fillOpacity: 0.2 })}
          onEachFeature={(feature, layer) => {
            layer.on("click", () => onSelectState(feature.properties));
          }}
        />
      )}
    </MapContainer>
  );
}
