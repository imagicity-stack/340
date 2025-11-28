import React, { useMemo } from 'react';
import styles from './Home.module.css';
import { useSiteData } from '../state/SiteDataContext.jsx';

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.54 5.22c.34-.76 1.19-1.1 1.96-.83l1.37.48a1.5 1.5 0 0 1 .95 1.42c-.02.9-.17 1.77-.44 2.6a1 1 0 0 1-.97.69H7.9c.7 2.04 2.36 3.7 4.4 4.4v-1.51a1 1 0 0 1 .69-.97c.83-.27 1.7-.42 2.6-.44a1.5 1.5 0 0 1 1.42.95l.48 1.37c.28.77-.07 1.62-.83 1.96l-1.35.62a3 3 0 0 1-2.58-.03c-2.45-1.13-4.42-3.1-5.55-5.55a3 3 0 0 1-.03-2.58l.62-1.35Z"
      fill="currentColor"
    />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 6.75c0-.69.56-1.25 1.25-1.25h12.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H5.75A1.25 1.25 0 0 1 4.5 17.25V6.75Zm1.7.75 5.31 3.54a.75.75 0 0 0 .78 0l5.31-3.54H6.2Z"
      fill="currentColor"
    />
  </svg>
);

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 5.5h12a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-3.9l-2.45 2.45a.75.75 0 0 1-1.28-.53V15.5H6A1.5 1.5 0 0 1 4.5 14V7A1.5 1.5 0 0 1 6 5.5Z"
      fill="currentColor"
    />
  </svg>
);

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
          <a className={`button ${styles.heroCta}`} href="/portfolio">
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

      <section className={`section ${styles.teamIntroSection}`}>
        <div className="container">
          <div className={styles.teamIntroCard}>
            <h2>Meet the 340 Real Estate St. John Team</h2>
            <p>
              Our experienced team of brokers and sales agents is dedicated to helping you find the perfect
              property—whether it's a cozy condo, sprawling land, luxurious home, or commercial space. We work with all
              listings on the St. John MLS and offer Accredited Buyer Representative services to guide you every step of
              the way.
            </p>
            <p>
              Our website features a user-friendly, fully searchable database of all MLS listings, plus a robust archive
              of over 5,000 real estate sales dating back to 2009. You can explore historical trends by area, property
              type, or time frame—empowering you with the insights you need to make a smart investment.
            </p>
            <h3>Ready to Make the Move?</h3>
            <p>
              Whether you're planning a weeklong getaway or a permanent relocation, we're here to help. With over 70
              years of combined experience in St. John real estate, the 340 Real Estate team is ready to turn your island
              dream into reality.
            </p>
            <a className={`button ${styles.knowMoreButton}`} href="/team">
              Know More
            </a>
          </div>
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

export { PhoneIcon, MailIcon, MessageIcon };
export default Home;
