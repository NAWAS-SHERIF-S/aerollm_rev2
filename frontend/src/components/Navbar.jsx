import React, { useState, useEffect } from 'react';
import { Search, Plane, ChevronRight } from 'lucide-react';
import { apiService } from '../services/api';

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
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2.5 rounded-full bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-xl shadow-sky-900/10">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group pl-3"
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 p-0.5 shadow-md shadow-sky-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-sky-600 transform -rotate-45" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 font-['Outfit']">
              Aero<span className="text-sky-600 font-extrabold">LLM</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-extrabold tracking-wider">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>{isOnline ? 'NovaTRix GPU Active' : 'NovaTRix Engine'}</span>
            </div>
          </div>
        </div>

        {/* Floating Glass Navigation Links with Bold Dark Slate Text */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-xl border border-slate-200 p-1.5 rounded-full shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-extrabold rounded-full transition-all duration-200 ${
                activePage === item.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/30 ring-1 ring-sky-400'
                  : 'text-slate-800 hover:text-sky-700 hover:bg-sky-100/80'
              }`}
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
            className="w-10 h-10 btn-liquid-icon shadow-md"
            title="Global Aviation Search (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-slate-800 font-bold" />
          </button>

          {/* Glass Try AeroLLM Primary CTA Button */}
          <button
            onClick={() => setActivePage('try')}
            className={`btn-liquid-primary text-sm py-2.5 px-6 ${activePage === 'try' ? 'ring-2 ring-sky-500 ring-offset-2 ring-offset-white' : ''}`}
          >
            <span>Try AeroLLM</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
