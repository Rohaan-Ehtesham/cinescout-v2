import { NavLink } from 'react-router-dom';

export default function NavBar({ city, onToggleCity, navOpen, setNavOpen }) {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        STAGE<span>SCOUT</span>
      </NavLink>
      <div className={navOpen ? 'nav-links open' : 'nav-links'}>
        <NavLink to="/" end onClick={() => setNavOpen(false)}>Home</NavLink>
        <NavLink to="/events" onClick={() => setNavOpen(false)}>Events</NavLink>
        <NavLink to="/venues" onClick={() => setNavOpen(false)}>Venues</NavLink>
        <NavLink to="/schedule" onClick={() => setNavOpen(false)}>Schedule</NavLink>
        <NavLink to="/about" onClick={() => setNavOpen(false)}>About</NavLink>
      </div>
      <div className="nav-city">
        <button className="city-badge" onClick={onToggleCity} aria-label="Switch city">
          {city} ↔
        </button>
      </div>
      <button className="nav-hamburger" aria-label="Menu" onClick={() => setNavOpen((open) => !open)}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
