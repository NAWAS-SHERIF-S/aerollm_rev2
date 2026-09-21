import React from 'react';
import { Plane, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-xl pt-12 pb-8 px-4 lg:px-8 mt-20 relative overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6654f5] via-[#ca5a8b] to-[#f2b347] p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#6654f5] transform -rotate-45" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base font-['Outfit'] flex items-center gap-2">
              Aero<span className="text-gradient">LLM</span> <span className="text-slate-300">|</span> <span className="text-sm font-semibold text-slate-600">Knowledge for a Safer Sky</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Powered by NovaTRix Fine-Tuned Aviation RAG Engine</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-semibold">
          <button onClick={() => setActivePage('about')} className="hover:text-[#6654f5] transition-colors">
            About AeroLLM
          </button>
          <button onClick={() => setActivePage('dataset')} className="hover:text-[#6654f5] transition-colors">
            Datasets
          </button>
          <button onClick={() => setActivePage('capabilities')} className="hover:text-[#6654f5] transition-colors">
            Capabilities
          </button>
          <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-[#6654f5] transition-colors flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#6654f5]" />
            <span>FastAPI Docs</span>
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
        <span>© 2026 AeroLLM Aviation AI System. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            FAA & EASA Standard Knowledge Indexing
          </span>
        </div>
      </div>
    </footer>
  );
}

