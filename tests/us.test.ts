import { describe, expect, it } from "vitest";
import { getCountries, getLgas, getStates, getTowns } from "../src/index.js";

describe("United States (US)", () => {
  it("is registered", () => {
    expect(getCountries().some((c) => c.code === "US")).toBe(true);
  });

  it("returns 50 states plus DC", () => {
    const states = getStates("US");
    expect(states).toHaveLength(51);
    const names = states.map((s) => s.name);
    expect(names).toContain("California");
    expect(names).toContain("District of Columbia");
    expect(names).toContain("Texas");
  });

  it("returns Los Angeles County cities including Los Angeles", () => {
    const counties = getLgas("US", "California");
    expect(counties.map((c) => c.name)).toContain("Los Angeles County");
    const towns = getTowns("US", "California", "Los Angeles County");
    expect(towns).toContain("Los Angeles");
    expect(towns.length).toBeGreaterThan(10);
  });

  it("returns [] for unknown names", () => {
    expect(getLgas("US", "NotAState")).toEqual([]);
    expect(getTowns("US", "California", "NotACounty")).toEqual([]);
  });
});
