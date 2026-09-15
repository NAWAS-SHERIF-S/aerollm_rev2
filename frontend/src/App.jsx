import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/glass/SearchModal';

import Home from './pages/Home/Home';
import Dataset from './pages/Dataset/Dataset';
import Capabilities from './pages/Capabilities/Capabilities';
import UseCases from './pages/UseCases/UseCases';
import TryAeroLLM from './pages/TryAeroLLM/TryAeroLLM';
import Dashboard from './pages/Dashboard/Dashboard';
import AircraftPage from './pages/Aircraft/Aircraft';
import MaintenanceHistory from './pages/History/MaintenanceHistory';
import Faults from './pages/Faults/Faults';
import About from './pages/About/About';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard listener for Ctrl+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'dataset':
        return <Dataset setActivePage={setActivePage} />;
      case 'capabilities':
        return <Capabilities setActivePage={setActivePage} />;
      case 'use-cases':
        return <UseCases setActivePage={setActivePage} />;
      case 'try':
        return <TryAeroLLM setActivePage={setActivePage} />;
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'aircraft':
        return <AircraftPage setActivePage={setActivePage} />;
      case 'history':
        return <MaintenanceHistory setActivePage={setActivePage} />;
      case 'faults':
        return <Faults setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white relative flex flex-col font-sans">
      
      {/* 1. Ambient Background Grid */}
      <div className="app-bg-grid" />

      {/* 2. Global Aircraft Background Layer Visible Across ALL Pages */}
      <div className="global-aircraft-viewport-bg">
        <div className="global-aircraft-image" />
        <div className="global-aircraft-overlay" />
      </div>

      {/* 3. Floating Liquid Glass Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 4. Main Page View Container */}
      <main className="flex-1 relative z-10">
        {renderPage()}
      </main>

      {/* 5. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(res) => {
          if (res.type === 'maintenance') setActivePage('history');
          else if (res.type === 'aircraft') setActivePage('aircraft');
          else if (res.type === 'fault') setActivePage('faults');
        }}
      />

      {/* 6. Persistent Liquid Glass Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
