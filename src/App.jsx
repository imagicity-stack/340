import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import SocialBar from './components/SocialBar.jsx';
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Rentals from './pages/Rentals.jsx';
import Testimonials from './pages/Testimonials.jsx';
import AboutStJohn from './pages/AboutStJohn.jsx';
import Contact from './pages/Contact.jsx';
import AdminApp from './admin/AdminApp.jsx';

const App = () => {
  return (
    <>
      <Header />
      <SocialBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/about-st-john" element={<AboutStJohn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  );
};

export default App;
