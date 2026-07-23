import { describe, expect, it } from "vitest";
import {
  getCountries,
  getLgas,
  getStates,
  getTowns,
} from "../src/index.js";

describe("getCountries", () => {
  it("includes Nigeria", () => {
    const list = getCountries();
    expect(list).toEqual([{ code: "NG", name: "Nigeria" }]);
  });
});

describe("getStates", () => {
  it("returns 37 Nigerian states including FCT", () => {
    const states = getStates("NG");
    expect(states).toHaveLength(37);
    expect(states.map((s) => s.name)).toContain("Abia");
    expect(states.map((s) => s.name)).toContain("FCT");
    expect(states.map((s) => s.name)).toContain("Zamfara");
  });

  it("is case-insensitive for country code", () => {
    expect(getStates("ng")).toHaveLength(37);
  });

  it("returns [] for unknown country", () => {
    expect(getStates("XX")).toEqual([]);
  });
});

describe("getLgas", () => {
  it("returns Abia LGAs", () => {
    const lgas = getLgas("NG", "Abia");
    expect(lgas.length).toBeGreaterThan(0);
    expect(lgas.map((l) => l.name)).toContain("Aba North");
    expect(lgas.map((l) => l.name)).toContain("Umuahia North");
  });

  it("matches state names case-insensitively", () => {
    expect(getLgas("NG", "abia").map((l) => l.name)).toContain("Aba North");
  });

  it("returns [] for unknown state", () => {
    expect(getLgas("NG", "NotAState")).toEqual([]);
  });

  it("returns [] for unknown country", () => {
    expect(getLgas("XX", "Abia")).toEqual([]);
  });
});

describe("getTowns", () => {
  it("returns towns for Aba North", () => {
    const towns = getTowns("NG", "Abia", "Aba North");
    expect(towns).toEqual(
      expect.arrayContaining([
        "Eziama",
        "Ogbo",
        "Uratta",
        "Osusu",
        "Umuola-Egbule",
        "Umuola-Okpulor",
        "Umuokoji",
      ]),
    );
    expect(towns).toHaveLength(7);
  });

  it("matches LGA names case-insensitively", () => {
    expect(getTowns("NG", "abia", "aba north")).toContain("Eziama");
  });

  it("returns [] for unknown LGA", () => {
    expect(getTowns("NG", "Abia", "NotAnLga")).toEqual([]);
  });

  it("returns [] for unknown state", () => {
    expect(getTowns("NG", "NotAState", "Aba North")).toEqual([]);
  });
});
