const GET_LOCATION_URL = 'https://extreme-ip-lookup.com/json/?key=ShlUFaRmsfAKK67LzO49';

export const getUserLocation = (): Promise<Location> => {
  // eslint-disable-next-line no-console
  console.log('req to location server'); // убедимся, что нет лишних запросов

  return fetch(GET_LOCATION_URL)
    .then(responce => responce.json());
};
