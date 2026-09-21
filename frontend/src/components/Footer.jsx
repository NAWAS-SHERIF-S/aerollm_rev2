import React from 'react';
import { Plane, BookOpen, ShieldCheck } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-xl pt-12 pb-8 px-4 lg:px-8 mt-20 relative overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center shadow-sm">
            <Plane className="w-4 h-4 text-sky-600 transform -rotate-45" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base font-['Outfit'] flex items-center gap-2">
              AeroLLM <span className="text-slate-300">|</span> <span className="text-sm font-bold text-slate-700">Knowledge for a Safer Sky</span>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">Powered by NovaTRix Fine-Tuned Qwen2.5-7B Aviation Engine</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-slate-700 font-bold">
          <button onClick={() => setActivePage('about')} className="hover:text-sky-700 transition-colors">
            About AeroLLM
          </button>
          <button onClick={() => setActivePage('dataset')} className="hover:text-sky-700 transition-colors">
            Datasets
          </button>
          <a href="/docs" target="_blank" rel="noreferrer" className="hover:text-sky-700 transition-colors flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>OpenAPI Docs</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-700 transition-colors flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current text-slate-800" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-semibold gap-4">
        <span>© 2026 AeroLLM Aviation AI System. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-700 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            FAA & EASA Compliant Architecture
          </span>
        </div>
      </div>
    </footer>
  );
}
