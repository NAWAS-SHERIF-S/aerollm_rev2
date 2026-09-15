import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, RefreshCw, X } from 'lucide-react';
import { apiService } from '../../services/api';

export default function MaintenanceHistory({ setActivePage }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAircraftFilter, setSelectedAircraftFilter] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await apiService.getMaintenanceHistory(selectedAircraftFilter);
      setHistory(res.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [selectedAircraftFilter]);

  const filteredHistory = history.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.report && item.report.toLowerCase().includes(q)) ||
      (item.aircraft && item.aircraft.toLowerCase().includes(q)) ||
      (item.actions && item.actions.some(a => a.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <span className="badge-cyan mb-2 inline-block">Historical Logbook Analysis</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Maintenance History
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Searchable repository of past AI predictions, part replacements, and technician notes.
          </p>
        </div>

        <button
          onClick={loadHistory}
          className="btn-liquid-secondary text-xs py-2 px-4 self-start sm:self-auto flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Reload History</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 w-full md:w-96 focus-within:border-cyan-400 transition-all backdrop-blur-md">
          <Search className="w-4 h-4 text-cyan-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search report text, actions, or aircraft..."
            className="bg-transparent border-none outline-none text-white text-sm placeholder-slate-400 w-full font-sans"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Aircraft Filter Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-300" /> Aircraft:
          </span>
          <select
            value={selectedAircraftFilter}
            onChange={(e) => setSelectedAircraftFilter(e.target.value)}
            className="bg-[#0b122c]/80 border border-white/20 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-400 font-sans backdrop-blur-md"
          >
            <option value="">All Fleet (All Tail IDs)</option>
            <option value="VT101">VT101</option>
            <option value="VT102">VT102</option>
            <option value="VT103">VT103</option>
            <option value="VT104">VT104</option>
            <option value="VT105">VT105</option>
          </select>
        </div>

      </div>

      {/* MAINTENANCE HISTORY TABLE */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span>Showing {filteredHistory.length} Maintenance Records</span>
          <span>SQLite Persistent Storage</span>
        </div>

        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Aircraft</th>
                <th>Maintenance Report</th>
                <th>Extracted Actions</th>
                <th>Created Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-300 text-sm">
                    No matching maintenance records found.
                  </td>
                </tr>
              )}
              {filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-xs text-cyan-300 font-bold">#{item.id}</td>
                  <td>
                    <span className="badge-cyan font-mono">{item.aircraft || 'VT101'}</span>
                  </td>
                  <td>
                    <p className="line-clamp-2 max-w-lg text-slate-200 text-sm">{item.report}</p>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {item.actions?.map((a, idx) => (
                        <span key={idx} className="badge-green text-[10px] py-0 px-2">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-xs text-slate-300 font-mono">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedRecord(item)}
                      className="btn-liquid-chip px-3 py-1 text-xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD DETAIL MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-panel p-8 space-y-6 relative border-cyan-400/40">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-6 right-6 btn-liquid-icon w-9 h-9"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="badge-cyan text-xs">Record #{selectedRecord.id}</span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Aircraft {selectedRecord.aircraft || 'VT101'} Maintenance Record
              </h3>
              <p className="text-xs text-slate-300 font-mono">{new Date(selectedRecord.created_at).toUTCString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#070b19]/90 border border-white/15 space-y-2">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Original Technician Report</p>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">{selectedRecord.report}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">NovaTRix Extracted Actions</p>
              <div className="flex flex-wrap gap-2">
                {selectedRecord.actions?.map((act, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-cyan-500/25 text-cyan-300 font-bold text-xs border border-cyan-400/40">
                    ✓ {act}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex justify-end">
              <button onClick={() => setSelectedRecord(null)} className="btn-liquid-secondary text-xs py-2 px-5">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
