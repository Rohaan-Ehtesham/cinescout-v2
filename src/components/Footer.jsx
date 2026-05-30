import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">STAGE<span>SCOUT</span></div>
          <p>A live events companion for Karachi and Lahore.</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/venues">Venues</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Cities</h4>
          <ul>
            <li><Link to="/venues">Karachi</Link></li>
            <li><Link to="/venues">Lahore</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 StageScout. Live events discovery.</p>
      </div>
    </footer>
  );
}
