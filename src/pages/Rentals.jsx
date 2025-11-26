import React from 'react';
import styles from './Rentals.module.css';
import { useSiteData } from '../state/SiteDataContext.jsx';

const Rentals = () => {
  const { rentals } = useSiteData();
  return (
    <main className="section">
      <div className="container">
        <h1>Rentals</h1>
        <p>Curated villas with the comforts of a boutique hotel.</p>
        <div className={styles.carousel} aria-label="Rental carousel">
          {rentals.map((rental) => (
            <article key={rental.id} className={`card ${styles.card}`}>
              <img src={rental.image} alt={rental.name} style={{ borderRadius: '12px' }} />
              <div className="flex-between" style={{ marginTop: '0.75rem' }}>
                <h3>{rental.name}</h3>
                <span className="price">{rental.weekly}/week</span>
              </div>
              <p>
                👥 {rental.guests} guests · 🛏️ {rental.beds} beds · 🛁 {rental.baths} baths
              </p>
              <div className={styles.meta}>
                {(rental.amenities || []).map((item) => (
                  <span key={item} className="badge" style={{ background: '#e0f7f5', color: '#0b4f6c' }}>
                    {item}
                  </span>
                ))}
              </div>
              <button className="button" style={{ marginTop: '0.75rem' }}>
                Reserve now
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rentals;
