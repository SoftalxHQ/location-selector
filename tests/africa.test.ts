import { describe, expect, it } from "vitest";
import { getCountries, getLgas, getStates, getTowns } from "../src/index.js";

const NEW = [
  { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" },
  { code: "ET", name: "Ethiopia" },
  { code: "TZ", name: "Tanzania" },
  { code: "UG", name: "Uganda" },
  { code: "RW", name: "Rwanda" },
  { code: "SN", name: "Senegal" },
  { code: "MA", name: "Morocco" },
] as const;

describe("African countries batch", () => {
  it("registers all eight countries", () => {
    const codes = getCountries().map((c) => c.code);
    for (const c of NEW) {
      expect(codes).toContain(c.code);
      expect(getCountries()).toContainEqual(c);
    }
  });

  it("ZA: 9 provinces, Gauteng Sedibeng includes Emfuleni", () => {
    expect(getStates("ZA")).toHaveLength(9);
    const districts = getLgas("ZA", "Gauteng").map((d) => d.name);
    expect(districts).toContain("Sedibeng");
    expect(districts).toContain("City of Johannesburg");
    expect(getTowns("ZA", "Gauteng", "Sedibeng")).toEqual(
      expect.arrayContaining(["Emfuleni", "Lesedi", "Midvaal"]),
    );
    // wards were numeric in upstream data — third level is municipalities
    expect(getTowns("ZA", "Gauteng", "Sedibeng").every((t) => !/^\d+$/.test(t))).toBe(
      true,
    );
  });

  it("EG: 27 governorates including Cairo", () => {
    expect(getStates("EG")).toHaveLength(27);
    expect(getLgas("EG", "Cairo").length).toBeGreaterThan(0);
    const first = getLgas("EG", "Cairo")[0]!;
    expect(getTowns("EG", "Cairo", first.name).length).toBeGreaterThan(0);
  });

  it("ET: regions including Addis Ababa", () => {
    expect(getStates("ET").map((s) => s.name)).toContain("Addis Ababa");
    expect(getStates("ET").length).toBeGreaterThanOrEqual(14);
  });

  it("TZ: 31 regions including Dar-es-salaam", () => {
    expect(getStates("TZ")).toHaveLength(31);
    expect(getLgas("TZ", "Dar-es-salaam").length).toBeGreaterThan(0);
  });

  it("UG: 4 regions with districts", () => {
    expect(getStates("UG")).toHaveLength(4);
    expect(getLgas("UG", "Central").length).toBeGreaterThan(0);
  });

  it("RW: 5 provinces including Kigali City", () => {
    expect(getStates("RW")).toHaveLength(5);
    expect(getLgas("RW", "Kigali City").length).toBe(3);
  });

  it("SN: 14 regions including Dakar", () => {
    expect(getStates("SN")).toHaveLength(14);
    expect(getLgas("SN", "Dakar").length).toBeGreaterThan(0);
  });

  it("MA: 10 regions including Casablanca Settat", () => {
    expect(getStates("MA")).toHaveLength(10);
    expect(getLgas("MA", "Casablanca Settat").length).toBeGreaterThan(0);
  });

  it("returns [] for unknown names", () => {
    expect(getLgas("ZA", "NotAProvince")).toEqual([]);
    expect(getTowns("RW", "Kigali City", "NotASector")).toEqual([]);
  });
});
