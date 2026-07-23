import { describe, expect, it } from "vitest";
import { getCountries, getLgas, getStates, getTowns } from "../src/index.js";

describe("Kenya (KE)", () => {
  it("is registered", () => {
    expect(getCountries().some((c) => c.code === "KE")).toBe(true);
  });

  it("returns 47 counties", () => {
    expect(getStates("KE")).toHaveLength(47);
    expect(getStates("KE").map((s) => s.name)).toContain("Nairobi");
  });

  it("returns Nairobi sub-counties and wards", () => {
    const subs = getLgas("KE", "Nairobi");
    expect(subs.length).toBeGreaterThan(0);
    const first = subs[0]!;
    expect(getTowns("KE", "Nairobi", first.name).length).toBeGreaterThan(0);
  });

  it("returns [] for unknown names", () => {
    expect(getLgas("KE", "NotACounty")).toEqual([]);
    expect(getTowns("KE", "Nairobi", "NotAWard")).toEqual([]);
  });
});
