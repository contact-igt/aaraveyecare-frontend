import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesGrid from './components/ServicesGrid';
import WhyUsSection from './components/WhyUsSection';
import VideoTestimonials from './components/VideoTestimonials';
import EyeCareCenters from './components/EyeCareCenters';
import TextTestimonials from './components/TextTestimonials';
import FaqSection from './components/FaqSection';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ThankYou from './components/ThankYou';

function LandingPage() {
  return (
    <>
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 6. Video Testimonials */}
      <VideoTestimonials />

      {/* 5. Why Us */}
      <WhyUsSection />

      {/* 4. Services Grid */}
      <ServicesGrid />

      {/* 7. Eye Care Centers */}
      <EyeCareCenters />

      {/* 8. Text Testimonials */}
      <TextTestimonials />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Appointment Form */}
      <AppointmentForm />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
        {/* 1. Header */}
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>

        {/* 11. Footer */}
        <Footer />

        {/* Floating Action Buttons */}
        <FloatingActions />
      </div>
    </BrowserRouter>
  );
}
