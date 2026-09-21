import React from 'react';
import { Database, Cpu, ShieldCheck, LineChart, ArrowRight, Sparkles, Activity } from 'lucide-react';
import GlassCard from '../components/glass/GlassCard';

export default function Home({ setActivePage }) {
  return (
    <div className="space-y-16 pb-12 max-w-7xl mx-auto px-4 lg:px-8">
      
      {/* HERO SECTION - White Light-Glass Theme with Airliner Image */}
      <section className="relative min-h-[82vh] flex items-center justify-center p-8 sm:p-12 overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 shadow-2xl backdrop-blur-xl">
        
        {/* Crisp, Vibrant AeroLLM Airliner Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/aerollm_airliner.jpg" 
            alt="AeroLLM Commercial Jetliner" 
            className="w-full h-full object-cover object-right-top opacity-35 scale-100 transition-transform duration-1000 filter contrast-[1.05] brightness-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>SAFE SKIES • BRIGHTER TOMORROW</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] font-['Outfit']">
              Aviation Knowledge <br />
              Meets <span className="text-sky-600 font-extrabold">AI</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-semibold">
              AeroLLM is a domain-specific large language model built on real aviation data to support safer, smarter, and more informed decisions across the aviation industry.
            </p>

            {/* Liquid Glass CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary text-base py-3.5 px-8 shadow-md"
              >
                <span>Try AeroLLM Workstation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setActivePage('dataset')}
                className="btn-liquid-secondary text-base py-3.5 px-8 shadow-sm"
              >
                <span>Explore the Dataset</span>
              </button>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-sky-700">2.8 GB+</p>
                <p className="text-xs text-slate-600 font-bold mt-0.5">Aviation Data</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-sky-700">4+</p>
                <p className="text-xs text-slate-600 font-bold mt-0.5">Trusted Sources</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">Real-world</p>
                <p className="text-xs text-slate-600 font-bold mt-0.5">Reports & Manuals</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">Safer</p>
                <p className="text-xs text-slate-600 font-bold mt-0.5">Aviation Future</p>
              </div>
            </div>

          </div>

          {/* Right Floating Glass HUD Panels */}
          <div className="lg:col-span-5 relative min-h-[380px] hidden lg:block">
            
            {/* HUD Panel 1 */}
            <div className="p-5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-xl absolute top-2 right-2 w-72 animate-float-slow z-20">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Global Aviation Insights</span>
                <Activity className="w-4 h-4 text-sky-600 animate-pulse" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-extrabold text-slate-900">1.7M+</span>
                  <span className="text-slate-600 text-xs font-semibold">Incident Reports</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-extrabold text-sky-700">47K+</span>
                  <span className="text-slate-600 text-xs font-semibold">ASRS Reports</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="font-extrabold text-slate-900">25+</span>
                  <span className="text-slate-600 text-xs font-semibold">Document Categories</span>
                </div>
              </div>
            </div>

            {/* HUD Label 2 */}
            <div className="px-5 py-3 rounded-2xl bg-white/95 border border-sky-300 shadow-lg absolute top-2/3 right-6 z-20">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">From Data</p>
              <p className="text-sm font-extrabold text-sky-700 font-['Outfit']">to Safer Skies —</p>
            </div>

            {/* HUD Label 3 */}
            <div className="px-5 py-3 rounded-2xl bg-white/95 border border-slate-200 shadow-lg absolute bottom-2 right-32 z-20">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">AI for a</p>
              <p className="text-sm font-extrabold text-slate-900 font-['Outfit']">Safer Tomorrow —</p>
            </div>

          </div>

        </div>
      </section>

      {/* FOUR HUD GLASS CARDS BELOW HERO */}
      <section>
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
            onClick={() => setActivePage('about')}
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
      <section>
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden bg-white/90 border border-sky-200 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="badge-cyan">AeroLLM Engine • NovaTRix RAG</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
              Ready to Analyze Live Maintenance Reports?
            </h2>
            <p className="text-slate-700 text-base font-semibold">
              Submit raw maintenance logs to NovaTRix to extract aircraft tail numbers, ATA action codes, and fault severity tags in real-time.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary text-base py-3.5 px-8 shadow-md"
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
