import React, { useState, useEffect } from 'react';
import { Search, X, Plane, Wrench, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await apiService.search(query);
        setResults(res.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl glass-panel bg-white/95 border-slate-300 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-white">
          <Search className="w-5 h-5 text-sky-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, aircraft ID (e.g. VT101), faults, or maintenance actions..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 font-bold text-base placeholder-slate-400 font-sans"
            autoFocus
          />
          {loading && <Loader2 className="w-5 h-5 text-sky-600 animate-spin" />}
          <button
            onClick={onClose}
            className="btn-liquid-icon w-8 h-8 text-slate-600 hover:text-sky-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-5 bg-slate-50/50">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['VT101', 'Hydraulic', 'Engine oil', 'APU', 'Replaced', 'Landing gear'].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="btn-liquid-chip px-3 py-1.5 text-xs text-slate-800 hover:text-sky-800 hover:bg-sky-100 font-semibold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2 bg-white">
            {results.length === 0 && !loading && (
              <div className="text-center py-8 text-slate-600 font-semibold text-sm">
                No matching aviation records found for "{query}".
              </div>
            )}
            {results.map((res, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (onSelectResult) onSelectResult(res);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all flex items-start gap-3 group"
              >
                <div className="p-2 rounded-lg bg-sky-100 text-sky-700 mt-0.5">
                  {res.type === 'aircraft' && <Plane className="w-4 h-4" />}
                  {res.type === 'maintenance' && <Wrench className="w-4 h-4" />}
                  {res.type === 'fault' && <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wider">{res.type}</span>
                    {res.aircraft && (
                      <span className="badge-cyan text-[10px] py-0 px-2 font-bold">{res.aircraft}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-900 font-semibold line-clamp-2">{res.text}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition-all mt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Search Footer */}
        <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-mono font-semibold">
          <span>Press ESC to close</span>
          <span>Powered by AeroLLM Backend API</span>
        </div>
      </div>
    </div>
  );
}
