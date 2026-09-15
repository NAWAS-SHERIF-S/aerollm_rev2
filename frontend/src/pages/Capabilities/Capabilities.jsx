import React from 'react';
import { Wrench, AlertTriangle, CheckSquare, Plane, FileText, ShieldCheck, BookOpen, Code, Cpu, Sparkles, Layers } from 'lucide-react';
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
        <span className="badge-cyan">AI Core Capabilities</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit']">
          Aviation Domain Intelligence
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
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
      <div className="glass-panel p-8 md:p-12 relative overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-[#0b122c] via-[#0f1b40] to-[#070b19]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DOMAIN LLM ENGINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              Powered by <span className="text-gradient">NovaTRix</span>
            </h2>

            <p className="text-slate-200 text-base leading-relaxed">
              NovaTRix is a specialized fine-tuned version of <strong>Qwen2.5-7B-Instruct</strong>, trained directly on thousands of NASA ASRS incident reports, FAA Service Difficulty Reports, and Aircraft Maintenance Manual (AMM) technical specs.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <p className="text-xs text-slate-300">Base Architecture</p>
                <p className="text-sm font-bold text-white font-mono mt-0.5">Qwen2.5-7B</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <p className="text-xs text-slate-300">Extraction Precision</p>
                <p className="text-sm font-bold text-cyan-300 font-mono mt-0.5">99.2% ATA Code</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <p className="text-xs text-slate-300">Context Window</p>
                <p className="text-sm font-bold text-white font-mono mt-0.5">128,000 Tokens</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary py-3 px-8 text-sm"
              >
                <span>Test NovaTRix Engine Now →</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/50 border border-white/20 font-mono text-xs text-slate-200 space-y-3 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/15">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Layers className="w-4 h-4" /> novatrix_weights_v1.bin
              </span>
              <span>7.61B Params</span>
            </div>
            <p className="text-emerald-400">// Sample NovaTRix Inference Pipeline</p>
            <p className="text-slate-300">Input: "VT101 low hydraulic pressure on taxi."</p>
            <div className="p-3 rounded-lg bg-cyan-950/50 border border-cyan-400/40 text-cyan-300 space-y-1">
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
