import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeRates } from '../../Api/Rates';

export const Exchange = () => {
  const dispatch = useDispatch();
  const userCurrencyCode = useSelector((state: RootState) => state.userCurrencyCode);
  const exchangeRates = useSelector((state: RootState) => state.exchangeRates);

  useEffect(() => {
    (async () => {
      const allRates = await getExchangeRates(userCurrencyCode);
      const exchangeRatesFromServer = Object.entries(allRates.conversion_rates);

      dispatch({ type: 'SET_EXCHANGE_RATES', payload: exchangeRatesFromServer });
    })();
  }, []);

  return (
    <ul>
      {exchangeRates.map(rate => (
        <li>{rate}</li>
      ))}
    </ul>
  );
};
