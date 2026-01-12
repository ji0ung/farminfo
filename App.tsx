
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TargetAudience from './components/TargetAudience';
import CollaborationCases from './components/CollaborationCases';
import PartnerSuccessCases from './components/PartnerSuccessCases';
import Process from './components/Process';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SkeletonLoader from './components/SkeletonLoader';
import ContactModal from './components/ContactModal';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {loading && <SkeletonLoader />}
      <CustomCursor />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      
      <div className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onOpenContact={openModal} />
        <main>
          <Hero onOpenContact={openModal} />
          <Features />
          <TargetAudience />
          <CollaborationCases />
          <PartnerSuccessCases />
          <Process />
          <FAQ />
          <CTA onOpenContact={openModal} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
