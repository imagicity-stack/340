import React from 'react';
import styles from './AboutUs.module.css';

const stats = [
  {
    title: 'Size',
    value: '20 sq. miles',
    detail: '7 miles long · 3 miles wide',
  },
  {
    title: 'Highest Point',
    value: 'Bordeaux Mountain',
    detail: '1,277 ft above sea level',
  },
  {
    title: 'Map',
    value: 'St. John, USVI',
    detail: 'Loved from shore to peak',
  },
];

const pillars = [
  {
    eyebrow: 'Local Roots',
    title: 'Your key to paradise',
    copy:
      'We are lifelong islanders and neighbors first—real estate guides second. The “340” in our name is more than an area code; it is our promise to champion this community in every conversation and closing.',
  },
  {
    eyebrow: 'Bespoke Service',
    title: 'Built around your vision',
    copy:
      'From luxury villas to tucked-away cottages, we listen closely, ask the right questions, and translate your wish list into a curated path forward that feels effortless and transparent.',
  },
  {
    eyebrow: 'Steady Guidance',
    title: 'Trusted, honest, present',
    copy:
      'With decades of island insight, we pair insider knowledge with clear market data, giving you confident decisions and a calm, rewarding experience from first call to final signature.',
  },
];

const AboutUs = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>About Us</p>
            <h1>Your Key to Paradise</h1>
            <p className={styles.lead}>
              The local experts in St. John real estate. We live here, we love it here, and we know every cove,
              hillside, and breeze. Consider us your dedicated partner in navigating the vibrant property market of the U.S.
              Virgin Islands.
            </p>
            <div className={styles.tagline}>The Local Experts in St. John Real Estate</div>
            <div className={styles.ctaRow}>
              <a className="button" href="/portfolio">
                Browse Properties
              </a>
              <a className="button outline" href="/contact">
                Talk with an agent
              </a>
            </div>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>Rooted in 340</span>
              <h2>Island insight with a neighborly touch</h2>
              <p>
                Buying or selling a home in St. John is more than a transaction—it is a lifestyle. Our passionate team of
                long-time residents brings an intimate understanding of each neighborhood’s character to every search.
              </p>
            </div>
            <div className={styles.statGrid}>
              {stats.map((stat) => (
                <div className={styles.statCard} key={stat.title}>
                  <p className={styles.statLabel}>{stat.title}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statDetail}>{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyCard}>
              <p className={styles.eyebrow}>Our Story</p>
              <h2>A team built by St. John, for St. John</h2>
              <p>
                Welcome to 340 Real Estate, your dedicated partner in navigating the vibrant and unique property market of
                St. John, U.S. Virgin Islands. Our name is a proud nod to our deep roots in this community—"340" is our
                area code, a constant reminder of our local commitment and expertise. We do not just sell properties here;
                we live here, we love it here, and we know this island from the sandy shores to the highest peaks.
              </p>
              <p>
                We believe that buying or selling a home in St. John is about more than just a transaction; it is about a
                lifestyle. Our team is made up of passionate, long-time residents who have an intimate understanding of
                each neighborhood&apos;s unique character. Whether you are dreaming of a luxury villa with breathtaking ocean
                views, a charming cottage tucked away in the hills, or the perfect plot of land to build your future, our
                unparalleled local knowledge is your greatest asset.
              </p>
              <p>
                Our approach is built on a foundation of integrity, personalized service, and a genuine desire to see our
                clients succeed. We take the time to understand your vision and work tirelessly to make it a reality. By
                combining our insider expertise with the latest market insights, we ensure a seamless, transparent, and
                rewarding experience from start to finish.
              </p>
              <p className={styles.invite}>
                Ready to find your piece of paradise? Let&apos;s start the conversation. Contact 340 Real Estate today and let
                our local knowledge lead you home.
              </p>
            </div>
            <div className={styles.mapCard}>
              <div className={styles.mapHeader}>
                <p className={styles.eyebrow}>St. John at a glance</p>
                <h3>Size, peaks, and pristine coastlines</h3>
              </div>
              <div className={styles.mapIllustration}>
                <div className={styles.mapOverlay}>Map of St. John</div>
              </div>
              <div className={styles.detailList}>
                <div>
                  <strong>Size:</strong> 20 square miles – 7 miles long, 3 miles wide
                </div>
                <div>
                  <strong>Highest Point:</strong> Bordeaux Mountain – 1,277 ft above sea level
                </div>
              </div>
              <div className={styles.mapFooter}>
                <span className={styles.badge}>Insider Tip</span>
                <p>Ask us about the hidden trails, favorite coves, and sunset views that make each neighborhood shine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsHeader}>
            <p className={styles.eyebrow}>How we guide you</p>
            <h2>Seamless, transparent, rewarding</h2>
            <p>
              We blend heartfelt hospitality with data-driven strategy, keeping you informed and inspired every step of the way.
            </p>
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((pillar) => (
              <div className={styles.pillarCard} key={pillar.title}>
                <p className={styles.pillarEyebrow}>{pillar.eyebrow}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.eyebrow}>Start the conversation</p>
              <h2>Let our local knowledge lead you home</h2>
              <p>
                We are ready with curated listings, neighborhood insight, and introductions to trusted island partners for
                every step of your journey.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a className="button" href="/contact">
                Contact 340 Real Estate
              </a>
              <a className="button outline" href="/portfolio">
                View current listings
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
