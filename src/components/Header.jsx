import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <nav className={`${styles.navLinks} ${styles.navLeft}`} aria-label="Primary left">
          <div className={styles.dropdown}>
            <NavLink to="/portfolio" className={navLinkClass}>
              Property Search
            </NavLink>
            <div className={styles.dropdownMenu} role="menu">
              <NavLink to="/portfolio?type=residential" className={styles.navLink}>
                Residential
              </NavLink>
              <NavLink to="/portfolio?type=land" className={styles.navLink}>
                Land
              </NavLink>
            </div>
          </div>
          <NavLink to="/about-st-john" className={navLinkClass}>
            About St. John
          </NavLink>
          <NavLink to="/testimonials" className={navLinkClass}>
            Testimonials
          </NavLink>
        </nav>

        <Link to="/" className={styles.logo} aria-label="340 Real Estate home">
          <img src="/logo/logo.png" alt="340 Real Estate" className={styles.logoImage} />
        </Link>

        <nav className={`${styles.navLinks} ${styles.navRight}`} aria-label="Primary right">
          <NavLink to="/team" className={navLinkClass}>
            Team
          </NavLink>
          <NavLink to="/about-st-john" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <button
          className={styles.hamburger}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className={styles.mobileMenu}>
          <NavLink to="/portfolio" className={styles.navLink} onClick={() => setOpen(false)}>
            Property Search
          </NavLink>
          <NavLink to="/about-st-john" className={styles.navLink} onClick={() => setOpen(false)}>
            About St. John
          </NavLink>
          <NavLink to="/testimonials" className={styles.navLink} onClick={() => setOpen(false)}>
            Testimonials
          </NavLink>
          <NavLink to="/team" className={styles.navLink} onClick={() => setOpen(false)}>
            Team
          </NavLink>
          <NavLink to="/about-st-john" className={styles.navLink} onClick={() => setOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={styles.navLink} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
