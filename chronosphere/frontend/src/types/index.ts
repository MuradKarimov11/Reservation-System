export type HistoricalState = {
  id: string;
  name: string;
  government: string;
  areaKm2: number;
  population: number;
  validFrom: number;
  validTo: number;
  geoJsonUrl: string;
};

export type TimelineState = {
  year: number;
  era: "BCE" | "CE";
};
