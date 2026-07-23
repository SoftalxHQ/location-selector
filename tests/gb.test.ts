import { describe, expect, it } from "vitest";
import { getCountries, getLgas, getStates, getTowns } from "../src/index.js";

describe("United Kingdom (GB)", () => {
  it("is registered", () => {
    expect(getCountries().some((c) => c.code === "GB")).toBe(true);
  });

  it("returns four countries", () => {
    const nations = getStates("GB");
    expect(nations).toHaveLength(4);
    expect(nations.map((n) => n.name)).toEqual([
      "England",
      "Scotland",
      "Wales",
      "Northern Ireland",
    ]);
  });

  it("returns English local authorities with towns", () => {
    const las = getLgas("GB", "England");
    expect(las.length).toBeGreaterThan(200);
    expect(las.map((l) => l.name)).toContain("Manchester");
    const towns = getTowns("GB", "England", "Manchester");
    expect(towns).toContain("Manchester");
    expect(towns.length).toBeGreaterThan(0);
  });

  it("returns Scottish council areas", () => {
    const las = getLgas("GB", "Scotland");
    expect(las).toHaveLength(32);
  });

  it("returns [] for unknown names", () => {
    expect(getLgas("GB", "NotACountry")).toEqual([]);
    expect(getTowns("GB", "England", "NotAnAuthority")).toEqual([]);
  });
});
