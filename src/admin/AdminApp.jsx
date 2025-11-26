import React, { useMemo, useState } from 'react';
import styles from './AdminApp.module.css';

const tabs = ['testimonials', 'properties', 'rentals', 'gallery'];

const AdminApp = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('testimonials');

  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Summer L.', quote: 'Our villa sold in 12 days.' },
  ]);
  const [listings, setListings] = useState([
    { id: 1, name: 'Reef Bay Haven', price: '$3,750,000', status: 'for-sale' },
  ]);
  const [rentalListings, setRentalListings] = useState([
    { id: 1, name: 'Maho Bay Escape', weekly: '$6,800' },
  ]);
  const [gallery, setGallery] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  ]);

  const [form, setForm] = useState({ name: '', quote: '' });
  const [propertyForm, setPropertyForm] = useState({ name: '', price: '', status: 'for-sale' });
  const [rentalForm, setRentalForm] = useState({ name: '', weekly: '' });
  const [galleryUrl, setGalleryUrl] = useState('');

  const authenticatedView = useMemo(() => {
    if (!authed) return null;
    return (
      <div className={styles.panel}>
        <header className="flex-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p className="badge" style={{ background: '#143357', color: '#9ed8ff' }}>
              Admin Portal
            </p>
            <h2 style={{ margin: '0.35rem 0' }}>Content dashboard</h2>
            <p style={{ margin: 0 }}>Stubbed for Firebase or headless CMS integration.</p>
          </div>
          <button className="button" onClick={() => setAuthed(false)}>
            Log out
          </button>
        </header>

        <nav className={styles.nav} aria-label="Admin sections">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active ' + styles.active : activeTab === tab ? styles.active : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {activeTab === 'testimonials' && (
          <section>
            <h3>Testimonials</h3>
            <div className={styles.formGrid}>
              <input
                aria-label="Name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <textarea
                aria-label="Quote"
                placeholder="Quote"
                value={form.quote}
                onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
              />
              <button
                className="button"
                onClick={() => {
                  if (!form.name || !form.quote) return;
                  setTestimonials((items) => [...items, { ...form, id: Date.now() }]);
                  setForm({ name: '', quote: '' });
                }}
              >
                Add testimonial
              </button>
            </div>
            {testimonials.map((item) => (
              <div key={item.id} className={styles.card}>
                <h3>{item.name}</h3>
                <p>{item.quote}</p>
                <div className={styles.actions}>
                  <button
                    className="button secondary"
                    onClick={() =>
                      setTestimonials((items) =>
                        items.map((entry) => (entry.id === item.id ? { ...entry, quote: entry.quote + ' • updated' } : entry))
                      )
                    }
                  >
                    Quick edit
                  </button>
                  <button className="button" onClick={() => setTestimonials((items) => items.filter((i) => i.id !== item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'properties' && (
          <section>
            <h3>Property listings</h3>
            <div className={styles.formGrid}>
              <input
                aria-label="Property name"
                placeholder="Property name"
                value={propertyForm.name}
                onChange={(e) => setPropertyForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                aria-label="Price"
                placeholder="Price"
                value={propertyForm.price}
                onChange={(e) => setPropertyForm((f) => ({ ...f, price: e.target.value }))}
              />
              <select
                aria-label="Status"
                value={propertyForm.status}
                onChange={(e) => setPropertyForm((f) => ({ ...f, status: e.target.value }))}
                style={{ padding: '0.65rem', borderRadius: '10px', border: '1px solid #4b6b8a', background: '#0f233b', color: '#e6f4ff' }}
              >
                <option value="for-sale">For Sale</option>
                <option value="sold">Sold</option>
              </select>
              <button
                className="button"
                onClick={() => {
                  if (!propertyForm.name || !propertyForm.price) return;
                  setListings((items) => [...items, { ...propertyForm, id: Date.now() }]);
                  setPropertyForm({ name: '', price: '', status: 'for-sale' });
                }}
              >
                Add property
              </button>
            </div>
            {listings.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className="flex-between">
                  <div>
                    <h3>{item.name}</h3>
                    <p className="price">{item.price}</p>
                  </div>
                  <span className={styles.badge}>{item.status === 'sold' ? 'Sold' : 'Active'}</span>
                </div>
                <div className={styles.actions}>
                  <button
                    className="button secondary"
                    onClick={() =>
                      setListings((items) =>
                        items.map((entry) => (entry.id === item.id ? { ...entry, status: item.status === 'sold' ? 'for-sale' : 'sold' } : entry))
                      )
                    }
                  >
                    Toggle sold
                  </button>
                  <button className="button" onClick={() => setListings((items) => items.filter((p) => p.id !== item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'rentals' && (
          <section>
            <h3>Rental listings</h3>
            <div className={styles.formGrid}>
              <input
                aria-label="Rental name"
                placeholder="Rental name"
                value={rentalForm.name}
                onChange={(e) => setRentalForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                aria-label="Weekly rate"
                placeholder="Weekly rate"
                value={rentalForm.weekly}
                onChange={(e) => setRentalForm((f) => ({ ...f, weekly: e.target.value }))}
              />
              <button
                className="button"
                onClick={() => {
                  if (!rentalForm.name || !rentalForm.weekly) return;
                  setRentalListings((items) => [...items, { ...rentalForm, id: Date.now() }]);
                  setRentalForm({ name: '', weekly: '' });
                }}
              >
                Add rental
              </button>
            </div>
            {rentalListings.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className="flex-between">
                  <h3>{item.name}</h3>
                  <span className="price">{item.weekly}/week</span>
                </div>
                <div className={styles.actions}>
                  <button
                    className="button secondary"
                    onClick={() =>
                      setRentalListings((items) =>
                        items.map((entry) => (entry.id === item.id ? { ...entry, weekly: entry.weekly + ' • updated' } : entry))
                      )
                    }
                  >
                    Edit rate
                  </button>
                  <button className="button" onClick={() => setRentalListings((items) => items.filter((r) => r.id !== item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'gallery' && (
          <section>
            <h3>Gallery</h3>
            <div className={styles.formGrid}>
              <input
                aria-label="Image URL"
                placeholder="Image URL"
                value={galleryUrl}
                onChange={(e) => setGalleryUrl(e.target.value)}
              />
              <button
                className="button"
                onClick={() => {
                  if (!galleryUrl) return;
                  setGallery((items) => [...items, { id: Date.now(), url: galleryUrl }]);
                  setGalleryUrl('');
                }}
              >
                Upload image
              </button>
            </div>
            {gallery.map((item, index) => (
              <div key={item.id} className={styles.card}>
                <div className="flex-between">
                  <p style={{ margin: 0 }}>#{index + 1}</p>
                  <div className={styles.actions}>
                    <button
                      className="button secondary"
                      onClick={() =>
                        setGallery((items) => {
                          const copy = [...items];
                          const [moved] = copy.splice(index, 1);
                          copy.splice(Math.max(index - 1, 0), 0, moved);
                          return copy;
                        })
                      }
                    >
                      Move up
                    </button>
                    <button className="button" onClick={() => setGallery((items) => items.filter((g) => g.id !== item.id))}>
                      Remove
                    </button>
                  </div>
                </div>
                <p style={{ wordBreak: 'break-all' }}>{item.url}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }, [activeTab, authed, form, gallery, galleryUrl, listings, rentalForm, rentalListings, testimonials]);

  return (
    <div className={styles.wrapper}>
      {!authed ? (
        <div className={styles.panel}>
          <h2>Admin Login</h2>
          <p>Demo password is <strong>123</strong>. Replace with Firebase auth when ready.</p>
          <div className={styles.loginForm}>
            <label>
              Password
              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Admin password"
              />
            </label>
            <button className="button" onClick={() => setAuthed(password === '123')}>
              Login
            </button>
          </div>
        </div>
      ) : (
        authenticatedView
      )}
    </div>
  );
};

export default AdminApp;
