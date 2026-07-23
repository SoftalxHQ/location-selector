import type { Country, State } from "./types.js";
import countriesJson from "../data/countries.json";
import ngJson from "../data/ng.json";

export const countries = countriesJson as Country[];

const countryData: Record<string, State[]> = {
  NG: ngJson as State[],
};

export function getCountryData(countryCode: string): State[] | undefined {
  return countryData[countryCode.toUpperCase()];
}
