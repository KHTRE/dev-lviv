import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeRates } from '../../Api/Rates';
import { codes } from '../../Api/CurrencyCodes';

export const Exchange = () => {
  const dispatch = useDispatch();
  const userCurrencyCode = useSelector((state: RootState) => state.userCurrencyCode);
  const exchangeRates = useSelector((state: RootState) => state.exchangeRates);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const allRates = await getExchangeRates(userCurrencyCode);

      if (allRates.result !== 'error') {
        const exchangeRatesFromServer = Object.entries(allRates.conversion_rates);

        dispatch({ type: 'SET_EXCHANGE_RATES', payload: exchangeRatesFromServer });
      } else {
        setError('We got some error while loading data from server');
      }
    })();
  }, [userCurrencyCode]);

  const setUserCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_USER_CURRENCY', payload: event.target.value });
  };

  const getSelectOptions = () => {
    if (exchangeRates) {
      const currencyList = exchangeRates.filter(rate => (
        rate[0] !== 'USD' && rate[0] !== 'EUR' && rate[0] !== 'UAH'
      ));

      return (currencyList.map(rate => (
        <option key={rate[0]} value={rate[0]}>{rate[0]}</option>
      )));
    }

    const currencyList = Object.values(codes).filter(rate => (
      rate[0] !== 'USD' && rate[0] !== 'EUR' && rate[0] !== 'UAH'
    ));

    currencyList.sort();

    return (currencyList.map(currency => (
      <option key={currency} value={currency}>{currency}</option>
    )));
  };

  return (
    <div className="flex-wrap justify-content-center py-3 mb-4">
      <span>Please choose an option</span>
      <select
        onChange={setUserCurrency}
        className="form-select"
      >
        {userCurrencyCode
          ? <option value={userCurrencyCode}>{userCurrencyCode}</option>
          : <option value="USD">USD</option>}
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="EUR">EUR</option>
        {getSelectOptions()}
      </select>
      {error && <span>{error}</span>}
      <ul>
        {exchangeRates.map(rate => (
          <li key={rate[0]}>
            {rate[0]}
            --
            {rate[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};
