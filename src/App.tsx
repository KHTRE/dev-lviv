import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.scss';
import './styles/general.scss';
import Navigation from './components/Navigation';
import WrongPage from './components/WrongPage';
import Converter from './components/Converter';
import Exchange from './components/Exchange';
import { getUserLocation } from './Api/Location';
import { getCurrencyCode } from './Api/Rates';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const locationInfo = await getUserLocation();
      const userCountryCode = locationInfo.countryCode;
      const userCurrencyCode = getCurrencyCode(userCountryCode);

      dispatch({ type: 'SET_USER_CURRENCY', payload: userCurrencyCode });
    })();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1>Exchanges rates</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/exchange-rates" element={<Exchange />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
