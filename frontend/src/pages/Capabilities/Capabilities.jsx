import React from 'react';
import { Wrench, AlertTriangle, CheckSquare, Plane, FileText, ShieldCheck, BookOpen, Code, Cpu, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { CAPABILITIES } from '../../data/mockData';
import GlassCard from '../../components/glass/GlassCard';

const ICON_MAP = {
  Wrench,
  AlertTriangle,
  CheckSquare,
  Plane,
  FileText,
  ShieldCheck,
  BookOpen,
  Code
};

export default function Capabilities({ setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge badge-sparkle">
          <Sparkles className="w-3.5 h-3.5 text-[#6654f5]" />
          AI Core Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          Aviation Domain Intelligence
        </h1>
        <p className="text-slate-600 text-base sm:text-lg font-medium">
          Designed specifically for mechanical logbook parsing, airworthiness evaluation, and structured entity extraction.
        </p>
      </div>

      {/* 8 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map((cap) => {
          const IconComp = ICON_MAP[cap.icon] || Cpu;
          return (
            <GlassCard
              key={cap.id}
              icon={IconComp}
              title={cap.title}
              description={cap.desc}
              badge={cap.tag}
              onClick={() => setActivePage('try')}
            />
          );
        })}
      </div>

      {/* POWERED BY NOVATRIX SECTION */}
      <div className="glass-panel p-8 md:p-12 relative overflow-hidden bg-white/95 border border-indigo-500/20 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#6654f5] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DOMAIN LLM ENGINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
              Powered by <span className="text-gradient-brand">NovaTRix</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed font-medium">
              NovaTRix is a specialized fine-tuned version of <strong>Qwen2.5-7B-Instruct</strong>, trained directly on thousands of NASA ASRS incident reports, FAA Service Difficulty Reports, and Aircraft Maintenance Manual (AMM) technical specs.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold">Base Architecture</p>
                <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">Qwen2.5-7B</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold">Extraction Precision</p>
                <p className="text-sm font-bold text-[#6654f5] font-mono mt-0.5">99.2% ATA Code</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold">Context Window</p>
                <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">128,000 Tokens</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary py-3 px-8 text-sm font-bold shadow-md"
              >
                <span>Test RAG Copilot Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Layers className="w-4 h-4" /> novatrix_weights_v1.bin
              </span>
              <span>7.61B Params</span>
            </div>
            <p className="text-emerald-400">// Sample NovaTRix Inference Pipeline</p>
            <p className="text-slate-300">Input: "VT101 low hydraulic pressure on taxi."</p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-indigo-300 space-y-1">
              <p>{"{"}</p>
              <p className="pl-4">"aircraft": "VT101",</p>
              <p className="pl-4">"system": "HYDRAULIC_A",</p>
              <p className="pl-4">"maintenance_actions": ["REPLACED"],</p>
              <p className="pl-4">"component": "ENGINE_PUMP",</p>
              <p className="pl-4">"airworthiness_impact": "RESOLVED"</p>
              <p>{"}"}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

