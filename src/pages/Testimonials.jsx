import React from 'react';
import styles from './Testimonials.module.css';
import { useSiteData } from '../state/SiteDataContext.jsx';

const Testimonials = () => {
  const { testimonials } = useSiteData();
  return (
    <main className="section">
      <div className="container">
        <h1>Testimonials</h1>
        <p>Trusted by buyers, sellers, and guests across the Caribbean.</p>
        <div className={styles.grid}>
          {testimonials.map((item) => (
            <article key={item.name} className="card">
              <p className={styles.quote}>“{item.quote}”</p>
              <p style={{ fontWeight: 700 }}>{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Testimonials;
