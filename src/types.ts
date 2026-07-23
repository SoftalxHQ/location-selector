export type CountryCode = string;

export interface Country {
  code: CountryCode;
  name: string;
}

export interface Lga {
  name: string;
  towns: string[];
}

export interface State {
  name: string;
  lgas: Lga[];
}
