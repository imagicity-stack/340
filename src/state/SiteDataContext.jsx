import React, { createContext, useContext, useMemo, useState } from 'react';

const initialProperties = [
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

const initialRentals = [
  {
    id: 1,
    name: 'Maho Bay Escape',
    guests: 8,
    beds: 4,
    baths: 3,
    weekly: '$6,800',
    amenities: ['Pool', 'Chef-ready kitchen', 'Private dock'],
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Sea Cliff Haven',
    guests: 6,
    beds: 3,
    baths: 3,
    weekly: '$5,400',
    amenities: ['Spa deck', 'Wi-Fi', 'Sunrise views'],
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Palm Grove Villa',
    guests: 10,
    beds: 5,
    baths: 4,
    weekly: '$7,900',
    amenities: ['Concierge', 'Cinema room', 'Outdoor kitchen'],
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
];

const initialTestimonials = [
  {
    id: 1,
    name: 'Summer L.',
    quote: 'Our villa sold in 12 days with multiple offers. The team handled everything flawlessly.',
  },
  {
    id: 2,
    name: 'Jared K.',
    quote: 'The rental concierge curated excursions and dining we would have never found on our own.',
  },
  {
    id: 3,
    name: 'Priya A.',
    quote: 'Transparent, responsive, and deeply connected to the island community.',
  },
];

const initialGallery = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
];

const SiteDataContext = createContext();

export const SiteDataProvider = ({ children }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [rentals, setRentals] = useState(initialRentals);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [gallery, setGallery] = useState(initialGallery);

  const value = useMemo(
    () => ({ properties, rentals, testimonials, gallery, setProperties, setRentals, setTestimonials, setGallery }),
    [gallery, properties, rentals, testimonials]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
};

export const useSiteData = () => useContext(SiteDataContext);
