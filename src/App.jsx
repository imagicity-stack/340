import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import SocialBar from './components/SocialBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Rentals from './pages/Rentals.jsx';
import Testimonials from './pages/Testimonials.jsx';
import AboutStJohn from './pages/AboutStJohn.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import AdminApp from './admin/AdminApp.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminRouteGuard from './admin/AdminRouteGuard.jsx';
import Team from './pages/Team.jsx';
import { SiteDataProvider } from './state/SiteDataContext.jsx';

const App = () => {
  return (
    <SiteDataProvider>
      <Header />
      <SocialBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/team" element={<Team />} />
        <Route path="/340team" element={<Team />} />
        <Route path="/about-st-john" element={<AboutStJohn />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRouteGuard>
              <AdminApp />
            </AdminRouteGuard>
          }
        />
      </Routes>
      <Footer />
    </SiteDataProvider>
  );
};

export default App;
