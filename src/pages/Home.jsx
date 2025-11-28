import React, { useMemo } from 'react';
import styles from './Home.module.css';
import { useSiteData } from '../state/SiteDataContext.jsx';

const team = [
  { name: 'Isla Thompson', role: 'Broker / Owner' },
  { name: 'Kai Rodriguez', role: 'Luxury Specialist' },
  { name: 'Mara Blake', role: 'Property Manager' },
];

const Home = () => {
  const { properties, gallery } = useSiteData();
  const showcaseVillas = useMemo(
    () => properties.filter((property) => property.status !== 'recent-sale').slice(0, 3),
    [properties]
  );
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>340 Real Estate St. John</p>
          <h1 className={styles.heroTitle}>Discover Your Paradise</h1>
          <p className={styles.heroSubtitle}>Luxury Real Estate in St. John, USVI</p>
          <a className="button" href="/portfolio">
            Search MLS Properties
          </a>
        </div>
      </section>

      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImage} aria-hidden="true" />
            <div className={styles.storyContent}>
              <h2>Discover Your Slice of Paradise with 340 Real Estate St. John</h2>
              <h3>Residential Homes, Land &amp; Condos for Every Budget!</h3>
              <p>
                Have you ever found yourself daydreaming about staying forever after the most relaxing vacation of
                your life—sunbathing on a tropical beach or taking a once-in-a-lifetime sabbatical in a remote island
                paradise? That dream of owning a piece of "the rock" may be closer than you think.
              </p>
              <h4>Why St. John?</h4>
              <p>
                St. John is a gem rich in history, culture, and natural beauty. Home to the renowned Virgin Islands
                National Park—established in 1956 through the efforts of Laurance Rockefeller—the park now encompasses
                7,200 acres of land and an additional 5,600 acres of underwater beauty. This accounts for roughly 80% of
                the island remaining pristine and undeveloped, including world-famous white-sand beaches.
              </p>
              <p>
                This small but captivating island draws visitors from all over the world. Whether you're into hiking,
                snorkeling, diving, surfing, or just soaking up the Caribbean sun, St. John offers something for
                everyone.
              </p>
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
            {showcaseVillas.map((villa) => (
              <div key={villa.id} className="card">
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
            <a className={styles.adminLink} href="/admin">
              Admin Login
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
