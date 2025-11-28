'use client';

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminApp.module.css';
import { getAuthHelpers } from '../../lib/firebase.js';
import { useSiteData } from '../state/SiteDataContext.jsx';

const tabs = [
  'portfolio',
  'agents',
  'rentals',
  'bookings',
  'blogs',
  'rental-approval',
  'sale-approval',
  'property-approval',
];

const AdminApp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');

  const { properties, rentals, testimonials, gallery, setProperties, setRentals, setTestimonials, setGallery } =
    useSiteData();

  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    price: '',
    category: 'Residential',
    type: 'Villa',
    status: 'For Sale',
    address: '',
    quarter: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    hasPool: true,
    imageUrl: '',
    amenities: '',
    description: '',
  });

  const [agents, setAgents] = useState([
    { id: 1, name: 'Jordan Cole', role: 'Lead Broker', email: 'jordan@340lux.com', phone: '(340) 555-0123' },
    { id: 2, name: 'Simone Vega', role: 'Rental Specialist', email: 'simone@340lux.com', phone: '(340) 555-0456' },
  ]);

  const [agentForm, setAgentForm] = useState({ name: '', role: '', email: '', phone: '' });

  const [rentalForm, setRentalForm] = useState({
    name: '',
    weekly: '',
    guests: '',
    beds: '',
    baths: '',
    amenities: '',
    image: '',
  });

  const [bookingRequests, setBookingRequests] = useState([
    { id: 1, guest: 'Avery P.', property: 'Maho Bay Escape', dates: 'Jun 12 - Jun 18', status: 'Pending' },
    { id: 2, guest: 'Leo R.', property: 'Palm Grove Villa', dates: 'Jul 4 - Jul 8', status: 'Awaiting response' },
  ]);

  const [blogForm, setBlogForm] = useState({ title: '', summary: '', tag: 'Market Update' });
  const [blogs, setBlogs] = useState([
    { id: 1, title: '2024 Luxury Market Pulse', summary: 'Inventory remains tight but demand is steady.' },
    { id: 2, title: 'St. John Rental Trends', summary: 'Longer winter stays are shaping our calendar.' },
  ]);

  const [rentalApprovals, setRentalApprovals] = useState([
    { id: 1, name: 'Reef Bay Escape', owner: 'Ella M.', status: 'Reviewing' },
  ]);

  const [saleApprovals, setSaleApprovals] = useState([
    { id: 1, name: 'Calabash Point Combo', agent: 'Jordan Cole', status: 'Pending Docs' },
  ]);

  const [propertyApprovals, setPropertyApprovals] = useState([
    { id: 1, name: 'New Waterfront Listing', reviewer: 'Simone', status: 'Quality Check' },
  ]);

  const [miniNotice, setMiniNotice] = useState('');

  const handleLogout = async () => {
    try {
      const { auth, signOut } = await getAuthHelpers();
      if (auth && signOut) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Unable to sign out', error);
    } finally {
      navigate('/admin/login');
    }
  };

  const addPortfolioItem = () => {
    if (!portfolioForm.title || !portfolioForm.price) return;
    const payload = {
      id: Date.now(),
      name: portfolioForm.title,
      price: portfolioForm.price,
      beds: Number(portfolioForm.bedrooms || 0),
      baths: Number(portfolioForm.bathrooms || 0),
      acres: Number(portfolioForm.squareFeet || 0),
      category: portfolioForm.category,
      status: portfolioForm.status.toLowerCase(),
      type: portfolioForm.type,
      address: portfolioForm.address,
      quarter: portfolioForm.quarter,
      hasPool: portfolioForm.hasPool,
      amenities: portfolioForm.amenities,
      description: portfolioForm.description,
      imageUrl:
        portfolioForm.imageUrl ||
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    };

    setProperties((items) => [...items, payload]);
    setPortfolioForm({
      title: '',
      price: '',
      category: 'Residential',
      type: 'Villa',
      status: 'For Sale',
      address: '',
      quarter: '',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      hasPool: true,
      imageUrl: '',
      amenities: '',
      description: '',
    });
    setMiniNotice('Portfolio item added to site data.');
    setActiveTab('portfolio');
  };

  const addRental = () => {
    if (!rentalForm.name || !rentalForm.weekly) return;
    const payload = {
      ...rentalForm,
      id: Date.now(),
      guests: Number(rentalForm.guests || 0),
      beds: Number(rentalForm.beds || 0),
      baths: Number(rentalForm.baths || 0),
      amenities: rentalForm.amenities ? rentalForm.amenities.split(',').map((a) => a.trim()) : [],
      image:
        rentalForm.image ||
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    };

    setRentals((items) => [...items, payload]);
    setRentalForm({ name: '', weekly: '', guests: '', beds: '', baths: '', amenities: '', image: '' });
    setMiniNotice('Rental property added to front-end inventory.');
    setActiveTab('rentals');
  };

  const addTestimonial = () => {
    setTestimonials((items) => [
      ...items,
      { id: Date.now(), name: 'New Guest', quote: 'Thanks for keeping the experience premium.' },
    ]);
    setMiniNotice('Sample testimonial injected to live feed.');
  };

  const stats = useMemo(
    () => [
      { label: 'Active listings', value: properties.length },
      { label: 'Rental stays', value: rentals.length },
      { label: 'Testimonials', value: testimonials.length },
      { label: 'Gallery items', value: gallery.length },
    ],
    [gallery.length, properties.length, rentals.length, testimonials.length]
  );

  const authenticatedView = useMemo(() => {
    return (
      <div className={styles.portal}>
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>Admin Control Room</p>
            <h1>Premium property operations</h1>
            <p className={styles.subhead}>Manage every touchpoint—from listings to approvals—in one luminous panel.</p>
            <div className={styles.heroActions}>
              <button className="button" onClick={addTestimonial}>
                Quick add testimonial
              </button>
              <button className="button secondary" onClick={handleLogout}>
                Log out
              </button>
            </div>
            {miniNotice && <p className={styles.notice}>{miniNotice}</p>}
          </div>
          <div className={styles.heroCard}>
            <p className={styles.heroLabel}>Live pulse</p>
            <div className={styles.statGrid}>
              {stats.map((item) => (
                <div key={item.label} className={styles.statCard}>
                  <p className={styles.statLabel}>{item.label}</p>
                  <p className={styles.statValue}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <nav className={styles.nav} aria-label="Admin sections">
          {tabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? styles.active : ''} onClick={() => setActiveTab(tab)}>
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>

        {activeTab === 'portfolio' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Portfolio management</p>
                <h2>Add portfolio item</h2>
                <p className={styles.muted}>Create a new hero listing and push it to the public gallery instantly.</p>
              </div>
              <span className={styles.pill}>Live sync</span>
            </div>
            <div className={styles.gridTwo}>
              <div className={styles.card}>
                <div className={styles.formGrid}>
                  <label>
                    Title*
                    <input
                      placeholder="Property title"
                      value={portfolioForm.title}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, title: e.target.value }))}
                    />
                  </label>
                  <label>
                    Price*
                    <input
                      placeholder="$1,500,000 or Price on request"
                      value={portfolioForm.price}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, price: e.target.value }))}
                    />
                  </label>
                  <label>
                    Category*
                    <select
                      value={portfolioForm.category}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, category: e.target.value }))}
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Investment</option>
                    </select>
                  </label>
                  <label>
                    Type*
                    <select value={portfolioForm.type} onChange={(e) => setPortfolioForm((f) => ({ ...f, type: e.target.value }))}>
                      <option>Villa</option>
                      <option>House</option>
                      <option>Condo</option>
                      <option>Estate</option>
                    </select>
                  </label>
                  <label>
                    Status*
                    <select
                      value={portfolioForm.status}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, status: e.target.value }))}
                    >
                      <option>For Sale</option>
                      <option>For Rent</option>
                      <option>Coming Soon</option>
                    </select>
                  </label>
                  <label>
                    Location Address
                    <input
                      placeholder="Street address"
                      value={portfolioForm.address}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, address: e.target.value }))}
                    />
                  </label>
                  <label>
                    Quarter
                    <input
                      placeholder="Coral Bay, Cruz Bay, etc."
                      value={portfolioForm.quarter}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, quarter: e.target.value }))}
                    />
                  </label>
                  <label>
                    Bedrooms
                    <input
                      placeholder="3"
                      value={portfolioForm.bedrooms}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, bedrooms: e.target.value }))}
                    />
                  </label>
                  <label>
                    Bathrooms
                    <input
                      placeholder="2"
                      value={portfolioForm.bathrooms}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, bathrooms: e.target.value }))}
                    />
                  </label>
                  <label>
                    Square Feet
                    <input
                      placeholder="2,500"
                      value={portfolioForm.squareFeet}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, squareFeet: e.target.value }))}
                    />
                  </label>
                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={portfolioForm.hasPool}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, hasPool: e.target.checked }))}
                    />
                    Has Pool
                  </label>
                  <label>
                    Images
                    <input
                      placeholder="Image URL"
                      value={portfolioForm.imageUrl}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    />
                  </label>
                  <label>
                    Add Amenities
                    <input
                      placeholder="Ocean views, Pool, etc."
                      value={portfolioForm.amenities}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, amenities: e.target.value }))}
                    />
                  </label>
                  <label className={styles.fullRow}>
                    Add Description
                    <textarea
                      placeholder="Property description..."
                      value={portfolioForm.description}
                      onChange={(e) => setPortfolioForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </label>
                </div>
                <div className={styles.actions}>
                  <button className="button secondary" onClick={() => setPortfolioForm((f) => ({ ...f, description: '' }))}>
                    Cancel
                  </button>
                  <button className="button" onClick={addPortfolioItem}>
                    Create item
                  </button>
                </div>
              </div>
              <div className={styles.card}>
                <h3>Live portfolio queue</h3>
                <p className={styles.muted}>Newest entries float to the top. Tap any to toggle its visibility.</p>
                <div className={styles.itemList}>
                  {properties
                    .slice()
                    .reverse()
                    .map((item) => (
                      <div key={item.id} className={styles.listRow}>
                        <div>
                          <p className={styles.itemTitle}>{item.name}</p>
                          <p className={styles.muted}>{item.price}</p>
                        </div>
                        <div className={styles.rowActions}>
                          <button
                            className="button secondary"
                            onClick={() =>
                              setProperties((entries) =>
                                entries.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, status: entry.status === 'hidden' ? 'for-sale' : 'hidden' }
                                    : entry
                                )
                              )
                            }
                          >
                            {item.status === 'hidden' ? 'Unhide' : 'Hide'}
                          </button>
                          <button className="button" onClick={() => setProperties((entries) => entries.filter((p) => p.id !== item.id))}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'agents' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Agent management</p>
                <h2>Elevate the team</h2>
              </div>
              <span className={styles.pill}>People</span>
            </div>
            <div className={styles.gridTwo}>
              <div className={styles.card}>
                <div className={styles.formGrid}>
                  <label>
                    Full name
                    <input value={agentForm.name} onChange={(e) => setAgentForm((f) => ({ ...f, name: e.target.value }))} />
                  </label>
                  <label>
                    Role
                    <input value={agentForm.role} onChange={(e) => setAgentForm((f) => ({ ...f, role: e.target.value }))} />
                  </label>
                  <label>
                    Email
                    <input value={agentForm.email} onChange={(e) => setAgentForm((f) => ({ ...f, email: e.target.value }))} />
                  </label>
                  <label>
                    Phone
                    <input value={agentForm.phone} onChange={(e) => setAgentForm((f) => ({ ...f, phone: e.target.value }))} />
                  </label>
                </div>
                <div className={styles.actions}>
                  <button
                    className="button"
                    onClick={() => {
                      if (!agentForm.name) return;
                      setAgents((list) => [...list, { ...agentForm, id: Date.now() }]);
                      setAgentForm({ name: '', role: '', email: '', phone: '' });
                    }}
                  >
                    Add agent
                  </button>
                </div>
              </div>
              <div className={styles.card}>
                <h3>On-deck agents</h3>
                <div className={styles.itemList}>
                  {agents.map((agent) => (
                    <div key={agent.id} className={styles.listRow}>
                      <div>
                        <p className={styles.itemTitle}>{agent.name}</p>
                        <p className={styles.muted}>{agent.role}</p>
                        <p className={styles.muted}>{agent.email}</p>
                      </div>
                      <button className="button secondary" onClick={() => setAgents((list) => list.filter((a) => a.id !== agent.id))}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'rentals' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Add rental property</p>
                <h2>Fresh stays</h2>
              </div>
              <span className={styles.pill}>Hospitality</span>
            </div>
            <div className={styles.gridTwo}>
              <div className={styles.card}>
                <div className={styles.formGrid}>
                  <label>
                    Rental name
                    <input value={rentalForm.name} onChange={(e) => setRentalForm((f) => ({ ...f, name: e.target.value }))} />
                  </label>
                  <label>
                    Weekly rate
                    <input value={rentalForm.weekly} onChange={(e) => setRentalForm((f) => ({ ...f, weekly: e.target.value }))} />
                  </label>
                  <label>
                    Guests
                    <input value={rentalForm.guests} onChange={(e) => setRentalForm((f) => ({ ...f, guests: e.target.value }))} />
                  </label>
                  <label>
                    Beds
                    <input value={rentalForm.beds} onChange={(e) => setRentalForm((f) => ({ ...f, beds: e.target.value }))} />
                  </label>
                  <label>
                    Baths
                    <input value={rentalForm.baths} onChange={(e) => setRentalForm((f) => ({ ...f, baths: e.target.value }))} />
                  </label>
                  <label>
                    Amenities
                    <input
                      placeholder="Pool, concierge, chef"
                      value={rentalForm.amenities}
                      onChange={(e) => setRentalForm((f) => ({ ...f, amenities: e.target.value }))}
                    />
                  </label>
                  <label>
                    Image URL
                    <input value={rentalForm.image} onChange={(e) => setRentalForm((f) => ({ ...f, image: e.target.value }))} />
                  </label>
                </div>
                <div className={styles.actions}>
                  <button className="button" onClick={addRental}>
                    Add rental property
                  </button>
                </div>
              </div>
              <div className={styles.card}>
                <h3>Rental lineup</h3>
                <div className={styles.itemList}>
                  {rentals.map((rental) => (
                    <div key={rental.id} className={styles.listRow}>
                      <div>
                        <p className={styles.itemTitle}>{rental.name}</p>
                        <p className={styles.muted}>{rental.weekly} • Sleeps {rental.guests}</p>
                      </div>
                      <div className={styles.rowActions}>
                        <button
                          className="button secondary"
                          onClick={() =>
                            setRentals((list) =>
                              list.map((entry) =>
                                entry.id === rental.id ? { ...entry, weekly: `${entry.weekly} • updated` } : entry
                              )
                            )
                          }
                        >
                          Bump rate
                        </button>
                        <button className="button" onClick={() => setRentals((list) => list.filter((r) => r.id !== rental.id))}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'bookings' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Booking requests</p>
                <h2>Concierge inbox</h2>
              </div>
              <span className={styles.pill}>Guest care</span>
            </div>
            <div className={styles.card}>
              <div className={styles.itemList}>
                {bookingRequests.map((request) => (
                  <div key={request.id} className={styles.listRow}>
                    <div>
                      <p className={styles.itemTitle}>{request.guest}</p>
                      <p className={styles.muted}>
                        {request.property} • {request.dates}
                      </p>
                    </div>
                    <div className={styles.rowActions}>
                      <span className={styles.badge}>{request.status}</span>
                      <button
                        className="button"
                        onClick={() =>
                          setBookingRequests((queue) =>
                            queue.map((entry) =>
                              entry.id === request.id ? { ...entry, status: 'Confirmed + responded' } : entry
                            )
                          )
                        }
                      >
                        Mark handled
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'blogs' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Blogs management</p>
                <h2>Storytelling that sells</h2>
              </div>
              <span className={styles.pill}>Content</span>
            </div>
            <div className={styles.gridTwo}>
              <div className={styles.card}>
                <div className={styles.formGrid}>
                  <label>
                    Title
                    <input value={blogForm.title} onChange={(e) => setBlogForm((f) => ({ ...f, title: e.target.value }))} />
                  </label>
                  <label className={styles.fullRow}>
                    Summary
                    <textarea
                      value={blogForm.summary}
                      onChange={(e) => setBlogForm((f) => ({ ...f, summary: e.target.value }))}
                      placeholder="Short intro for homepage cards"
                    />
                  </label>
                  <label>
                    Tag
                    <select value={blogForm.tag} onChange={(e) => setBlogForm((f) => ({ ...f, tag: e.target.value }))}>
                      <option>Market Update</option>
                      <option>Community</option>
                      <option>How-To</option>
                    </select>
                  </label>
                </div>
                <div className={styles.actions}>
                  <button
                    className="button"
                    onClick={() => {
                      if (!blogForm.title) return;
                      setBlogs((list) => [...list, { ...blogForm, id: Date.now() }]);
                      setBlogForm({ title: '', summary: '', tag: 'Market Update' });
                    }}
                  >
                    Publish blog
                  </button>
                </div>
              </div>
              <div className={styles.card}>
                <h3>Drafts & live posts</h3>
                <div className={styles.itemList}>
                  {blogs.map((blog) => (
                    <div key={blog.id} className={styles.listRow}>
                      <div>
                        <p className={styles.itemTitle}>{blog.title}</p>
                        <p className={styles.muted}>{blog.summary}</p>
                      </div>
                      <div className={styles.rowActions}>
                        <span className={styles.badge}>{blog.tag}</span>
                        <button className="button secondary" onClick={() => setBlogs((list) => list.filter((b) => b.id !== blog.id))}>
                          Archive
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'rental-approval' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Rental approval</p>
                <h2>Fast-track owner submissions</h2>
              </div>
              <span className={styles.pill}>Workflow</span>
            </div>
            <div className={styles.card}>
              {rentalApprovals.map((item) => (
                <div key={item.id} className={styles.listRow}>
                  <div>
                    <p className={styles.itemTitle}>{item.name}</p>
                    <p className={styles.muted}>Owner: {item.owner}</p>
                  </div>
                  <div className={styles.rowActions}>
                    <span className={styles.badge}>{item.status}</span>
                    <button
                      className="button"
                      onClick={() =>
                        setRentalApprovals((list) =>
                          list.map((entry) => (entry.id === item.id ? { ...entry, status: 'Approved & published' } : entry))
                        )
                      }
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'sale-approval' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Sale approval</p>
                <h2>Compliance ready</h2>
              </div>
              <span className={styles.pill}>Legal</span>
            </div>
            <div className={styles.card}>
              {saleApprovals.map((item) => (
                <div key={item.id} className={styles.listRow}>
                  <div>
                    <p className={styles.itemTitle}>{item.name}</p>
                    <p className={styles.muted}>Agent: {item.agent}</p>
                  </div>
                  <div className={styles.rowActions}>
                    <span className={styles.badge}>{item.status}</span>
                    <button
                      className="button"
                      onClick={() =>
                        setSaleApprovals((list) =>
                          list.map((entry) => (entry.id === item.id ? { ...entry, status: 'Cleared to close' } : entry))
                        )
                      }
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'property-approval' && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>Property approval</p>
                <h2>Quality gate</h2>
              </div>
              <span className={styles.pill}>Brand safety</span>
            </div>
            <div className={styles.card}>
              {propertyApprovals.map((item) => (
                <div key={item.id} className={styles.listRow}>
                  <div>
                    <p className={styles.itemTitle}>{item.name}</p>
                    <p className={styles.muted}>Reviewer: {item.reviewer}</p>
                  </div>
                  <div className={styles.rowActions}>
                    <span className={styles.badge}>{item.status}</span>
                    <button
                      className="button"
                      onClick={() =>
                        setPropertyApprovals((list) =>
                          list.map((entry) => (entry.id === item.id ? { ...entry, status: 'Approved for launch' } : entry))
                        )
                      }
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }, [
    activeTab,
    addTestimonial,
    agents,
    blogs,
    bookingRequests,
    gallery.length,
    miniNotice,
    properties,
    propertyApprovals,
    rentalApprovals,
    rentals,
    saleApprovals,
    stats,
  ]);

  return <div className={styles.wrapper}>{authenticatedView}</div>;
};

export default AdminApp;
