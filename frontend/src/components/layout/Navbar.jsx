import React, { useState, useEffect } from 'react';
import { Search, Plane, Sparkles, ArrowRight } from 'lucide-react';
import { apiService } from '../../services/api';

export default function Navbar({ activePage, setActivePage, onOpenSearch }) {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    apiService.getHealth().then(data => setHealth(data)).catch(() => {});
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'aircraft', label: 'Aircraft' },
    { id: 'faults', label: 'Diagnostics' },
    { id: 'history', label: 'Maintenance Logs' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'dataset', label: 'Dataset' },
    { id: 'about', label: 'About' },
  ];

  const isOnline = health?.backend === 'online';

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 py-3 bg-white/80 backdrop-blur-xl border-b border-indigo-500/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Status */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6654f5] via-[#ca5a8b] to-[#f2b347] p-0.5 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#6654f5] transform -rotate-45" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-['Outfit']">
                Aero<span className="text-gradient">LLM</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">
                AI Copilot
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>{isOnline ? 'RAG Engine Online' : 'Engine Ready'}</span>
            </div>
          </div>
        </div>

        {/* Floating Glass Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
                activePage === item.id
                  ? 'bg-gradient-to-r from-[#6654f5] to-[#ca5a8b] text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 hover:text-[#6654f5] hover:bg-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/70 rounded-full border border-slate-200 transition-colors"
            title="Global Aviation Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-slate-300 rounded font-mono text-slate-500">
              Ctrl K
            </kbd>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => setActivePage('try')}
            className={`btn-liquid-primary text-xs sm:text-sm py-2 px-4 sm:px-5 font-bold shadow-md shadow-indigo-500/25 ${activePage === 'try' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}

