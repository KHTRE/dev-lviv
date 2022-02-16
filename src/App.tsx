import { Route, Routes } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import Navigation from './components/Navigation';
import WrongPage from './components/WrongPage';
import Converter from './components/Converter';
import { getUserLocation } from './Api/Location';
import { getCurrencyCode } from './Api/Rates';

const LazyExchange = lazy(() => import('./components/Exchange'));

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

  const getLazyExchange = () => (
    <Suspense fallback={<div>Loading data...</div>}>
      <LazyExchange />
    </Suspense>
  );

  return (
    <div className="d-flex flex-wrap justify-content-center py-3 mb-4">
      <Navigation />
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="/exchange-rates" element={getLazyExchange()} />
        <Route path="*" element={<WrongPage />} />
      </Routes>
    </div>
  );
};

export default App;
