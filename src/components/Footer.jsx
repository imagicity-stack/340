import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
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
  );
};

export default Footer;
