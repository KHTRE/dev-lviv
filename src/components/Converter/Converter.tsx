import { spawn } from 'child_process';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeRatesForTwo } from '../../Api/Rates';

export const Converter = () => {
  const [userReq, setUserReq] = useState('');
  const [inputError, setInputError] = useState('');
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state: RootState) => state.exchangeRate);
  const moneyAmount = useSelector((state: RootState) => state.moneyAmount);
  const exchangeFrom = useSelector((state: RootState) => state.exchangeFrom);
  const exchangeTo = useSelector((state: RootState) => state.exchangeTo);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserReq(event.target.value);
  };

  const getRates = (event: React.FormEvent) => {
    event.preventDefault();
    const info = userReq.split(' ');
    const regex = /\d+\s\w{3}\sto\s\w{3}/;

    setUserReq('');

    if (regex.test(userReq)) {
      setInputError('');

      dispatch({
        type: 'SET_EXCHANGE_INFO',
        payload: {
          moneyAmount: +info[0],
          exchangeFrom: info[1].toUpperCase(),
          exchangeTo: info[3].toUpperCase(),
        },
      });
    } else {
      setInputError('Please follow this pattern: [money amount] [code] to [code]');
    }

    (async () => {
      const rateForTwo = await getExchangeRatesForTwo(info[1], info[3]);

      dispatch({ type: 'SET_EXCHANGE_RATE', payload: rateForTwo.conversion_rate });
    })();
  };

  const getExchangeRateMessage = () => {
    if (exchangeRate && typeof moneyAmount === 'number') {
      const changeAmount = moneyAmount * exchangeRate;
      const message = `${moneyAmount} ${exchangeFrom} is equal to ${changeAmount} ${exchangeTo}`;

      return (
        <span>{message}</span>
      );
    }

    return (
      <span>Please set correct money amount</span>
    );
  };

  return (
    <>
      <form onSubmit={event => getRates(event)}>
        <input
          type="text"
          value={userReq}
          onChange={handleUserInput}
        />
        <button type="submit">Get rate</button>
      </form>
      {inputError ? <span>{inputError}</span> : getExchangeRateMessage()}
    </>
  );
};
