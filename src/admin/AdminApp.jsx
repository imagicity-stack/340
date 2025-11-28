'use client';

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './AdminApp.module.css';
import { useSiteData } from '../state/SiteDataContext.jsx';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const amenityOptions = [
  { key: 'pool', label: 'Pool' },
  { key: 'wifi', label: 'WiFi' },
  { key: 'airConditioning', label: 'Air Conditioning' },
  { key: 'fullKitchen', label: 'Full Kitchen' },
  { key: 'parking', label: 'Parking' },
  { key: 'balconyPatio', label: 'Balcony/Patio' },
  { key: 'tv', label: 'TV' },
  { key: 'washer', label: 'Washer' },
  { key: 'dryer', label: 'Dryer' },
  { key: 'oceanView', label: 'Ocean View' },
  { key: 'fireplace', label: 'Fireplace' },
  { key: 'gymFitness', label: 'Gym/Fitness' },
  { key: 'elevator', label: 'Elevator' },
  { key: 'hotTub', label: 'Hot Tub' },
  { key: 'wheelchairAccessible', label: 'Wheelchair Accessible' },
  { key: 'securitySystem', label: 'Security System' },
];

const subdivisions = [
  {
    title: 'ADRIAN, BEVERHOUDSTEIN and BELLEVUE',
    description: 'Somewhat flat land five minutes drive to town, predominantly valley views referred to as the “country”',
  },
  { title: 'ANNABERG', description: 'North Shore land near Francis and Maho bays' },
  { title: 'BETHANY', description: 'High above Cruz Bay and Great Cruz Bay with views from South to West' },
  { title: 'BORDEAUX HEIGHTS', description: 'On top of Bordeaux Mountain with views East to West' },
  {
    title: 'CALABASH BOOM',
    description: 'In Coral Bay past Shipwreck Restaurant with views East to the British Virgin Islands',
  },
  {
    title: 'CAROLINA',
    description: 'One thousand acres+ including Bordeaux mountain and sweeping around the whole Coral Bay to the North and East',
  },
  { title: 'CATHERINEBERG', description: 'Above Trunk Bay with views from North to East. Access from either Rt 10 or Rt 20' },
  { title: 'CHOCOLATE HOLE', description: 'Established area on South side, close to Cruz Bay with views of South and West' },
];

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const defaultAmenitiesState = amenityOptions.reduce((acc, option) => ({ ...acc, [option.key]: false }), {});

const getInitialRentalForm = () => ({
  propertyName: '',
  propertyType: 'Villa',
  slug: '',
  status: 'Available',
  description: '',
  address: '',
  neighborhood: '',
  zip: '',
  bedrooms: '',
  bathrooms: '',
  maxOccupancy: '',
  minStay: '',
  squareFeet: '',
  yearBuilt: '',
  lotSize: '',
  furnished: false,
  petFriendly: false,
  smokingAllowed: false,
  nightlyRate: '',
  weeklyRate: '',
  monthlyRate: '',
  cleaningFee: '',
  securityDeposit: '',
  cancellationPolicy: 'Moderate - Full refund 5 days prior',
  houseRules: '',
  mainImage: '',
  gallery1: '',
  gallery2: '',
  gallery3: '',
  gallery4: '',
  managerName: '',
  managerPhone: '',
  emergencyContact: '',
  keyPickupLocation: '',
  keyPickupInstructions: '',
  amenities: { ...defaultAmenitiesState },
  subdivision: '',
});

const formatCurrency = (value) => {
  if (!value) return '';
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return value;
  return `$${numericValue.toLocaleString()}`;
};

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

  const [rentalForm, setRentalForm] = useState(getInitialRentalForm());

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
      await signOut(auth);
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

  const addRental = async () => {
    if (!rentalForm.propertyName || !rentalForm.nightlyRate) return;

  try {
    const amenityLabels = amenityOptions.reduce(
      (acc, option) => ({ ...acc, [option.key]: option.label }),
      {}
    );

    const payload = {
      name: rentalForm.propertyName,
      type: rentalForm.propertyType,
      slug: rentalForm.slug || slugify(rentalForm.propertyName),
      status: rentalForm.status,
      description: rentalForm.description,
      address: rentalForm.address,
      neighborhood: rentalForm.neighborhood,
      subdivision: rentalForm.subdivision,
      zip: rentalForm.zip,
      guests: Number(rentalForm.maxOccupancy || rentalForm.guests || 0),
      beds: Number(rentalForm.bedrooms || 0),
      baths: Number(rentalForm.bathrooms || 0),
      maxOccupancy: Number(rentalForm.maxOccupancy || 0),
      minStay: Number(rentalForm.minStay || 0),
      squareFeet: Number(rentalForm.squareFeet || 0),
      yearBuilt: rentalForm.yearBuilt,
      lotSize: rentalForm.lotSize,
      furnished: rentalForm.furnished,
      petFriendly: rentalForm.petFriendly,
      smokingAllowed: rentalForm.smokingAllowed,
      nightly: formatCurrency(rentalForm.nightlyRate),
      weekly:
        formatCurrency(rentalForm.weeklyRate) ||
        (rentalForm.nightlyRate ? `$${(Number(rentalForm.nightlyRate) * 7).toLocaleString()}` : ''),
      monthly: formatCurrency(rentalForm.monthlyRate),
      cleaningFee: formatCurrency(rentalForm.cleaningFee),
      securityDeposit: formatCurrency(rentalForm.securityDeposit),
      cancellationPolicy: rentalForm.cancellationPolicy,
      houseRules: rentalForm.houseRules,
      amenities: Object.entries(rentalForm.amenities)
        .filter(([, value]) => value)
        .map(([key]) => amenityLabels[key]),
      image:
        rentalForm.mainImage ||
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      gallery: [rentalForm.gallery1, rentalForm.gallery2, rentalForm.gallery3, rentalForm.gallery4].filter(Boolean),
      contact: {
        managerName: rentalForm.managerName,
        managerPhone: rentalForm.managerPhone,
        emergencyContact: rentalForm.emergencyContact,
        keyPickupLocation: rentalForm.keyPickupLocation,
        keyPickupInstructions: rentalForm.keyPickupInstructions,
      },
      createdAt: Date.now(),
    };

    try {
      const docRef = await addDoc(collection(db, 'rentals'), payload);
      setRentals((items) => [...items, { ...payload, id: docRef.id }]);
      setRentalForm(getInitialRentalForm());
      setMiniNotice('Rental property added to front-end inventory.');
      setActiveTab('rentals');
    } catch (error) {
      console.error('Unable to add rental property', error);
    }
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
            <div className={styles.rentalGrid}>
              <div className={styles.card}>
                <div className={styles.sectionHeadInline}>
                  <div>
                    <p className={styles.kicker}>Basic Information</p>
                    <h3>Add rental property</h3>
                    <p className={styles.muted}>Capture everything the team needs to publish the listing instantly.</p>
                  </div>
                  <span className={styles.pill}>Required fields marked *</span>
                </div>

                <div className={styles.formGrid}>
                  <label className={styles.fullRow}>
                    Property Name *
                    <input
                      placeholder="e.g., Sunset Villa Paradise"
                      value={rentalForm.propertyName}
                      onChange={(e) =>
                        setRentalForm((f) => {
                          const nextName = e.target.value;
                          const derivedSlug = slugify(nextName);
                          const shouldUpdateSlug = !f.slug || f.slug === slugify(f.propertyName);

                          return {
                            ...f,
                            propertyName: nextName,
                            slug: shouldUpdateSlug ? derivedSlug : f.slug,
                          };
                        })
                      }
                    />
                  </label>
                  <label>
                    Property Type
                    <select
                      value={rentalForm.propertyType}
                      onChange={(e) => setRentalForm((f) => ({ ...f, propertyType: e.target.value }))}
                    >
                      <option>Villa</option>
                      <option>Condo</option>
                      <option>Townhome</option>
                      <option>Estate</option>
                      <option>Guest House</option>
                      <option>Waterfront</option>
                    </select>
                  </label>
                  <label>
                    URL Slug
                    <input
                      placeholder="sunset-villa-paradise"
                      value={rentalForm.slug}
                      onChange={(e) => setRentalForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                    />
                  </label>
                  <label>
                    Status
                    <select value={rentalForm.status} onChange={(e) => setRentalForm((f) => ({ ...f, status: e.target.value }))}>
                      <option>Available</option>
                      <option>Blocked</option>
                      <option>Temporarily Unavailable</option>
                    </select>
                  </label>
                  <label className={styles.fullRow}>
                    Description
                    <textarea
                      placeholder="Describe your property, its unique features, and what makes it special..."
                      value={rentalForm.description}
                      onChange={(e) => setRentalForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.gridTwo}>
                <div className={styles.card}>
                  <p className={styles.kicker}>Location</p>
                  <h3>Address</h3>
                  <div className={styles.formGrid}>
                    <label className={styles.fullRow}>
                      Address
                      <input
                        placeholder="123 Paradise Road"
                        value={rentalForm.address}
                        onChange={(e) => setRentalForm((f) => ({ ...f, address: e.target.value }))}
                      />
                    </label>
                    <label>
                      Neighborhood
                      <input
                        placeholder="e.g., Cruz Bay, Coral Bay"
                        value={rentalForm.neighborhood}
                        onChange={(e) => setRentalForm((f) => ({ ...f, neighborhood: e.target.value }))}
                      />
                    </label>
                    <label>
                      ZIP Code
                      <input
                        placeholder="00830"
                        value={rentalForm.zip}
                        onChange={(e) => setRentalForm((f) => ({ ...f, zip: e.target.value }))}
                      />
                    </label>
                  </div>

                  <div className={styles.subdivisionGrid}>
                    {subdivisions.map((area) => (
                      <button
                        key={area.title}
                        type="button"
                        className={`${styles.subdivisionCard} ${
                          rentalForm.subdivision === area.title ? styles.subdivisionActive : ''
                        }`}
                        onClick={() =>
                          setRentalForm((f) => ({
                            ...f,
                            subdivision: area.title,
                            neighborhood: f.neighborhood || area.title.split(',')[0],
                          }))
                        }
                      >
                        <p className={styles.subdivisionTitle}>{area.title}</p>
                        <p className={styles.muted}>{area.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.card}>
                  <p className={styles.kicker}>Property Details</p>
                  <h3>Guest-ready specifics</h3>
                  <div className={styles.formGrid}>
                    <label>
                      Bedrooms
                      <input
                        placeholder="3"
                        value={rentalForm.bedrooms}
                        onChange={(e) => setRentalForm((f) => ({ ...f, bedrooms: e.target.value }))}
                      />
                    </label>
                    <label>
                      Bathrooms
                      <input
                        placeholder="2"
                        value={rentalForm.bathrooms}
                        onChange={(e) => setRentalForm((f) => ({ ...f, bathrooms: e.target.value }))}
                      />
                    </label>
                    <label>
                      Max Occupancy
                      <input
                        placeholder="6"
                        value={rentalForm.maxOccupancy}
                        onChange={(e) => setRentalForm((f) => ({ ...f, maxOccupancy: e.target.value }))}
                      />
                    </label>
                    <label>
                      Min Stay (nights)
                      <input
                        placeholder="3"
                        value={rentalForm.minStay}
                        onChange={(e) => setRentalForm((f) => ({ ...f, minStay: e.target.value }))}
                      />
                    </label>
                    <label>
                      Square Feet
                      <input
                        placeholder="2500"
                        value={rentalForm.squareFeet}
                        onChange={(e) => setRentalForm((f) => ({ ...f, squareFeet: e.target.value }))}
                      />
                    </label>
                    <label>
                      Year Built
                      <input
                        placeholder="2020"
                        value={rentalForm.yearBuilt}
                        onChange={(e) => setRentalForm((f) => ({ ...f, yearBuilt: e.target.value }))}
                      />
                    </label>
                    <label>
                      Lot Size (sqft)
                      <input
                        placeholder="5000"
                        value={rentalForm.lotSize}
                        onChange={(e) => setRentalForm((f) => ({ ...f, lotSize: e.target.value }))}
                      />
                    </label>
                  </div>
                  <div className={styles.detailToggles}>
                    <label className={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={rentalForm.furnished}
                        onChange={(e) => setRentalForm((f) => ({ ...f, furnished: e.target.checked }))}
                      />
                      Furnished
                    </label>
                    <label className={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={rentalForm.petFriendly}
                        onChange={(e) => setRentalForm((f) => ({ ...f, petFriendly: e.target.checked }))}
                      />
                      Pet Friendly
                    </label>
                    <label className={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={rentalForm.smokingAllowed}
                        onChange={(e) => setRentalForm((f) => ({ ...f, smokingAllowed: e.target.checked }))}
                      />
                      Smoking Allowed
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.gridTwo}>
                <div className={styles.card}>
                  <p className={styles.kicker}>Amenities</p>
                  <h3>Guest expectations</h3>
                  <div className={styles.amenitiesGrid}>
                    {amenityOptions.map((amenity) => (
                      <label key={amenity.key} className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={rentalForm.amenities[amenity.key]}
                          onChange={(e) =>
                            setRentalForm((f) => ({
                              ...f,
                              amenities: { ...f.amenities, [amenity.key]: e.target.checked },
                            }))
                          }
                        />
                        {amenity.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.card}>
                  <p className={styles.kicker}>Pricing</p>
                  <h3>Nightly & beyond</h3>
                  <div className={styles.formGrid}>
                    <label>
                      Nightly Rate (USD) *
                      <input
                        placeholder="150.00"
                        value={rentalForm.nightlyRate}
                        onChange={(e) => setRentalForm((f) => ({ ...f, nightlyRate: e.target.value }))}
                      />
                    </label>
                    <label>
                      Weekly Rate (USD)
                      <input
                        placeholder="900.00"
                        value={rentalForm.weeklyRate}
                        onChange={(e) => setRentalForm((f) => ({ ...f, weeklyRate: e.target.value }))}
                      />
                    </label>
                    <label>
                      Monthly Rate (USD)
                      <input
                        placeholder="3500.00"
                        value={rentalForm.monthlyRate}
                        onChange={(e) => setRentalForm((f) => ({ ...f, monthlyRate: e.target.value }))}
                      />
                    </label>
                    <label>
                      Cleaning Fee (USD)
                      <input
                        placeholder="75.00"
                        value={rentalForm.cleaningFee}
                        onChange={(e) => setRentalForm((f) => ({ ...f, cleaningFee: e.target.value }))}
                      />
                    </label>
                    <label>
                      Security Deposit (USD)
                      <input
                        placeholder="500.00"
                        value={rentalForm.securityDeposit}
                        onChange={(e) => setRentalForm((f) => ({ ...f, securityDeposit: e.target.value }))}
                      />
                    </label>
                  </div>
                  <div className={styles.formGrid}>
                    <label>
                      Cancellation Policy
                      <select
                        value={rentalForm.cancellationPolicy}
                        onChange={(e) => setRentalForm((f) => ({ ...f, cancellationPolicy: e.target.value }))}
                      >
                        <option>Moderate - Full refund 5 days prior</option>
                        <option>Flexible - Full refund 1 day prior</option>
                        <option>Strict - 50% refund up to 7 days prior</option>
                        <option>Non-refundable</option>
                      </select>
                    </label>
                    <label className={styles.fullRow}>
                      House Rules & Policies
                      <textarea
                        placeholder="No smoking, no parties, quiet hours after 10 PM..."
                        value={rentalForm.houseRules}
                        onChange={(e) => setRentalForm((f) => ({ ...f, houseRules: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.gridTwo}>
                <div className={styles.card}>
                  <p className={styles.kicker}>Images</p>
                  <h3>Hero & gallery</h3>
                  <div className={styles.formGrid}>
                    <label className={styles.fullRow}>
                      Main Image URL *
                      <input
                        placeholder="https://example.com/main-image.jpg"
                        value={rentalForm.mainImage}
                        onChange={(e) => setRentalForm((f) => ({ ...f, mainImage: e.target.value }))}
                      />
                    </label>
                    <label>
                      Gallery image 1 URL
                      <input
                        placeholder="https://example.com/gallery-1.jpg"
                        value={rentalForm.gallery1}
                        onChange={(e) => setRentalForm((f) => ({ ...f, gallery1: e.target.value }))}
                      />
                    </label>
                    <label>
                      Gallery image 2 URL
                      <input
                        placeholder="https://example.com/gallery-2.jpg"
                        value={rentalForm.gallery2}
                        onChange={(e) => setRentalForm((f) => ({ ...f, gallery2: e.target.value }))}
                      />
                    </label>
                    <label>
                      Gallery image 3 URL
                      <input
                        placeholder="https://example.com/gallery-3.jpg"
                        value={rentalForm.gallery3}
                        onChange={(e) => setRentalForm((f) => ({ ...f, gallery3: e.target.value }))}
                      />
                    </label>
                    <label>
                      Gallery image 4 URL
                      <input
                        placeholder="https://example.com/gallery-4.jpg"
                        value={rentalForm.gallery4}
                        onChange={(e) => setRentalForm((f) => ({ ...f, gallery4: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>

                <div className={styles.card}>
                  <p className={styles.kicker}>Contact & Management</p>
                  <h3>Check-in readiness</h3>
                  <div className={styles.formGrid}>
                    <label>
                      Manager Name
                      <input
                        placeholder="Imagicity"
                        value={rentalForm.managerName}
                        onChange={(e) => setRentalForm((f) => ({ ...f, managerName: e.target.value }))}
                      />
                    </label>
                    <label>
                      Manager Phone
                      <input
                        placeholder="+1 (340) 123-4567"
                        value={rentalForm.managerPhone}
                        onChange={(e) => setRentalForm((f) => ({ ...f, managerPhone: e.target.value }))}
                      />
                    </label>
                    <label>
                      Emergency Contact
                      <input
                        placeholder="+1 (340) 987-6543"
                        value={rentalForm.emergencyContact}
                        onChange={(e) => setRentalForm((f) => ({ ...f, emergencyContact: e.target.value }))}
                      />
                    </label>
                    <label>
                      Key Pickup Location
                      <input
                        placeholder="Property office, lockbox, etc."
                        value={rentalForm.keyPickupLocation}
                        onChange={(e) => setRentalForm((f) => ({ ...f, keyPickupLocation: e.target.value }))}
                      />
                    </label>
                    <label className={styles.fullRow}>
                      Key Pickup Instructions
                      <textarea
                        placeholder="Instructions for guests on how to check in and get keys..."
                        value={rentalForm.keyPickupInstructions}
                        onChange={(e) => setRentalForm((f) => ({ ...f, keyPickupInstructions: e.target.value }))}
                      />
                    </label>
                  </div>
                  <div className={styles.actions}>
                    <button className="button secondary" onClick={() => setRentalForm(getInitialRentalForm())}>
                      Reset form
                    </button>
                    <button className="button" onClick={addRental}>
                      Submit Rental Property
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Rental lineup</h3>
              <div className={styles.itemList}>
                {rentals.map((rental) => (
                  <div key={rental.id} className={styles.listRow}>
                    <div>
                      <p className={styles.itemTitle}>{rental.name}</p>
                      <p className={styles.muted}>
                        {rental.weekly ? `${rental.weekly}/week` : rental.nightly ? `${rental.nightly}/night` : 'Rate on request'}
                      </p>
                      <p className={styles.muted}>
                        Guests: {rental.guests} · Beds: {rental.beds} · Baths: {rental.baths}
                      </p>
                    </div>
                    <button className="button secondary" onClick={() => setRentals((list) => list.filter((a) => a.id !== rental.id))}>
                      Remove
                    </button>
                  </div>
                ))}
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
