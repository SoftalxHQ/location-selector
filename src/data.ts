import type { Country, State } from "./types.js";
import countriesJson from "../data/countries.json";
import ngJson from "../data/ng.json";
import ghJson from "../data/gh.json";
import usJson from "../data/us.json";
import gbJson from "../data/gb.json";
import keJson from "../data/ke.json";

export const countries = countriesJson as Country[];

const countryData: Record<string, State[]> = {
  NG: ngJson as State[],
  GH: ghJson as State[],
  US: usJson as State[],
  GB: gbJson as State[],
  KE: keJson as State[],
};

export function getCountryData(countryCode: string): State[] | undefined {
  return countryData[countryCode.toUpperCase()];
}
