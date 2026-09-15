import React, { useState } from 'react';
import { Database, FileText, ShieldAlert, Cpu, Filter, Sliders, Layers, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DATASETS, PIPELINE_STEPS } from '../data/mockData';
import StatCard from '../components/StatCard';

export default function Dataset({ setActivePage }) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge-cyan">Corpus & Data Engineering</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit']">
          Built on Real Aviation Data
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          AeroLLM is powered by over 2.8 GB of curated, anonymized, and structured flight safety reports, maintenance logs, and regulatory directives.
        </p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Aviation Reports" value="1.7M+" icon={FileText} trend="VERIFIED" />
        <StatCard label="ASRS Reports" value="47K+" icon={ShieldAlert} trend="NASA" />
        <StatCard label="Aviation Manuals" value="25+" icon={Database} sublabel="Document Types" />
        <StatCard label="Data Volume" value="2.8 GB" icon={Layers} trend="CURATED" />
        <StatCard label="Trusted Sources" value="4+" icon={Cpu} sublabel="FAA • NASA • NTSB" />
      </div>

      {/* Dataset Source Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white font-['Outfit']">Core Data Sources</h2>
          <span className="text-xs text-slate-400">Standardized to ATA Spec 100</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DATASETS.map((ds) => (
            <div key={ds.id} className="glass-panel p-6 space-y-4 relative group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="badge-cyan text-[10px] mb-2 inline-block">{ds.badge}</span>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">{ds.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{ds.fullName}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-white font-['Outfit']">{ds.count}</p>
                  <p className="text-xs text-slate-400">{ds.volume}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{ds.description}</p>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-slate-400">
                <span className="font-mono text-cyan-300/80">Format: {ds.type}</span>
                <button 
                  onClick={() => setActivePage('try')}
                  className="text-cyan-400 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Query in AeroLLM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VISUAL DATA PIPELINE */}
      <div className="glass-panel p-8 md:p-12 space-y-8 bg-gradient-to-b from-[#0b122c] to-[#070b19] border border-cyan-500/20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">End-to-End Processing</span>
          <h2 className="text-3xl font-extrabold text-white font-['Outfit']">Visual Data Pipeline</h2>
          <p className="text-sm text-slate-400">How raw maintenance text is transformed into the NovaTRix fine-tuning dataset.</p>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          {PIPELINE_STEPS.map((step) => {
            const isActive = activeStep === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isActive 
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-300'
                  }`}>
                    {step.step}
                  </span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </div>
                <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">{step.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        {PIPELINE_STEPS.find(s => s.step === activeStep) && (
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                #{activeStep}
              </div>
              <div>
                <h4 className="text-white font-bold">{PIPELINE_STEPS[activeStep - 1].title}</h4>
                <p className="text-slate-300 text-xs mt-0.5">{PIPELINE_STEPS[activeStep - 1].desc}</p>
              </div>
            </div>
            <span className="badge-cyan hidden sm:inline-block">Automated ETL</span>
          </div>
        )}
      </div>

    </div>
  );
}
