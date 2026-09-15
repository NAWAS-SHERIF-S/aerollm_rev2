import React from 'react';
import { Database, Cpu, ShieldCheck, LineChart, ArrowRight, Sparkles, Activity } from 'lucide-react';
import GlassCard from '../../components/glass/GlassCard';

export default function Home({ setActivePage }) {
  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION Inspired Strongly by Reference Image */}
      <section className="relative min-h-[88vh] flex items-center justify-center pt-6 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b1433]/80 via-[#070b19]/90 to-[#070b19]">
        
        {/* Crisp, Vibrant AeroLLM Airliner Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/aerollm_airliner.jpg" 
            alt="AeroLLM Commercial Jetliner" 
            className="w-full h-full object-cover object-right-top opacity-90 scale-100 transition-transform duration-1000 filter contrast-[1.1] brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19] via-[#070b19]/70 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-transparent to-[#070b19]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>SAFE SKIES • BRIGHTER TOMORROW</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] font-['Outfit']">
              Aviation Knowledge <br />
              Meets <span className="text-gradient drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">AI</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed backdrop-blur-sm">
              AeroLLM is a domain-specific large language model built on real aviation data to support safer, smarter, and more informed decisions across the aviation industry.
            </p>

            {/* Liquid Glass CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setActivePage('dataset')}
                className="btn-liquid-primary text-base py-3.5 px-8"
              >
                <span>Explore the Dataset</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setActivePage('try')}
                className="btn-liquid-secondary text-base py-3.5 px-8"
              >
                <span>Chat with AeroLLM</span>
              </button>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 backdrop-blur-sm">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-['Outfit'] text-cyan-400">2.8 GB+</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">Aviation Data</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-['Outfit'] text-cyan-400">4+</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">Trusted Sources</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">Real-world</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">Reports & Manuals</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">Safer</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">Aviation Future</p>
              </div>
            </div>

          </div>

          {/* Right Floating Glass HUD Panels */}
          <div className="lg:col-span-5 relative min-h-[400px] hidden lg:block">
            
            {/* HUD Panel 1 */}
            <div className="glass-hud-card p-5 absolute top-2 right-2 w-72 animate-float-slow z-20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Global Aviation Insights</span>
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="font-bold text-white">1.7M+</span>
                  <span className="text-slate-300 text-xs">Incident Reports</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="font-bold text-cyan-400">47K+</span>
                  <span className="text-slate-300 text-xs">ASRS Reports</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-white">25+</span>
                  <span className="text-slate-300 text-xs">Document Categories</span>
                </div>
              </div>
            </div>

            {/* HUD Label 2 */}
            <div className="glass-hud-card px-4 py-2.5 absolute top-2/3 right-6 backdrop-blur-2xl border border-cyan-400/40 z-20">
              <p className="text-xs font-semibold text-slate-200">From Data</p>
              <p className="text-sm font-bold text-cyan-300 font-['Outfit']">to Safer Skies —</p>
            </div>

            {/* HUD Label 3 */}
            <div className="glass-hud-card px-4 py-2.5 absolute bottom-2 right-32 backdrop-blur-2xl border border-white/30 z-20">
              <p className="text-xs font-medium text-slate-200">AI for a</p>
              <p className="text-sm font-bold text-white font-['Outfit']">Safer Tomorrow —</p>
            </div>

          </div>

        </div>
      </section>

      {/* FOUR HUD GLASS CARDS BELOW HERO */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <GlassCard
            icon={Database}
            title="Diverse & Trusted Data"
            description="NASA ASRS, FAA SDR, NTSB, Advisory Circulars and more."
            onClick={() => setActivePage('dataset')}
          />

          <GlassCard
            icon={Cpu}
            title="Domain-Specific AI"
            description="Trained on real aviation knowledge and safety data."
            onClick={() => setActivePage('capabilities')}
          />

          <GlassCard
            icon={ShieldCheck}
            title="Practical Use Cases"
            description="Maintenance, safety analysis, training, and regulatory support."
            onClick={() => setActivePage('use-cases')}
          />

          <GlassCard
            icon={LineChart}
            title="Open for Research"
            description="Empowering innovators to build a safer aviation ecosystem."
            onClick={() => setActivePage('about')}
          />

        </div>
      </section>

      {/* INTERACTIVE WORKSPACE TEASER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden bg-gradient-to-r from-blue-950/50 via-[#0b122c] to-cyan-950/40 border border-cyan-500/30">
          <div className="max-w-3xl space-y-4">
            <span className="badge-cyan">AeroLLM Engine • NovaTRix</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              Ready to Analyze Live Maintenance Reports?
            </h2>
            <p className="text-slate-200 text-base">
              Submit raw maintenance logs to NovaTRix to extract aircraft tail numbers, ATA action codes, and fault severity tags in real-time.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary text-base py-3.5 px-8"
              >
                <span>Launch AeroLLM Workstation →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
