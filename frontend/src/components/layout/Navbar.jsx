import React, { useState, useEffect } from 'react';
import { Search, Plane, ChevronRight } from 'lucide-react';
import { apiService } from '../../services/api';

export default function Navbar({ activePage, setActivePage, onOpenSearch }) {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    apiService.getHealth().then(data => setHealth(data)).catch(() => {});
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dataset', label: 'Dataset' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'aircraft', label: 'Aircraft' },
    { id: 'history', label: 'History' },
    { id: 'faults', label: 'Faults' },
    { id: 'about', label: 'About' },
  ];

  const isOnline = health?.backend === 'online';

  return (
    <header className="sticky top-3 z-50 px-4 lg:px-8 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2.5 rounded-full bg-[#0b122c]/65 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-cyan-500/10">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group pl-3"
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0b122c] rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-cyan-300 transform -rotate-45" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-['Outfit']">
              Aero<span className="text-gradient">LLM</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 tracking-wider">
              <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{isOnline ? 'NovaTRix GPU Active' : 'NovaTRix Engine'}</span>
            </div>
          </div>
        </div>

        {/* Floating Glass Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#070b19]/60 backdrop-blur-xl border border-white/15 p-1 rounded-full shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 pr-1">
          {/* Glass Search Button */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 btn-liquid-icon shadow-lg"
            title="Global Aviation Search (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Glass Try AeroLLM Primary CTA Button */}
          <button
            onClick={() => setActivePage('try')}
            className={`btn-liquid-primary text-sm py-2.5 px-6 ${activePage === 'try' ? 'ring-2 ring-cyan-300 ring-offset-2 ring-offset-[#070b19]' : ''}`}
          >
            <span>Try AeroLLM</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
