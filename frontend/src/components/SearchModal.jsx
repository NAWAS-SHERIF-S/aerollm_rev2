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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0b122c] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#0f172a]/80">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, aircraft ID (e.g. VT101), faults, or maintenance actions..."
            className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder-slate-500 font-sans"
            autoFocus
          />
          {loading && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['VT101', 'Hydraulic', 'Engine oil', 'APU', 'Replaced', 'Landing gear'].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {results.length === 0 && !loading && (
              <div className="text-center py-8 text-slate-500 text-sm">
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
                className="p-3.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all flex items-start gap-3 group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                  {res.type === 'aircraft' && <Plane className="w-4 h-4" />}
                  {res.type === 'maintenance' && <Wrench className="w-4 h-4" />}
                  {res.type === 'fault' && <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{res.type}</span>
                    {res.aircraft && (
                      <span className="badge-cyan text-[10px] py-0 px-2">{res.aircraft}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-200 line-clamp-2">{res.text}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all mt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Search Footer */}
        <div className="px-5 py-2.5 bg-[#070b19] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press ESC to close</span>
          <span>Powered by AeroLLM Backend API</span>
        </div>
      </div>
    </div>
  );
}
