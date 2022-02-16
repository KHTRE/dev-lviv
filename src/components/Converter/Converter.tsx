import { useState } from 'react';
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

      if (rateForTwo.result !== 'error') {
        dispatch({ type: 'SET_EXCHANGE_RATE', payload: rateForTwo.conversion_rate });
      } else {
        setInputError('We got some error while loading data from server');
      }
    })();
  };

  const getExchangeRateMessage = () => {
    if (exchangeRate && typeof moneyAmount === 'number') {
      const changeAmount = Math.round(moneyAmount * exchangeRate * 100) / 100;
      const message = `${moneyAmount} ${exchangeFrom} is equal to ${changeAmount} ${exchangeTo}`;

      return (
        <span>{message}</span>
      );
    }

    return '';
  };

  return (
    <form
      onSubmit={event => getRates(event)}
      className="col-md-12 text-center"
    >
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Please enter a sentence like &quot;100 USD to UAH&quot;
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userReq}
            onChange={handleUserInput}
          />
          <div id="emailHelp" className="form-text">{inputError ? <span>{inputError}</span> : getExchangeRateMessage()}</div>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Get rate</button>
    </form>
  );
};
