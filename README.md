# @softalxhq/location-selector

Framework-agnostic **country → state/region → LGA/district → town** location data for **Nigeria** and **Ghana**.

JSON is the source of truth — use it from PHP, Python, Ruby on Rails, or any other language. TypeScript helpers are included for Node and browser apps.

## Install

```bash
npm install @softalxhq/location-selector
pnpm add @softalxhq/location-selector
yarn add @softalxhq/location-selector
```

## Hierarchy

| API level | Nigeria | Ghana |
| --- | --- | --- |
| Country | `NG` | `GH` |
| `getStates` | State (37, incl. FCT) | Region (16) |
| `getLgas` | LGA | District / MMDA (261) |
| `getTowns` | Town | Town |

## JavaScript / TypeScript

```ts
import {
  getCountries,
  getStates,
  getLgas,
  getTowns,
} from "@softalxhq/location-selector";

getCountries();
// [{ code: "NG", name: "Nigeria" }, { code: "GH", name: "Ghana" }]

getStates("NG");
// [{ name: "Abia", lgas: [...] }, ...]

getLgas("NG", "Abia");
// [{ name: "Aba North", towns: [...] }, ...]

getTowns("NG", "Abia", "Aba North");
// ["Eziama", "Ogbo", "Uratta", ...]

getStates("GH");
// [{ name: "Ahafo", lgas: [...] }, ...]

getLgas("GH", "Ahafo");
// [{ name: "Asunafo North Municipal", towns: [...] }, ...]

getTowns("GH", "Ahafo", "Asunafo North Municipal");
// ["Akrodie", "Goaso", ...]
```

Name matching is case-insensitive. Unknown country/state/LGA returns `[]`.

### Raw JSON (JS)

```ts
import ng from "@softalxhq/location-selector/data/ng.json";
import gh from "@softalxhq/location-selector/data/gh.json";
import countries from "@softalxhq/location-selector/data/countries.json";
```

## Other languages (JSON)

After install, data lives at:

```text
node_modules/@softalxhq/location-selector/data/countries.json
node_modules/@softalxhq/location-selector/data/ng.json
node_modules/@softalxhq/location-selector/data/gh.json
```

Or fetch from a CDN (after publish):

```text
https://cdn.jsdelivr.net/npm/@softalxhq/location-selector/data/ng.json
https://cdn.jsdelivr.net/npm/@softalxhq/location-selector/data/gh.json
https://cdn.jsdelivr.net/npm/@softalxhq/location-selector/data/countries.json
```

### PHP

```php
$gh = json_decode(file_get_contents(__DIR__ . '/node_modules/@softalxhq/location-selector/data/gh.json'), true);
$regions = $gh; // list of regions with nested districts → towns
```

### Python

```python
import json
from pathlib import Path

gh = json.loads(
    Path("node_modules/@softalxhq/location-selector/data/gh.json").read_text()
)
regions = gh
```

### Ruby on Rails

```ruby
gh = JSON.parse(
  File.read(Rails.root.join("node_modules/@softalxhq/location-selector/data/gh.json"))
)
regions = gh
```

### Schema

```json
[
  {
    "name": "Abia",
    "lgas": [
      {
        "name": "Aba North",
        "towns": ["Eziama", "Ogbo"]
      }
    ]
  }
]
```

`countries.json`:

```json
[
  { "code": "NG", "name": "Nigeria" },
  { "code": "GH", "name": "Ghana" }
]
```

## Adding another country

1. Add `{ "code": "XX", "name": "…" }` to `data/countries.json`
2. Add `data/xx.json` with the same state → LGA → town shape
3. Register it in the JS data map (for helpers)

## Data sources

### Nigeria

Bundled state → LGA → town data in `data/ng.json`.

### Ghana

Ghana data in `data/gh.json` is derived from [Open Admin Data – Ghana administrative divisions](https://github.com/open-admin-data/ghana-administrative-divisions) (CC-BY-4.0), transformed into this package’s schema.

Gazetteer corrections applied on top of that source:

- Region name **Northern East** → **North East** (ISO `GH-NE`)
- Added **Guan** district in **Oti** (261st MMDA; LI 2416 / inaugurated Oct 2021) with capital **Likpe-Mate**
- Districts that had no towns in the upstream dataset were backfilled with their administrative capital from Wikipedia / [ghanadistricts.com](https://ghanadistricts.com)

## License

MIT. Ghana source data is CC-BY-4.0 (Open Admin Data); attribution above satisfies that license when redistributing.
