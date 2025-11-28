import React from 'react';
import styles from './Home.module.css';
import teamMembers from '../data/teamMembers.js';
import { PhoneIcon, MailIcon, MessageIcon } from './Home.jsx';

const Team = () => {
  return (
    <main>
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
                Seasoned brokers, sales associates, and client care specialists combining 70+ years of expertise to make
                your move seamless.
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
                    <PhoneIcon />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className={styles.contactIcon}
                  >
                    <MailIcon />
                  </a>
                  <a href="/contact" aria-label={`Message ${member.name}`} className={styles.contactIcon}>
                    <MessageIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;
