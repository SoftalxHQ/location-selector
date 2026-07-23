import type { Country, State } from "./types.js";
import countriesJson from "../data/countries.json";
import ngJson from "../data/ng.json";
import ghJson from "../data/gh.json";
import usJson from "../data/us.json";
import gbJson from "../data/gb.json";
import keJson from "../data/ke.json";
import zaJson from "../data/za.json";
import egJson from "../data/eg.json";
import etJson from "../data/et.json";
import tzJson from "../data/tz.json";
import ugJson from "../data/ug.json";
import rwJson from "../data/rw.json";
import snJson from "../data/sn.json";
import maJson from "../data/ma.json";

export const countries = countriesJson as Country[];

const countryData: Record<string, State[]> = {
  NG: ngJson as State[],
  GH: ghJson as State[],
  US: usJson as State[],
  GB: gbJson as State[],
  KE: keJson as State[],
  ZA: zaJson as State[],
  EG: egJson as State[],
  ET: etJson as State[],
  TZ: tzJson as State[],
  UG: ugJson as State[],
  RW: rwJson as State[],
  SN: snJson as State[],
  MA: maJson as State[],
};

export function getCountryData(countryCode: string): State[] | undefined {
  return countryData[countryCode.toUpperCase()];
}
