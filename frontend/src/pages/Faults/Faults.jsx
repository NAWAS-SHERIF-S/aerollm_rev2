import React, { useState, useEffect } from 'react';
import { AlertTriangle, Filter, Wrench, Sparkles, ChevronRight } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-sparkle">
              <Sparkles className="w-3.5 h-3.5 text-[#6654f5]" />
              Real-Time Hazard Intelligence Radar
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Aviation Fault Diagnostics
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Automated fault logging and airworthiness severity tracking across fleet operations.
          </p>
        </div>

        {/* Aircraft Filter */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#6654f5]" /> Filter Tail:
          </span>
          <select
            value={selectedAircraft}
            onChange={(e) => setSelectedAircraft(e.target.value)}
            className="input-field text-xs py-2 px-3 rounded-full border border-slate-300 font-semibold bg-white text-slate-900 shadow-sm"
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
              className="glass-panel p-6 space-y-4 relative bg-white/95 border border-indigo-500/15 hover:border-[#6654f5]/40 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isResolved ? 'bg-emerald-100 border border-emerald-300 text-emerald-700' : 'bg-amber-100 border border-amber-300 text-amber-700'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="badge badge-sparkle text-[10px] py-0.5 px-2 font-mono font-bold text-[#6654f5]">{item.aircraft || 'VT101'}</span>
                    <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mt-1 line-clamp-1">{item.fault}</h3>
                  </div>
                </div>

                <span className={isResolved ? 'badge-glow-emerald' : 'badge-glow-amber'}>
                  {item.status}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <span className="flex items-center gap-1.5 font-bold">
                  <Wrench className="w-3.5 h-3.5 text-[#6654f5]" /> Action: {item.action || 'REPLACED'}
                </span>
                <span className="font-mono text-slate-500 font-semibold">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

