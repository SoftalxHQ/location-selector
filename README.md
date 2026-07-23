# @softalx/location-selector

Framework-agnostic **country → state → LGA → town** location data, starting with Nigeria.

JSON is the source of truth — use it from PHP, Python, Ruby on Rails, or any other language. TypeScript helpers are included for Node and browser apps.

## Install

```bash
npm install @softalx/location-selector
```

## Hierarchy

| Level | Nigeria example |
| --- | --- |
| Country | `NG` — Nigeria |
| State | Abia, Lagos, FCT, … (37) |
| LGA | Aba North, Ikeja, … |
| Town | Eziama, Ogbo, … |

## JavaScript / TypeScript

```ts
import {
  getCountries,
  getStates,
  getLgas,
  getTowns,
} from "@softalx/location-selector";

getCountries();
// [{ code: "NG", name: "Nigeria" }]

getStates("NG");
// [{ name: "Abia", lgas: [...] }, ...]

getLgas("NG", "Abia");
// [{ name: "Aba North", towns: [...] }, ...]

getTowns("NG", "Abia", "Aba North");
// ["Eziama", "Ogbo", "Uratta", ...]
```

Name matching is case-insensitive. Unknown country/state/LGA returns `[]`.

### Raw JSON (JS)

```ts
import ng from "@softalx/location-selector/data/ng.json";
import countries from "@softalx/location-selector/data/countries.json";
```

## Other languages (JSON)

After install, data lives at:

```text
node_modules/@softalx/location-selector/data/countries.json
node_modules/@softalx/location-selector/data/ng.json
```

Or fetch from a CDN (after publish):

```text
https://cdn.jsdelivr.net/npm/@softalx/location-selector/data/ng.json
https://cdn.jsdelivr.net/npm/@softalx/location-selector/data/countries.json
```

### PHP

```php
$ng = json_decode(file_get_contents(__DIR__ . '/node_modules/@softalx/location-selector/data/ng.json'), true);
$states = $ng; // list of states with nested lgas → towns
```

### Python

```python
import json
from pathlib import Path

ng = json.loads(
    Path("node_modules/@softalx/location-selector/data/ng.json").read_text()
)
states = ng
```

### Ruby on Rails

```ruby
ng = JSON.parse(
  File.read(Rails.root.join("node_modules/@softalx/location-selector/data/ng.json"))
)
states = ng
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
[{ "code": "NG", "name": "Nigeria" }]
```

## Adding another country

1. Add `{ "code": "XX", "name": "…" }` to `data/countries.json`
2. Add `data/xx.json` with the same state → LGA → town shape
3. Register it in the JS data map (for helpers)

## License

MIT
