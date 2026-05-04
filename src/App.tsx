import React from 'react';
import { AppProvider } from './context';
import { AppLayout } from './components/Core';
import { StatsSection, ServicesSection } from './components/Sections';
import { PortfolioSection } from './components/Portfolio';
import { TestimonialsSection } from './components/Testimonials';
import { ContactSection, Footer } from './components/Contact';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminOverlay } from './components/AdminOverlay';

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <AdminOverlay />
    </AppProvider>
  );
}
