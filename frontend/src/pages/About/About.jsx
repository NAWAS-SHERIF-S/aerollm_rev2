import React from 'react';
import { Cpu, ShieldCheck, Database, Layers, ArrowRight, Server, Globe, UserCheck } from 'lucide-react';

export default function About({ setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge-cyan">Mission & Architecture</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit']">
          About AeroLLM & NovaTRix
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Transforming aviation safety and line maintenance through domain-specific artificial intelligence.
        </p>
      </div>

      {/* THREE EXPLANATION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="glass-panel p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">What is AeroLLM?</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            AeroLLM is an enterprise aviation AI platform built specifically for airlines, MRO facilities, and flight safety analysts to understand unstructured maintenance reports.
          </p>
        </div>

        <div className="glass-panel p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">What is NovaTRix?</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            NovaTRix is the domain-tuned AI engine powering AeroLLM. Built on Qwen2.5-7B-Instruct, it excels at extracting ATA 100 codes, part replacements, and aircraft tail numbers.
          </p>
        </div>

        <div className="glass-panel p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">Why Aviation AI?</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            General LLMs lack knowledge of technical mechanic shorthand and component part numbers. NovaTRix eliminates hallucination risks through domain fine-tuning.
          </p>
        </div>

      </div>

      {/* ARCHITECTURE DIAGRAM SECTION */}
      <div className="glass-panel p-8 md:p-12 space-y-8 bg-gradient-to-b from-[#0b122c] to-[#070b19] border border-cyan-500/30">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">End-to-End Flow</span>
          <h2 className="text-3xl font-extrabold text-white font-['Outfit']">Technology Architecture</h2>
          <p className="text-sm text-slate-400">How data moves from raw aviation sources to the engineer's workstation.</p>
        </div>

        {/* 6 Node Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4 relative">
          
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <Database className="w-6 h-6 text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">1. Aviation Data</h4>
            <p className="text-[11px] text-slate-400">NASA ASRS, FAA SDR, NTSB</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <Layers className="w-6 h-6 text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">2. Dataset ETL</h4>
            <p className="text-[11px] text-slate-400">ATA 100 Normalization</p>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-500/15 border border-cyan-400 text-center space-y-2 shadow-lg shadow-cyan-500/20">
            <Cpu className="w-6 h-6 text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">3. NovaTRix</h4>
            <p className="text-[11px] text-cyan-300">Qwen2.5-7B Model</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <Server className="w-6 h-6 text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">4. FastAPI Backend</h4>
            <p className="text-[11px] text-slate-400">SQLite + SQLAlchemy</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <Globe className="w-6 h-6 text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">5. AeroLLM App</h4>
            <p className="text-[11px] text-slate-400">React + Vite UI</p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
            <UserCheck className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">6. Engineer</h4>
            <p className="text-[11px] text-emerald-300">Airworthy Output</p>
          </div>

        </div>

        <div className="pt-4 text-center">
          <button
            onClick={() => setActivePage('try')}
            className="btn-primary-pill text-sm py-3 px-8"
          >
            <span>Launch AeroLLM Workstation →</span>
          </button>
        </div>

      </div>

    </div>
  );
}
