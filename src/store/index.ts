import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  SET_EXCHANGE_INFO,
  SET_USER_CURRENCY,
  SET_EXCHANGE_RATES,
  SET_EXCHANGE_RATE,
} from './actinTypes';

// Action types - is just a constant. MUST have a unique value.
// const SET_USER_CURRENCY = 'SET_USER_CURRENCY';
// const SET_EXCHANGE_INFO = 'SET_EXCHANGE_INFO';
// const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES';
// const SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE';

const initialState: RootState = {
  userCurrencyCode: '',
  moneyAmount: 0,
  exchangeFrom: '',
  exchangeTo: '',
  exchangeRates: [],
  exchangeRate: 0,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER_CURRENCY:
      return {
        ...state,
        userCurrencyCode: action.payload,
      };

    case SET_EXCHANGE_INFO:
      return {
        ...state,
        moneyAmount: action.payload.moneyAmount,
        exchangeFrom: action.payload.exchangeFrom,
        exchangeTo: action.payload.exchangeTo,
      };

    case SET_EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.payload,
      };

    case SET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer, composeWithDevTools());

export default store;
