import React from 'react';
import styles from './AboutStJohn.module.css';

const AboutStJohn = () => (
  <main>
    <section className={`${styles.hero} section`}>
      <div className="container">
        <h1>About St. John</h1>
        <p>
          St. John is a sanctuary of white-sand beaches, emerald hills, and a community known for hospitality. Learn the
          history, ecology, and experiences that make the island unforgettable.
        </p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2>History &amp; Culture</h2>
        <p>
          From Danish colonial roots to a thriving national park, the island blends heritage with preservation. Local art,
          live music, and community festivals are part of everyday life.
        </p>
        <h2>Outdoors</h2>
        <p>
          More than two-thirds of St. John is protected land, offering miles of hiking, snorkeling, and sailing routes.
          Trunk Bay and Cinnamon Bay are just the start.
        </p>
        <h2>Moments you cannot miss</h2>
        <div className={styles.imageGrid}>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
            alt="Sunrise over St. John"
          />
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
            alt="Hiking trail"
          />
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
            alt="Tropical shoreline"
          />
        </div>
      </div>
    </section>
  </main>
);

export default AboutStJohn;
