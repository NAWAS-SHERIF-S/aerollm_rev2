import React, { useState, useEffect } from 'react';
import { Plane, Wrench, X, ChevronRight, Sparkles } from 'lucide-react';
import { apiService } from '../../services/api';

export default function AircraftPage({ setActivePage }) {
  const [fleet, setFleet] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [aircraftHistory, setAircraftHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFleet = async () => {
    setLoading(true);
    try {
      const res = await apiService.getAircraftList();
      setFleet(res.aircraft || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFleet();
  }, []);

  const openAircraftDetail = async (ac) => {
    setSelectedAircraft(ac);
    setAircraftHistory([]);
    try {
      const res = await apiService.getAircraftMaintenance(ac.id);
      setAircraftHistory(res.records || []);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFleet = fleet.filter(ac => {
    if (filter === 'ALL') return true;
    return ac.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-sparkle">
              <Sparkles className="w-3.5 h-3.5 text-[#6654f5]" />
              Fleet Intelligence Registry
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Aircraft Fleet Directory
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Real-time status tracking, model taxonomy, and maintenance history per airframe.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
          {['ALL', 'ACTIVE', 'MAINTENANCE', 'INSPECTION'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                filter === tab 
                  ? 'bg-gradient-to-r from-[#6654f5] to-[#ca5a8b] text-white shadow-md' 
                  : 'text-slate-600 hover:text-[#6654f5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFleet.map((ac) => (
          <div
            key={ac.id}
            onClick={() => openAircraftDetail(ac)}
            className="glass-panel p-6 space-y-4 cursor-pointer hover:border-[#6654f5]/40 transition-all group bg-white/95 border border-indigo-500/15 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6654f5] group-hover:scale-105 transition-transform">
                  <Plane className="w-6 h-6 transform -rotate-45" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit'] group-hover:text-[#6654f5] transition-colors">
                    {ac.id}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">Model: {ac.model}</p>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                ac.status === 'ACTIVE' ? 'badge-glow-emerald' : ac.status === 'MAINTENANCE' ? 'badge-glow-amber' : 'badge-sparkle'
              }`}>
                {ac.status}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Added: {new Date(ac.created_at).toLocaleDateString()}</span>
              <span className="text-[#6654f5] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                View Logs <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AIRCRAFT DETAIL MODAL */}
      {selectedAircraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="w-full max-w-3xl glass-panel p-8 space-y-6 relative bg-white border-indigo-500/30 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => setSelectedAircraft(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6654f5] to-[#ca5a8b] p-0.5 shadow-lg">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Plane className="w-7 h-7 text-[#6654f5] transform -rotate-45" />
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Airframe Profile</span>
                <h2 className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{selectedAircraft.id}</h2>
                <p className="text-xs text-[#6654f5] font-mono font-semibold">Model: {selectedAircraft.model} • Status: {selectedAircraft.status}</p>
              </div>
            </div>

            {/* Maintenance Records list for this Aircraft */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#6654f5]" />
                <span>Maintenance History Logs ({aircraftHistory.length})</span>
              </h3>

              {aircraftHistory.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center font-medium">No maintenance logs recorded for {selectedAircraft.id} yet.</p>
              ) : (
                <div className="space-y-3">
                  {aircraftHistory.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-mono text-[#6654f5] font-bold">Log #{rec.id}</span>
                        <span>{new Date(rec.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-800 font-medium">{rec.report}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-semibold text-slate-500">Actions:</span>
                        {rec.actions?.map((act, idx) => (
                          <span key={idx} className="badge bg-indigo-50 text-[#6654f5] border-indigo-200 text-[10px] py-0.5 px-2">{act}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedAircraft(null);
                  setActivePage('try');
                }}
                className="btn-liquid-primary text-xs py-2.5 px-6 font-bold"
              >
                Analyze New Report for {selectedAircraft.id} →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

