import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="section">
      <div className="container">
        <h1>Contact</h1>
        <p>Ready to plan a visit or list your property? Send a note and the team will reply quickly.</p>

        <form className={styles.form} onSubmit={handleSubmit} aria-label="Contact form">
          <label className={styles.field}>
            Name
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              aria-label="Name"
            />
          </label>
          <label className={styles.field}>
            Email
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-label="Email"
            />
          </label>
          <label className={styles.field}>
            Message
            <textarea
              required
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              aria-label="Message"
            />
          </label>
          <button className="button" type="submit">
            Send message
          </button>
        </form>
        {submitted && <p role="status">Thank you! We will respond shortly.</p>}

        <div className={styles.mapWrapper} aria-label="St. John map">
          <iframe
            title="St. John map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7596.78055561346!2d-64.7959031!3d18.3341458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c0513c0c2145abf%3A0x608ef8e13e8ca4e!2sSt%20John!5e0!3m2!1sen!2sus!4v1686624410066!5m2!1sen!2sus"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;
