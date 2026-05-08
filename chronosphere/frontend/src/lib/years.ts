export const YEAR_MIN = -3000;
export const YEAR_MAX = 2026;

export const formatYear = (year: number) => `${Math.abs(year)} ${year < 0 ? "BCE" : "CE"}`;
