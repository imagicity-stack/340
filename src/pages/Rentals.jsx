import React from 'react';
import styles from './Rentals.module.css';

const rentals = [
  {
    id: 1,
    name: 'Maho Bay Escape',
    guests: 8,
    beds: 4,
    baths: 3,
    weekly: '$6,800',
    amenities: ['Pool', 'Chef-ready kitchen', 'Private dock'],
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Sea Cliff Haven',
    guests: 6,
    beds: 3,
    baths: 3,
    weekly: '$5,400',
    amenities: ['Spa deck', 'Wi-Fi', 'Sunrise views'],
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Palm Grove Villa',
    guests: 10,
    beds: 5,
    baths: 4,
    weekly: '$7,900',
    amenities: ['Concierge', 'Cinema room', 'Outdoor kitchen'],
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
];

const Rentals = () => {
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
                {rental.amenities.map((item) => (
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
