import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <div className="container">
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <h1 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">Exchange rates</h1>

      <nav className="nav nav-pills">
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
    </header>
  </div>
);
