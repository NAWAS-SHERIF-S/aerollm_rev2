import React, { useState, useEffect } from 'react';
import { AlertTriangle, Filter, Wrench } from 'lucide-react';
import { apiService } from '../../services/api';

export default function Faults({ setActivePage }) {
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAircraft, setSelectedAircraft] = useState('');

  const loadFaults = async () => {
    setLoading(true);
    try {
      const res = await apiService.getFaults(selectedAircraft);
      setFaults(res.faults || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaults();
  }, [selectedAircraft]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <span className="badge-cyan mb-2 inline-block">Real-Time Hazard Intelligence</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Aviation Faults & Issues
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Automated fault logging and airworthiness severity tracking across fleet operations.
          </p>
        </div>

        {/* Aircraft Filter */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-300" /> Filter Tail ID:
          </span>
          <select
            value={selectedAircraft}
            onChange={(e) => setSelectedAircraft(e.target.value)}
            className="bg-[#0b122c]/80 border border-white/20 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-400 font-sans backdrop-blur-md"
          >
            <option value="">All Fleet Aircraft</option>
            <option value="VT101">VT101</option>
            <option value="VT102">VT102</option>
            <option value="VT103">VT103</option>
            <option value="VT104">VT104</option>
          </select>
        </div>
      </div>

      {/* FAULTS CARDS / TABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faults.map((item) => {
          const isResolved = item.status === 'RESOLVED';
          return (
            <div 
              key={item.id}
              className="glass-panel p-6 space-y-4 relative border-cyan-500/30 hover:border-cyan-400/60 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isResolved ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300' : 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="badge-cyan text-[10px] py-0 px-2 font-mono">{item.aircraft || 'VT101'}</span>
                    <h3 className="text-base font-bold text-white font-['Outfit'] mt-1 line-clamp-1">{item.fault}</h3>
                  </div>
                </div>

                <span className={isResolved ? 'badge-green' : 'badge-amber'}>
                  {item.status}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/10 border border-white/15 flex items-center justify-between text-xs text-slate-200 backdrop-blur-md">
                <span className="flex items-center gap-1 font-semibold">
                  <Wrench className="w-3.5 h-3.5 text-cyan-300" /> Action: {item.action || 'REPLACED'}
                </span>
                <span className="font-mono text-slate-300">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
