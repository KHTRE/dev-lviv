import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <nav className="nav nav-pills nav-fill">
    <NavLink
      to="/"
      className={({
        isActive,
      }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
    >
      Converter
    </NavLink>
    <NavLink
      to="/exchange-rates"
      className={({
        isActive,
      }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
    >
      Exchange rates
    </NavLink>
  </nav>
);
