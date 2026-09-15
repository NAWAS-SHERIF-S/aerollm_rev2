import React, { useState, useEffect } from 'react';
import { Plane, Wrench, X, ChevronRight } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <span className="badge-cyan mb-2 inline-block">Fleet Management</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Aircraft Intelligence
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Real-time status tracking, model taxonomy, and maintenance history per airframe.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
          {['ALL', 'ACTIVE', 'MAINTENANCE', 'INSPECTION'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`btn-liquid-chip px-3 py-1 text-xs ${
                filter === tab ? 'bg-cyan-500/40 border-cyan-300 text-white font-bold' : ''
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
            className="glass-panel p-6 space-y-4 cursor-pointer hover:border-cyan-400/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                  <Plane className="w-6 h-6 transform -rotate-45" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                    {ac.id}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">Model: {ac.model}</p>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                ac.status === 'ACTIVE' ? 'badge-green' : ac.status === 'MAINTENANCE' ? 'badge-amber' : 'badge-cyan'
              }`}>
                {ac.status}
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Added: {new Date(ac.created_at).toLocaleDateString()}</span>
              <span className="text-cyan-300 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                View History <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AIRCRAFT DETAIL MODAL */}
      {selectedAircraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-3xl glass-panel p-8 space-y-6 relative border-cyan-400/40 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedAircraft(null)}
              className="absolute top-6 right-6 btn-liquid-icon w-9 h-9"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-lg">
                <Plane className="w-8 h-8 transform -rotate-45" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Aircraft Overview</span>
                <h2 className="text-3xl font-extrabold text-white font-['Outfit']">{selectedAircraft.id}</h2>
                <p className="text-xs text-cyan-300 font-mono">Model: {selectedAircraft.model} • Status: {selectedAircraft.status}</p>
              </div>
            </div>

            {/* Maintenance Records list for this Aircraft */}
            <div className="space-y-3 pt-4 border-t border-white/15">
              <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-cyan-300" />
                <span>Maintenance History Logs ({aircraftHistory.length})</span>
              </h3>

              {aircraftHistory.length === 0 ? (
                <p className="text-sm text-slate-300 py-4 text-center">No maintenance logs recorded for {selectedAircraft.id} yet.</p>
              ) : (
                <div className="space-y-3">
                  {aircraftHistory.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2 backdrop-blur-md">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-mono text-cyan-300 font-bold">Log #{rec.id}</span>
                        <span>{new Date(rec.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-200">{rec.report}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-semibold text-slate-300">Actions:</span>
                        {rec.actions?.map((act, idx) => (
                          <span key={idx} className="badge-cyan text-[10px] py-0 px-2">{act}</span>
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
                className="btn-liquid-primary text-xs py-2 px-6"
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
