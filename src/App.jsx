import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { alerts, events, seatLayout, upcomingEvents, venues } from './data.js';
import CityModal from './components/CityModal.jsx';
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import SeatMap from './components/SeatMap.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function Home({ city }) {
  const [query, setQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const featured = events.filter((event) => event.city === city).slice(0, 5);
  const topEvents = featured.slice(0, 3);
  const topVenues = venues.filter((venue) => venue.city === city).slice(0, 3);
  const carouselItems = upcomingEvents;
  const currentRelease = carouselItems[carouselIndex];

  const handleSearch = () => {
    navigate(`/events?search=${encodeURIComponent(query)}`);
  };

  const nextSlide = () => {
    setCarouselIndex((current) => (current + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex((current) => (current - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hot-banner">
              <span>Hot Right Now</span>
              <span>Limited seats available across the city. Book before they sell out.</span>
            </div>
            <div className="tag">Live in {city}</div>
            <h1>Find your next <em>live</em> experience</h1>
            <p>Discover concerts, theatre, festivals and city shows with seat maps, tickets, and venue details.</p>
            <div className="hero-actions">
              <Link to="/events" className="btn btn-primary">🎤 Explore Events</Link>
              <Link to="/venues" className="btn btn-outline">🏟 Venues</Link>
            </div>
            <div className="hero-stats">
              <span className="hero-stat">{featured.length}+ curated events</span>
              <span className="hero-stat">{topVenues.length} top venues</span>
              <span className="hero-stat">Instant ticket alerts</span>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search artists, venues, or genres…"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
          <div className="hero-side">
            <div className="hero-panel">
              <div className="panel-tag">Top events in {city}</div>
              <div className="panel-headline">This week’s busiest stages</div>
              <p className="panel-copy">A curated roundup of the most buzzed-about live shows happening in your city.</p>
              <div className="panel-cards">
                {topEvents.map((event) => (
                  <div key={event.id} className="panel-card">
                    <div className="panel-card-title">{event.title}</div>
                    <div className="panel-card-meta">{event.artist} · {event.date}</div>
                    <div className="panel-card-meta">{event.venueName}</div>
                  </div>
                ))}
              </div>
              <Link to="/events" className="btn btn-primary panel-cta">View full list</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section carousel-section">
        <div className="carousel-header">
          <div>
            <div className="section-tag">Discover New Releases</div>
            <h2>New <span>Releases</span></h2>
          </div>
          <div className="carousel-controls">
            <button type="button" className="btn btn-outline" onClick={prevSlide}>← Prev</button>
            <button type="button" className="btn btn-outline" onClick={nextSlide}>Next →</button>
          </div>
        </div>
        <div className="carousel-card" style={currentRelease.coverImage ? { backgroundImage: `url(${currentRelease.coverImage})` } : {}}>
          <div className="carousel-overlay">
            <div className="carousel-tag">{currentRelease.genre}</div>
            <h3>{currentRelease.title}</h3>
            <p>{currentRelease.artist}</p>
            <div className="carousel-meta">{currentRelease.release} · {currentRelease.tags.join(' · ')}</div>
            <Link to="/schedule" className="btn btn-primary">See Schedule</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-tag">Now Playing</div>
            <h2>Featured <span>Events</span></h2>
          </div>
          <Link to="/events" className="btn btn-outline">View All →</Link>
        </div>

        <div className="events-grid">
          {featured.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-poster" style={event.coverImage ? { backgroundImage: `url(${event.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {!event.coverImage && event.poster}
              </div>
              <div className="event-body">
                <div className="event-title">{event.title}</div>
                <div className="event-meta">{event.genre} · {event.artist}</div>
                <div className="event-info">{event.venueName} · {event.date}</div>
                <Link to={`/event/${event.id}`} className="btn btn-primary">Book Tickets</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-header">
          <div>
            <div className="section-tag">Hot stages</div>
            <h2>Top <span>Venues</span></h2>
          </div>
          <Link to="/venues" className="btn btn-outline">Browse Venues →</Link>
        </div>

        <div className="venues-grid">
          {topVenues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <div className="venue-header">🎼</div>
              <div className="venue-body">
                <div className="venue-name">{venue.name}</div>
                <div className="venue-location">{venue.location}</div>
                <div className="venue-tags">
                  {venue.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="venue-tag">{tag}</span>
                  ))}
                </div>
                <p className="venue-desc">{venue.description}</p>
              </div>
              <Link to={`/venue/${venue.id}`} className="btn btn-outline">View →</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Events({ city }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialSearch);
  const [genre, setGenre] = useState('all');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  const filtered = useMemo(
    () =>
      events.filter((event) => {
        if (event.city !== city) return false;
        const lowerQuery = query.toLowerCase();
        const matchesQuery =
          event.title.toLowerCase().includes(lowerQuery) ||
          event.artist.toLowerCase().includes(lowerQuery) ||
          event.venueName.toLowerCase().includes(lowerQuery);
        const matchesGenre = genre === 'all' || event.tags.includes(genre);
        return matchesQuery && matchesGenre;
      }),
    [city, genre, query]
  );

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="tag">Live events</div>
          <h1>Events in {city}</h1>
          <p>Browse concerts, theatre shows, and festivals happening now.</p>
        </div>
      </div>

      <div className="section">
        <div className="stats-panel">
          <div className="stats-card">
            <strong>{filtered.length}</strong>
            Events matching your search
          </div>
          <div className="stats-card">
            <strong>{city}</strong>
            Current city
          </div>
          <div className="stats-card">
            <strong>{genre === 'all' ? 'All genres' : genre.charAt(0).toUpperCase() + genre.slice(1)}</strong>
            Selected filter
          </div>
        </div>

        <div className="search-bar">
          <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search events…" className="search-input" />
          <button>🔍</button>
        </div>

        <div className="filter-bar">
          {['all', 'concert', 'theatre', 'festival', 'comedy', 'local'].map((option) => (
            <button key={option} type="button" className={`filter-chip ${genre === option ? 'active' : ''}`} onClick={() => setGenre(option)}>
              {option === 'all' ? 'All' : option === 'local' ? 'Local' : option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <div className="events-grid">
          {filtered.length ? (
            filtered.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-poster">{event.poster}</div>
                <div className="event-body">
                  <div className="event-title">{event.title}</div>
                  <div className="event-meta">{event.artist}</div>
                  <div className="event-info">{event.venueName} · {event.date}</div>
                  <Link to={`/event/${event.id}`} className="btn btn-primary">Details</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No events found.</div>
          )}
        </div>
      </div>
    </main>
  );
}

function Venues({ city, onCityChange }) {
  const [search, setSearch] = useState('');
  const [amenity, setAmenity] = useState('all');

  const visible = useMemo(
    () =>
      venues.filter((venue) => {
        if (venue.city !== city) return false;
        if (amenity !== 'all' && !venue.tags.includes(amenity)) return false;
        if (search && !venue.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [amenity, city, search]
  );

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="tag">Venues</div>
          <h1>Live Event Spaces</h1>
          <p>Find the best halls, stages, and festival grounds in your city.</p>
        </div>
      </div>

      <div className="section">
        <div className="stats-panel">
          <div className="stats-card">
            <strong>{visible.length}</strong>
            Available venues
          </div>
          <div className="stats-card">
            <strong>{city}</strong>
            Current city
          </div>
          <div className="stats-card">
            <strong>{amenity === 'all' ? 'All amenities' : amenity.toUpperCase()}</strong>
            Venue type filter
          </div>
        </div>

        <div className="venue-controls">
          <div className="btn-group">
            {['Karachi', 'Lahore'].map((candidate) => (
              <button key={candidate} type="button" className={city === candidate ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => onCityChange(candidate)}>
                {candidate}
              </button>
            ))}
          </div>
          <div className="search-bar">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search venues…" className="search-input" />
            <button>🔍</button>
          </div>
        </div>

        <div className="filter-bar">
          {['all', 'vip', 'open-air', 'soundstage', 'dining'].map((tag) => (
            <button key={tag} type="button" className={`filter-chip ${amenity === tag ? 'active' : ''}`} onClick={() => setAmenity(tag)}>
              {tag === 'all' ? 'All' : tag.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="venues-grid">
          {visible.length ? (
            visible.map((venue) => (
              <div key={venue.id} className="venue-card">
                <div className="venue-header">🎼</div>
                <div className="venue-body">
                  <div className="venue-name">{venue.name}</div>
                  <div className="venue-location">{venue.location}</div>
                  <div className="venue-tags">
                    {venue.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="venue-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="venue-desc">{venue.description}</p>
                </div>
                <Link to={`/venue/${venue.id}`} className="btn btn-outline">View →</Link>
              </div>
            ))
          ) : (
            <div className="empty-state">No venues match your filters.</div>
          )}
        </div>
      </div>
    </main>
  );
}

function Schedule() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(
    () =>
      upcomingEvents.filter((event) => filter === 'all' || event.tags.includes(filter)),
    [filter]
  );

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="tag">Upcoming</div>
          <h1>Festival Lineup</h1>
          <p>Stay ahead of the next concerts and cultural events.</p>
        </div>
      </div>

      <div className="section">
        <div className="stats-panel">
          <div className="stats-card">
            <strong>{filtered.length}</strong>
            Upcoming announcements
          </div>
          <div className="stats-card">
            <strong>{filter === 'all' ? 'All dates' : filter.toUpperCase()}</strong>
            Showing schedule for
          </div>
        </div>

        <div className="filter-bar">
          {['all', 'june', 'july', 'august', 'local'].map((option) => (
            <button key={option} type="button" className={`filter-chip ${filter === option ? 'active' : ''}`} onClick={() => setFilter(option)}>
              {option === 'all' ? 'All' : option.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="events-grid">
          {filtered.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-poster">{event.poster}</div>
              <div className="event-body">
                <div className="event-title">{event.title}</div>
                <div className="event-meta">{event.artist}</div>
                <div className="event-info">{event.release}</div>
                <button className="btn btn-primary">Remind Me</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function About() {
  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="tag">About StageScout</div>
          <h1>Live events, made easy</h1>
          <p>We help you find the best shows, compare venues, and book the perfect seats.</p>
        </div>
      </div>
      <div className="section">
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Curated city lineups</h3>
            <p>Tailored live event recommendations for Karachi and Lahore audiences.</p>
          </div>
          <div className="feature-card">
            <h3>Easy booking flow</h3>
            <p>Compare seats, check venue amenities, and reserve tickets in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Fresh event alerts</h3>
            <p>Stay ahead with new release announcements and schedule updates.</p>
          </div>
        </div>
        <div className="section-inner" style={{ marginTop: '32px' }}>
          <h2>Our mission</h2>
          <p>StageScout is built to unite performers, fans, and venues with a seamless discovery experience. We focus on real-time city coverage, transparent venue details, and seat-driven event planning.</p>
        </div>
      </div>
    </main>
  );
}

function EventDetail() {
  const { id } = useParams();
  const event = events.find((item) => item.id === id);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  useEffect(() => {
    setSelectedSeats(new Set());
  }, [event]);

  if (!event) {
    return (
      <main className="section">
        <div className="empty-state">Event not found.</div>
        <Link to="/events" className="btn btn-outline">Back to Events</Link>
      </main>
    );
  }

  const selection = event.sessions[0];
  const selectedPrice = selection?.price || 0;
  const seatCount = selectedSeats.size;
  const totalPrice = seatCount * selectedPrice;

  const toggleSeat = (seatId) => {
    setSelectedSeats((current) => {
      const next = new Set(current);
      if (next.has(seatId)) next.delete(seatId);
      else if (next.size < 6) next.add(seatId);
      return next;
    });
  };

  return (
    <main>
      <div className="detail-hero">
        <div className="detail-poster-large">{event.poster}</div>
        <div className="detail-info">
          <div className="genre-tag">{event.genre}</div>
          <h1>{event.title}</h1>
          <div className="detail-meta">{event.artist} · {event.venueName}</div>
          <p>{event.description}</p>
          <div className="stats-panel" style={{ marginTop: '24px' }}>
            <div className="stats-card">
              <strong>{event.sessions.length}</strong>
              Sessions available
            </div>
            <div className="stats-card">
              <strong>Rs. {selectedPrice}</strong>
              Starting price
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Select a session</h2>
        <div className="showtime-grid">
          {event.sessions.map((session) => (
            <button key={session.id} type="button" className="showtime-pill">{session.date} · {session.time}</button>
          ))}
        </div>

        <div className="seat-section">
          <h3>Choose seats</h3>
          <SeatMap layout={seatLayout} selectedSeats={selectedSeats} onToggleSeat={toggleSeat} />
        </div>

        <div className="booking-summary">
          <div>Selected seats: {seatCount}</div>
          <div>Total: Rs. {totalPrice}</div>
          <button className="btn btn-primary" disabled={!seatCount}>Reserve</button>
        </div>
      </div>
    </main>
  );
}

function VenueDetail() {
  const { id } = useParams();
  const venue = venues.find((item) => item.id === id);
  const venueEvents = events.filter((item) => item.venueName === venue?.name);

  if (!venue) {
    return (
      <main className="section">
        <div className="empty-state">Venue not found.</div>
        <Link to="/venues" className="btn btn-outline">Back to Venues</Link>
      </main>
    );
  }

  return (
    <main>
      <div className="detail-hero">
        <div className="detail-poster-large">🎤</div>
        <div className="detail-info">
          <h1>{venue.name}</h1>
          <div className="detail-meta">{venue.location} · {venue.capacity} guests</div>
          <p>{venue.description}</p>
          <div className="stats-panel" style={{ marginTop: '24px' }}>
            <div className="stats-card">
              <strong>{venue.amenities.length}</strong>
              Amenities available
            </div>
            <div className="stats-card">
              <strong>{venueEvents.length}</strong>
              Events scheduled here
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Facilities</h2>
        <div className="venue-tags">
          {venue.amenities.map((amenity) => (
            <span key={amenity} className="venue-tag">{amenity}</span>
          ))}
        </div>
      </div>
      {venueEvents.length > 0 && (
        <div className="section">
          <h2>Upcoming at this venue</h2>
          <div className="events-grid">
            {venueEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-poster">{event.poster}</div>
                <div className="event-body">
                  <div className="event-title">{event.title}</div>
                  <div className="event-meta">{event.artist}</div>
                  <div className="event-info">{event.date}</div>
                  <Link to={`/event/${event.id}`} className="btn btn-primary">View Event</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main className="section">
      <div className="empty-state">Page not found.</div>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </main>
  );
}

export default function App() {
  const [city, setCity] = useLocalStorage('stagescout_city', 'Karachi');
  const [modalOpen, setModalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleCity = () => {
    setCity((current) => (current === 'Karachi' ? 'Lahore' : 'Karachi'));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HashRouter>
      <div className={mounted ? 'app mounted' : 'app'}>
        <NavBar city={city} onToggleCity={toggleCity} navOpen={navOpen} setNavOpen={setNavOpen} />
        <CityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSelectCity={(value) => setCity(value)} />
        <div style={{ minHeight: '100vh', paddingTop: 'var(--nav-h)' }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home city={city} />} />
            <Route path="/events" element={<Events city={city} />} />
            <Route path="/venues" element={<Venues city={city} onCityChange={setCity} />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<About />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/venue/:id" element={<VenueDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}
