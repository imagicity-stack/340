import React, { useMemo, useState } from 'react';
import styles from './Portfolio.module.css';

const listings = [
  {
    id: 1,
    name: 'Reef Bay Haven',
    price: '$3,750,000',
    beds: 4,
    baths: 4,
    acres: 1.1,
    category: 'villa',
    status: 'for-sale',
  },
  {
    id: 2,
    name: 'Island Breeze Cottage',
    price: '$980,000',
    beds: 3,
    baths: 2,
    acres: 0.5,
    category: 'cottage',
    status: 'recent-sale',
  },
  {
    id: 3,
    name: 'Cruz Bay Lookout',
    price: '$1,800,000',
    beds: 3,
    baths: 3,
    acres: 0.8,
    category: 'house',
    status: 'for-sale',
  },
  {
    id: 4,
    name: 'Calabash Point Combo',
    price: '$5,400,000',
    beds: 6,
    baths: 6,
    acres: 2.5,
    category: 'combo',
    status: 'recent-sale',
  },
];

const categories = [
  { key: 'combo', label: 'Combo properties' },
  { key: 'cottage', label: 'Cottage' },
  { key: 'house', label: 'House' },
  { key: 'villa', label: 'Villa' },
];

const Portfolio = () => {
  const [tab, setTab] = useState('for-sale');
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      const matchesTab = tab === 'all' ? true : listing.status === tab;
      const matchesCategory = filter ? listing.category === filter : true;
      return matchesTab && matchesCategory;
    });
  }, [tab, filter]);

  return (
    <main className="section">
      <div className="container">
        <h1>Portfolio</h1>
        <div className={styles.tabs} role="tablist">
          <button
            className={`${styles.tab} ${tab === 'for-sale' ? styles.active : ''}`}
            onClick={() => setTab('for-sale')}
          >
            For Sale
          </button>
          <button
            className={`${styles.tab} ${tab === 'recent-sale' ? styles.active : ''}`}
            onClick={() => setTab('recent-sale')}
          >
            Recent Sales
          </button>
        </div>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.tab} ${filter === cat.key ? styles.active : ''}`}
              onClick={() => setFilter(filter === cat.key ? '' : cat.key)}
            >
              {cat.label}
            </button>
          ))}
          <button className={`${styles.tab}`} onClick={() => setFilter('')}>
            Clear filters
          </button>
        </div>

        <div className={styles.cardGrid}>
          {filtered.map((listing) => (
            <article key={listing.id} className={`card ${styles.propertyCard}`}>
              <div className="flex-between">
                <h3>{listing.name}</h3>
                {listing.status === 'recent-sale' ? (
                  <span className={`badge tag-sold`}>Sold</span>
                ) : (
                  <span className="price">{listing.price}</span>
                )}
              </div>
              <p>Expansive decks, panoramic views, and modern interiors.</p>
              <div className={styles.propertyMeta} aria-label="property details">
                <span>🛏️ {listing.beds} beds</span>
                <span>🛁 {listing.baths} baths</span>
                <span>🌿 {listing.acres} acres</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button className="button">View listing</button>
                <button className="button secondary">Schedule a tour</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
