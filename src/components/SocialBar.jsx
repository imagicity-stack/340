import React from 'react';
import styles from './SocialBar.module.css';

const links = [
  { label: 'FB', href: '#facebook', title: 'Facebook placeholder' },
  { label: 'IG', href: '#instagram', title: 'Instagram placeholder' },
  { label: 'YT', href: '#youtube', title: 'YouTube placeholder' },
];

const SocialBar = () => (
  <div className={styles.bar} aria-label="social media links">
    {links.map((link) => (
      <a key={link.label} className={styles.link} href={link.href} aria-label={link.title}>
        {link.label}
      </a>
    ))}
  </div>
);

export default SocialBar;
