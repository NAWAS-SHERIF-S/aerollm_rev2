import React from 'react';
import { Cpu, ShieldCheck, Database, Layers, ArrowRight, Server, Globe, UserCheck, Sparkles } from 'lucide-react';

export default function About({ setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge badge-sparkle">
          <Sparkles className="w-3.5 h-3.5 text-[#6654f5]" />
          Mission & Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          About AeroLLM & NovaTRix
        </h1>
        <p className="text-slate-600 text-base sm:text-lg font-medium">
          Transforming aviation safety and line maintenance through domain-specific artificial intelligence.
        </p>
      </div>

      {/* THREE EXPLANATION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="glass-panel p-8 space-y-4 bg-white/95 border border-indigo-500/15 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6654f5]">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">What is AeroLLM?</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            AeroLLM is an enterprise aviation AI platform built specifically for airlines, MRO facilities, and flight safety analysts to understand unstructured maintenance reports.
          </p>
        </div>

        <div className="glass-panel p-8 space-y-4 bg-white/95 border border-indigo-500/15 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6654f5]">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">What is NovaTRix?</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            NovaTRix is the domain-tuned AI engine powering AeroLLM. Built on Qwen2.5-7B-Instruct, it excels at extracting ATA 100 codes, part replacements, and aircraft tail numbers.
          </p>
        </div>

        <div className="glass-panel p-8 space-y-4 bg-white/95 border border-indigo-500/15 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6654f5]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Why Aviation AI?</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            General LLMs lack knowledge of technical mechanic shorthand and component part numbers. NovaTRix eliminates hallucination risks through domain fine-tuning.
          </p>
        </div>

      </div>

      {/* ARCHITECTURE DIAGRAM SECTION */}
      <div className="glass-panel p-8 md:p-12 space-y-8 bg-white/95 border border-indigo-500/20 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#6654f5] uppercase tracking-widest">End-to-End Flow</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-['Outfit']">Technology Architecture</h2>
          <p className="text-sm text-slate-600 font-medium">How data moves from raw aviation sources to the engineer's workstation.</p>
        </div>

        {/* 6 Node Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4 relative">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Database className="w-6 h-6 text-[#6654f5] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">1. Aviation Data</h4>
            <p className="text-[11px] text-slate-500 font-medium">NASA ASRS, FAA SDR, NTSB</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Layers className="w-6 h-6 text-[#6654f5] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">2. Dataset ETL</h4>
            <p className="text-[11px] text-slate-500 font-medium">ATA 100 Normalization</p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#6654f5] to-[#ca5a8b] text-white text-center space-y-2 shadow-lg">
            <Cpu className="w-6 h-6 text-white mx-auto" />
            <h4 className="text-xs font-bold text-white">3. NovaTRix</h4>
            <p className="text-[11px] text-indigo-100 font-mono font-semibold">Qwen2.5-7B Model</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Server className="w-6 h-6 text-[#6654f5] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">4. FastAPI Backend</h4>
            <p className="text-[11px] text-slate-500 font-medium">SQLite + ChromaDB</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Globe className="w-6 h-6 text-[#6654f5] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">5. AeroLLM App</h4>
            <p className="text-[11px] text-slate-500 font-medium">React + Vite UI</p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <UserCheck className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="text-xs font-bold text-emerald-950">6. Engineer</h4>
            <p className="text-[11px] text-emerald-700 font-bold">Airworthy Output</p>
          </div>

        </div>

        <div className="pt-4 text-center">
          <button
            onClick={() => setActivePage('try')}
            className="btn-liquid-primary text-sm py-3 px-8 font-bold shadow-md"
          >
            <span>Launch RAG Copilot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

