export default function CityModal({ isOpen, onClose, onSelectCity }) {
  const cities = [
    { name: 'Karachi', icon: '🌊', venues: 10 },
    { name: 'Lahore', icon: '🏛️', venues: 7 },
  ];

  return (
    <div className={isOpen ? 'modal-overlay open' : 'modal-overlay'} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-box">
        <h2>Choose Your City</h2>
        <p>See events and venues near you.</p>
        <div className="city-options">
          {cities.map((option) => (
            <button key={option.name} className="city-option" onClick={() => { onSelectCity(option.name); onClose(); }}>
              <span className="city-icon">{option.icon}</span>
              <div>
                <div>{option.name}</div>
                <div>{option.venues} venues</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
