import { describe, expect, it } from "vitest";
import { getLgas, getStates, getTowns } from "../src/index.js";

describe("Ghana (GH)", () => {
  it("returns 16 regions including North East (not Northern East)", () => {
    const regions = getStates("GH");
    expect(regions).toHaveLength(16);
    const names = regions.map((r) => r.name);
    expect(names).toContain("Ashanti");
    expect(names).toContain("Greater Accra");
    expect(names).toContain("North East");
    expect(names).not.toContain("Northern East");
  });

  it("is case-insensitive for country code", () => {
    expect(getStates("gh")).toHaveLength(16);
  });

  it("has 261 districts total", () => {
    const total = getStates("GH").reduce((n, r) => n + r.lgas.length, 0);
    expect(total).toBe(261);
  });

  it("includes Guan as the 9th Oti district", () => {
    const oti = getLgas("GH", "Oti");
    expect(oti).toHaveLength(9);
    expect(oti.map((d) => d.name)).toContain("Guan");
    expect(getTowns("GH", "Oti", "Guan")).toContain("Likpe-Mate");
  });

  it("returns towns for Asunafo North Municipal", () => {
    const towns = getTowns("GH", "Ahafo", "Asunafo North Municipal");
    expect(towns).toContain("Goaso");
  });

  it("matches region and district names case-insensitively", () => {
    expect(getTowns("GH", "ahafo", "asunafo north municipal")).toContain(
      "Goaso",
    );
  });

  it("returns [] for unknown region or district", () => {
    expect(getLgas("GH", "NotARegion")).toEqual([]);
    expect(getTowns("GH", "Ahafo", "NotADistrict")).toEqual([]);
  });
});
