// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Location {
  businessName: string;
  businessWebsite: string;
  city: string;
  continent: string;
  country: string;
  countryCode: string;
  ipName: string;
  ipType: string;
  isp: string;
  lat: string;
  lon: string;
  org: string;
  query: string;
  region: string;
  status: string;
}

interface RootState {
  userCurrencyCode: string;
  moneyAmount: number;
  exchangeFrom: string;
  exchangeTo: string;
  exchangeRates: [];
  exchangeRate: number;
}

interface Rates {
  base_code: string;
  conversion_rates: {};
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: number
  time_last_update_utc: string;
  time_next_update_unix: number
  time_next_update_utc: string;
}

interface TwoRates {
  base_code: string;
  conversion_rate: number;
  documentation: string;
  result: string;
  target_code: string;
  terms_of_use: string;
  time_last_update_unix: number
  time_last_update_utc: string;
  time_next_update_unix: number
  time_next_update_utc: string;
}
