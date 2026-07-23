# @softalxhq/location-selector

Framework-agnostic **country → state/region → LGA/district → town** location data for **Nigeria**, **Ghana**, **United States**, **United Kingdom**, and **Kenya**.

JSON is the source of truth — use it from PHP, Python, Ruby on Rails, or any other language. TypeScript helpers are included for Node and browser apps.

## Live demo

Try the cascading picker in the browser: **[https://lsdemo.vercel.app/](https://lsdemo.vercel.app/)**

[![Location selector demo](https://cdn.jsdelivr.net/npm/@softalxhq/location-selector@0.3.0/demo.jpg)](https://lsdemo.vercel.app/)

## Install

```bash
npm install @softalxhq/location-selector
pnpm add @softalxhq/location-selector
yarn add @softalxhq/location-selector
```

## Hierarchy

| API level | Nigeria | Ghana | United States | United Kingdom | Kenya |
| --- | --- | --- | --- | --- | --- |
| Country | `NG` | `GH` | `US` | `GB` | `KE` |
| `getStates` | State (37, incl. FCT) | Region (16) | State (+ DC) | Country (4) | County (47) |
| `getLgas` | LGA | District / MMDA (261) | County / Parish / Borough | Local authority | Sub-county |
| `getTowns` | Town | Town | City / town | Town / city | Ward |

## JavaScript / TypeScript

```ts
import {
  getCountries,
  getStates,
  getLgas,
  getTowns,
} from "@softalxhq/location-selector";

getCountries();
// NG, GH, US, GB, KE

getStates("US");
// [{ name: "California", lgas: [...] }, ...]

getLgas("US", "California");
// [{ name: "Los Angeles County", towns: [...] }, ...]

getTowns("US", "California", "Los Angeles County");
// ["Acton", "Los Angeles", ...]

getStates("GB");
// England, Scotland, Wales, Northern Ireland

getLgas("GB", "England");
// local authorities with nested towns

getStates("KE");
// 47 counties → sub-counties → wards
```

Name matching is case-insensitive. Unknown country/state/LGA returns `[]`.

### Raw JSON (JS)

```ts
import ng from "@softalxhq/location-selector/data/ng.json";
import gh from "@softalxhq/location-selector/data/gh.json";
import us from "@softalxhq/location-selector/data/us.json";
import gb from "@softalxhq/location-selector/data/gb.json";
import ke from "@softalxhq/location-selector/data/ke.json";
import countries from "@softalxhq/location-selector/data/countries.json";
```

## Other languages (JSON)

After install, data lives at:

```text
node_modules/@softalxhq/location-selector/data/countries.json
node_modules/@softalxhq/location-selector/data/ng.json
node_modules/@softalxhq/location-selector/data/gh.json
node_modules/@softalxhq/location-selector/data/us.json
node_modules/@softalxhq/location-selector/data/gb.json
node_modules/@softalxhq/location-selector/data/ke.json
```

Or fetch from a CDN (after publish):

```text
https://cdn.jsdelivr.net/npm/@softalxhq/location-selector/data/us.json
https://cdn.jsdelivr.net/npm/@softalxhq/location-selector/data/gb.json
https://cdn.jsdelivr.net/npm/@softalxhq/location-selector/data/ke.json
```

### Schema

```json
[
  {
    "name": "California",
    "lgas": [
      {
        "name": "Los Angeles County",
        "towns": ["Los Angeles", "Long Beach"]
      }
    ]
  }
]
```

## Data sources

### Nigeria

Bundled state → LGA → town data in `data/ng.json`.

### Ghana

Derived from [Open Admin Data – Ghana](https://github.com/open-admin-data/ghana-administrative-divisions) (CC-BY-4.0), with gazetteer corrections (North East rename, Guan District, capital backfills).

### United States

- Counties: [U.S. Census Bureau 2024 National Counties Gazetteer](https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html)
- Cities: [kelvins/US-Cities-Database](https://github.com/kelvins/US-Cities-Database) (city ↔ county ↔ state)
- Empty counties backfilled with a seat-style name derived from the county name

### United Kingdom

- Local authorities: [mySociety UK local authority names and codes](https://github.com/mysociety/uk_local_authority_names_and_codes) (current lower-tier / unitary)
- Towns: [GeoNames](https://www.geonames.org/) GB dump (CC-BY), matched onto authorities; unmatched authorities backfilled with the authority name

### Kenya

Derived from [Open Admin Data – Kenya](https://github.com/open-admin-data/kenya-administrative-divisions) (CC-BY-4.0) — county → sub-county → ward.

## License

MIT. Upstream datasets retain their licenses (CC-BY-4.0 for Open Admin Data / GeoNames attribution; Census public domain; mySociety data per their repo terms). Attribution above is required when redistributing derived data.
