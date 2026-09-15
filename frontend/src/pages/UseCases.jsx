import React from 'react';
import { Wrench, ShieldAlert, Cpu, GraduationCap, FileCheck, LineChart, ArrowRight, Check } from 'lucide-react';
import { USE_CASES } from '../data/mockData';

const ICON_MAP = {
  Wrench,
  ShieldAlert,
  Cpu,
  GraduationCap,
  FileCheck,
  LineChart
};

export default function UseCases({ setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge-cyan">Industry Solutions</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit']">
          Aviation Use Cases
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          From line maintenance ramps to regulatory compliance audits, AeroLLM transforms aviation technical workflows.
        </p>
      </div>

      {/* 6 Use Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {USE_CASES.map((uc, idx) => {
          const IconComp = ICON_MAP[uc.icon] || Wrench;
          return (
            <div key={idx} className="glass-panel p-8 flex flex-col justify-between relative group hover:border-cyan-500/40 transition-all">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">UC-0{idx + 1}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">{uc.title}</h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5">{uc.tagline}</p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{uc.desc}</p>

                {/* Workflow steps */}
                <div className="pt-3 border-t border-white/10">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Example Workflow</p>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    {uc.workflow.map((wf, wIdx) => (
                      <div key={wIdx} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {wIdx + 1}
                        </span>
                        <span>{wf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setActivePage('try')}
                  className="w-full btn-secondary-glass justify-center text-sm py-2.5"
                >
                  <span>Launch Use Case</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
