import React from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Summer L.',
    quote: 'Our villa sold in 12 days with multiple offers. The team handled everything flawlessly.',
  },
  {
    name: 'Jared K.',
    quote: 'The rental concierge curated excursions and dining we would have never found on our own.',
  },
  {
    name: 'Priya A.',
    quote: 'Transparent, responsive, and deeply connected to the island community.',
  },
];

const Testimonials = () => (
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

export default Testimonials;
