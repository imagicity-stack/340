import React from 'react';
import styles from './Home.module.css';

const heroSlides = [
  'Oceanfront estates with world-class amenities',
  'Boutique cottages with authentic island charm',
  'Curated rentals for every celebration',
];

const team = [
  { name: 'Isla Thompson', role: 'Broker / Owner' },
  { name: 'Kai Rodriguez', role: 'Luxury Specialist' },
  { name: 'Mara Blake', role: 'Property Manager' },
];

const villas = [
  {
    name: 'Azure Vista Villa',
    price: '$4,200,000',
    beds: 5,
    baths: 5,
    acres: 1.2,
  },
  {
    name: 'Coral Bay Cottage',
    price: '$1,150,000',
    beds: 3,
    baths: 2,
    acres: 0.4,
  },
  {
    name: 'Seaglass Retreat',
    price: '$2,850,000',
    beds: 4,
    baths: 4,
    acres: 0.9,
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
];

const Home = () => {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <p className="badge" style={{ background: 'rgba(255,255,255,0.2)' }}>
              Island Luxury, Modern Service
            </p>
            <h1 style={{ fontSize: '2.75rem', margin: '0.5rem 0' }}>
              Boutique real estate experiences on St. John
            </h1>
            <p style={{ maxWidth: '600px', lineHeight: 1.6 }}>
              Discover villas, cottages, and land opportunities curated by a team that lives and breathes St. John.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a className="button" href="/portfolio">
                Browse Properties
              </a>
              <a className="button outline" href="/contact">
                Talk with a Broker
              </a>
            </div>
          </div>
          <div className={styles.heroCard} aria-label="Hero carousel copy">
            <div className={styles.carouselTrack}>
              {heroSlides.map((text) => (
                <div key={text} className="card" style={{ minWidth: '220px', background: 'rgba(255,255,255,0.9)' }}>
                  <h3 style={{ marginTop: 0 }}>{text}</h3>
                  <p style={{ margin: 0 }}>Handpicked highlights updated weekly.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid teamGrid">
          <div>
            <h2>Meet the Team</h2>
            <p>Seasoned negotiators, island locals, and hospitality pros ready to guide you.</p>
          </div>
          {team.map((person) => (
            <div key={person.name} className={`card ${styles.teamCard}`}>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              <button className="button secondary" aria-label={`Schedule a call with ${person.name}`}>
                Schedule a call
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: '#eef5f6' }}>
        <div className="container">
          <h2>Signature Villa Rentals</h2>
          <div className={`grid ${styles.villaGrid}`}>
            {villas.map((villa) => (
              <div key={villa.name} className="card">
                <div className="flex-between">
                  <h3>{villa.name}</h3>
                  <span className="price">{villa.price}</span>
                </div>
                <p>Immaculately maintained with sweeping ocean views.</p>
                <p style={{ margin: '0.25rem 0' }}>
                  🛏️ {villa.beds} beds · 🛁 {villa.baths} baths · 🌿 {villa.acres} acres
                </p>
                <button className="button" style={{ marginTop: '0.75rem' }}>
                  View rental
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Gallery</h2>
          <div className={`grid ${styles.galleryGrid}`}>
            {gallery.map((src) => (
              <img key={src} src={src} alt="Scenic St. John" />
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div>
            <h3>340 Real Estate</h3>
            <p>Luxury representation for St. John buyers, sellers, and guests.</p>
          </div>
          <div>
            <h4>Visit Us</h4>
            <p>99 Reef Bay Rd<br />St. John, VI 00830</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <a href="tel:+13405551234">(340) 555-1234</a>
              <br />
              <a href="mailto:hello@340realestate.com">hello@340realestate.com</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
