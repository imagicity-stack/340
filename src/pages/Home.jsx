import React, { useMemo } from 'react';
import styles from './Home.module.css';
import { useSiteData } from '../state/SiteDataContext.jsx';

const teamMembers = [
  {
    name: 'Tammy Donnelly',
    role: 'Broker / Owner / ABR',
    bio: 'Tammy has lived on St. John since 1980 and became the owner of 340 Real Estate in 2013.',
    phone: '+13405551230',
    email: 'tammy@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Jennifer Doran',
    role: 'Sales Associate',
    bio: 'Jennifer brings hospitality expertise and a knack for guiding first-time buyers.',
    phone: '+13405551231',
    email: 'jennifer@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Tina Peitto',
    role: 'Sales Associate',
    bio: 'Tina’s detail-oriented approach comes from her prior tenure as Director of Finance.',
    phone: '+13405551232',
    email: 'tina@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Rosanne Ramos Lloyd',
    role: 'Sales Associate',
    bio: 'Rosanne has worked in marketing and sales with St. John Insurance Company.',
    phone: '+13405551233',
    email: 'rosanne@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80&sat=-50',
  },
  {
    name: 'Jenn Manes',
    role: 'Sales Associate',
    bio: 'Jenn made her move to St. John after discovering the island and now blogs about local life.',
    phone: '+13405551234',
    email: 'jenn@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80&sat=-30',
  },
  {
    name: 'Adonis Morton',
    role: 'Sales Associate',
    bio: 'Adonis arrived on St. John in 2017 and quickly became a trusted market expert.',
    phone: '+13405551235',
    email: 'adonis@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80&sat=20',
  },
  {
    name: 'Mary Moroney',
    role: 'Sales Associate',
    bio: 'Mary balances her real estate career with a passion for community volunteering.',
    phone: '+13405551236',
    email: 'mary@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80&sat=-10',
  },
  {
    name: 'John McCann',
    role: 'Broker Associate',
    bio: 'John moved to Hawaii, then back to St. John, and shares deep insights on island living.',
    phone: '+13405551237',
    email: 'john@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80&sat=-45',
  },
  {
    name: 'Olivia Carter',
    role: 'Client Care Specialist',
    bio: 'Olivia coordinates showings, answers inquiries, and keeps buyers updated at every step.',
    phone: '+13405551238',
    email: 'olivia@340realestate.com',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80&sat=30',
  },
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
            <a className={`button ${styles.knowMoreButton}`} href="/340team">
              Know More
            </a>
          </div>
        </div>
      </section>

      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className={styles.teamHeader}>
            <div>
              <p className={styles.teamEyebrow}>Our People</p>
              <h2>Meet the 340 Real Estate St. John Team</h2>
              <p>
                Seasoned brokers, sales associates, and client care specialists combining 70+ years of expertise to
                make your move seamless.
              </p>
            </div>
          </div>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <article key={member.name} className={styles.memberCard}>
                <div className={styles.avatar} style={{ backgroundImage: `url(${member.image})` }} aria-hidden="true" />
                <div className={styles.memberDetails}>
                  <h3>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
                <div className={styles.contactRow}>
                  <a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`} className={styles.contactIcon}>
                    <span aria-hidden="true">📞</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className={styles.contactIcon}
                  >
                    <span aria-hidden="true">✉️</span>
                  </a>
                  <a href="/contact" aria-label={`Message ${member.name}`} className={styles.contactIcon}>
                    <span aria-hidden="true">💬</span>
                  </a>
                </div>
              </article>
            ))}
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

export default Home;
