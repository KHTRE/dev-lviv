import { codes } from './CurrencyCodes';

// const GET_RATES_URL = 'http://data.fixer.io/api/symbols?access_key=b8d04efede0b470b37e54faac721843b';
const GET_RATES_BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const API_KEY = '95b20943d764a3594a574bb0';

export const getExchangeRates = (userCurrency: string): Promise<Rates> => {
  // eslint-disable-next-line no-console
  console.log('req to rates server'); // убедимся, что нет лишних запросов

  return fetch(`${GET_RATES_BASE_URL}${API_KEY}/latest/${userCurrency}`)
    .then(responce => responce.json());
};

export const getCurrencyCode = (userCountry: string) => {
  return codes[userCountry];
};

export const getExchangeRatesForTwo = (
  currencyFrom: string,
  currencyTo: string,
): Promise<TwoRates> => {
  // eslint-disable-next-line no-console
  console.log('req to rates server'); // убедимся, что нет лишних запросов

  return fetch(`${GET_RATES_BASE_URL}${API_KEY}/pair/${currencyFrom}/${currencyTo}`)
    .then(responce => responce.json());
};
