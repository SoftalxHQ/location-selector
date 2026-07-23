import { countries, getCountryData } from "./data.js";
import type { Country, CountryCode, Lga, State } from "./types.js";

export type { Country, CountryCode, Lga, State };

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function findByName<T extends { name: string }>(
  items: T[],
  name: string,
): T | undefined {
  const target = normalize(name);
  return items.find((item) => normalize(item.name) === target);
}

/** Returns the list of supported countries. */
export function getCountries(): Country[] {
  return countries;
}

/**
 * Returns states for a country code (e.g. `"NG"`).
 * Returns an empty array when the country is unknown.
 */
export function getStates(countryCode: CountryCode): State[] {
  return getCountryData(countryCode) ?? [];
}

/**
 * Returns LGAs for a state within a country.
 * Matching is case-insensitive. Returns `[]` when not found.
 */
export function getLgas(countryCode: CountryCode, stateName: string): Lga[] {
  const states = getCountryData(countryCode);
  if (!states) return [];
  return findByName(states, stateName)?.lgas ?? [];
}

/**
 * Returns towns for an LGA within a state and country.
 * Matching is case-insensitive. Returns `[]` when not found.
 */
export function getTowns(
  countryCode: CountryCode,
  stateName: string,
  lgaName: string,
): string[] {
  const lgas = getLgas(countryCode, stateName);
  if (lgas.length === 0) return [];
  return findByName(lgas, lgaName)?.towns ?? [];
}
