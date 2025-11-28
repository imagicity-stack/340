import React, { useMemo, useState, useEffect } from 'react';
import styles from './AboutStJohn.module.css';

const AboutStJohn = () => {
  const galleryImages = useMemo(
    () => [
      '/stjhon-gallery/slide1.jpg',
      '/stjhon-gallery/slide2.jpg',
      '/stjhon-gallery/slide3.jpg',
      '/stjhon-gallery/slide4.jpg',
    ],
    [],
  );

  const [active, setActive] = useState(0);
  const [placeholderShown, setPlaceholderShown] = useState({});

  const condoAreas = [
    {
      name: 'Battery Hill',
      description:
        'Four three-story buildings just outside Cruz Bay with views of the harbor and St. Thomas. Two bedrooms one bath units and one studio unit. Shared pool.',
    },
    {
      name: 'Bethany/Upper Deck',
      description: 'Single and double units in masonry buildings with stunning views from South to West. Five-minute drive to Cruz Bay.',
    },
    {
      name: 'Conch Villas',
      description: 'Five one and two-bedroom hardwood units with views of Enighed Pond. Walking distance to Cruz Bay.',
    },
    {
      name: 'Cruz Bay Villas',
      description: 'Converted home with one-bedroom units on Pocket Money Hill. Great St. Thomas views, sunset, and a shared pool.',
    },
    {
      name: 'Cruz Views',
      description: 'Ten one-bedroom masonry units on Pocket Money Hill with shared pool and sunset views.',
    },
    {
      name: 'Gallows Point',
      description: 'Fifteen waterfront buildings with four one-bedroom units each. Shared pool and beach. Easy walk to town.',
    },
    {
      name: 'Grande Bay',
      description: 'One to three-bedroom units on Cruz Bay beach. Resort-style amenities including pool and gym. Walkable to town.',
    },
    {
      name: 'Lavender Hill',
      description: 'Two buildings with twelve one and two-bedroom units, harbor views, and a shared pool. Walkable to town.',
    },
    {
      name: 'Palm & Mango Terrace',
      description: 'Two and three-bedroom condos just outside Cruz Bay. Walking distance to town and Frank Bay beach.',
    },
    {
      name: 'Pastory Estate',
      description: 'Four buildings with thirteen condos and shared pool. Five minutes from Cruz Bay by car.',
    },
    {
      name: 'Selene’s',
      description: 'Six masonry studio units in the heart of Cruz Bay.',
    },
    {
      name: 'Serendip',
      description: 'Sunset views over St. Thomas from ten one-bedroom and studio condos just above Cruz Bay.',
    },
    {
      name: 'Sirenusa',
      description: 'Forty luxury condos with pool, gym, and game room overlooking Cruz Bay.',
    },
    {
      name: 'Sunset Ridge',
      description: 'Six two-bedroom units with timeshare ownership and splash pools. RCI affiliation. Incredible views.',
    },
    {
      name: 'Villa Caribe',
      description: 'Five condos with lap pool, lovely south views, just outside Cruz Bay. Walkable.',
    },
    {
      name: 'Virgin Grand Villas',
      description: 'Two seasonal homes with three bedrooms on Gift Hill. Gorgeous views of St. Thomas and sunset.',
    },
    {
      name: 'Westin Vacation Club',
      description: 'Studio to 3BR timeshares across from the Westin Resort. Access to pools and hotel facilities.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % galleryImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const handlePrev = () => setActive((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  const handleNext = () => setActive((prev) => (prev + 1) % galleryImages.length);

  return (
    <main className={styles.page}>
      <section className={`${styles.hero} section`}>
        <div className="container">
          <p className={styles.kicker}>About St. John, Virgin Islands</p>
          <h1>Discover St. John: A Journey Through History, Nature, and Island Charm</h1>
          <p className={styles.lead}>
            A Historical Journey and Modern Paradise
          </p>
        </div>
      </section>

      <section className={`section ${styles.contentSection}`}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.narrative}>
              <h2>St. John, Virgin Islands Real Estate</h2>
              <p>Size: 20 square miles – 7 miles long, 3 miles wide.</p>
              <p>Highest Point: Bordeaux Mountain – 1,277 ft above sea level</p>
              <p>Map of St. John</p>
              <p>
                real estate companies in st john in US virgin islands, real estate for sale in st John US virgin islands, real
                estate for sale in st thomas virgin islands, real estate for sale in the virgin islands, real estate for sale st
                john usvi, real estate news, caribbean real estate, rentals &amp; more.
              </p>

              <h3>A Historical Journey and Modern Paradise</h3>
              <p>
                St. John became part of the United States in 1917 when it was purchased from Denmark. However, it wasn’t until
                the 1930s that word of this tropical paradise began to reach mainland America. This marked the beginning of a
                tourism era that would eventually blossom into a thriving industry.
              </p>
              <p>
                A pivotal moment came in 1956 when conservationist and philanthropist Laurance S. Rockefeller donated a
                significant portion of St. John to the U.S. Federal Government, forming the Virgin Islands National
                Park—initially 5,000 acres of protected land.
              </p>
              <p className={styles.quote}>
                Rockefeller’s donation was accepted by Secretary of the Interior Fred Seaton, who declared:“The government will
                take care of this sacred soil—these green hills, valleys, and flaming miles. Take good, proper, Christ-like
                care!”
              </p>
              <p>
                Since then, the park has expanded to over 7,200 acres of land and 5,600 acres of marine habitat, preserving
                nearly 56,500 acres of beauty and biodiversity.
              </p>

              <h3>Modern-Day St. John: Accessible, Accommodating, and Awe-Inspiring</h3>
              <p>
                One of the best parts? U.S. citizens don’t need a passport to visit. Whether you prefer rustic campgrounds or
                luxury resorts, St. John offers accommodations for every traveler.
              </p>
              <p>
                The island also boasts accessible beaches like Trunk Bay—frequently ranked among the most beautiful in the
                Caribbean and the world.
              </p>
              <p>
                Today, St. John is more than just a tropical escape—it’s a shining example of nature preserved, history honored,
                and paradise made accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <div className={styles.galleryHeader}>
            <h2>St. John Gallery</h2>
            <p>Add your favorite island moments to the <code>/public/stjhon-gallery</code> folder to showcase them here.</p>
          </div>

          <div className={styles.carousel}>
            <button className={styles.control} onClick={handlePrev} aria-label="Previous slide">
              ‹
            </button>

            <div className={styles.viewport}>
              {galleryImages.map((src, index) => (
                <div
                  key={src + index}
                  className={`${styles.slide} ${index === active ? styles.active : ''}`}
                  aria-hidden={index !== active}
                >
                  <img
                    src={placeholderShown[index] ? 'https://via.placeholder.com/1200x700?text=St.+John+Gallery' : src}
                    alt="St. John gallery item"
                    onError={() =>
                      setPlaceholderShown((prev) => ({
                        ...prev,
                        [index]: true,
                      }))
                    }
                  />
                  {placeholderShown[index] && (
                    <div className={styles.placeholderMessage}>
                      Add photos to the public/stjhon-gallery folder to replace this placeholder.
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className={styles.control} onClick={handleNext} aria-label="Next slide">
              ›
            </button>
          </div>

          <div className={styles.dots} role="tablist" aria-label="Gallery slide selector">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.condoSection}`}>
        <div className="container">
          <div className={styles.condoHeader}>
            <h2>About the Different Areas of St. John – Condos</h2>
          </div>

          <div className={styles.condoGrid} role="list">
            {condoAreas.map((area) => (
              <article key={area.name} className={styles.condoCard} role="listitem">
                <h3>{area.name}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutStJohn;
