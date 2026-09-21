import React, { useRef, useEffect, useState } from 'react';
import { Database, Cpu, ShieldCheck, LineChart, ArrowRight, Sparkles, Activity, Compass, Layers, Zap, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/glass/GlassCard';

export default function Home({ setActivePage }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn('Video auto-play prevented', err);
      });
    }
  }, []);

  return (
    <div className="space-y-16 pb-12 max-w-7xl mx-auto px-4 lg:px-8">
      
      {/* HERO SECTION - LearnPath Video & Ambient Light Beams */}
      <section className="relative min-h-[82vh] flex items-center justify-center p-6 sm:p-12 overflow-hidden rounded-3xl border border-indigo-500/20 bg-slate-950 shadow-2xl">
        
        {/* Background Poster Image */}
        <img 
          src="/images/hero-light-beams.png" 
          alt="AeroLLM Light Beams Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        />

        {/* Background Animated Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-light-beams.png"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
        >
          <source src="/videos/hero-light-beams.mp4" type="video/mp4" />
        </video>

        {/* Dark & Brand Tint Overlays for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#6654f5]/30 via-[#ca5a8b]/20 to-[#f2b347]/10 mix-blend-overlay z-10" />

        {/* Floating Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#6654f5]/40 rounded-full blur-[90px] animate-pulse pointer-events-none z-10" />
        <div className="absolute bottom-10 right-12 w-72 h-72 bg-[#ca5a8b]/30 rounded-full blur-[100px] animate-pulse pointer-events-none z-10" />

        <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Sparkle Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs font-bold tracking-wide backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#f2b347]" />
              <span>AI-POWERED AVIATION MAINTENANCE & SAFETY</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] font-['Outfit'] tracking-tight">
              Aviation Intelligence <br />
              with <span className="text-gradient-brand">Real-Time RAG AI</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-normal">
              AeroLLM combines domain-specific LLMs with real-world FAA SDR, NASA ASRS, and NTSB maintenance safety indexes for instant diagnostic insights.
            </p>

            {/* Liquid Glass CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary text-base py-3.5 px-8 shadow-xl shadow-indigo-500/30 font-bold"
              >
                <span>Launch RAG Copilot</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setActivePage('dashboard')}
                className="btn-secondary-glass text-base py-3.5 px-8 shadow-md font-bold text-white bg-white/10 hover:bg-white/20 border-white/30"
                style={{ color: '#ffffff' }}
              >
                <Compass className="w-5 h-5 text-white" />
                <span className="text-white">Fleet Operations</span>
              </button>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
                <p className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-white">2.8 GB+</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">Indexed Knowledge</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
                <p className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-[#ca5a8b]">47K+</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">ASRS Records</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
                <p className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">Sub-Second</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">RAG Query Speed</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
                <p className="text-xl sm:text-2xl font-extrabold text-[#f2b347] font-['Outfit']">FAA Compliant</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">Aviation Taxonomy</p>
              </div>
            </div>

          </div>

          {/* Right Floating Glass HUD Panels */}
          <div className="lg:col-span-5 relative min-h-[420px] hidden lg:block">
            
            {/* HUD Panel 1 */}
            <div className="p-5 rounded-2xl bg-white/95 border border-indigo-500/20 shadow-2xl absolute top-2 right-2 w-80 backdrop-blur-xl z-20">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-[#6654f5] uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#6654f5] animate-pulse" />
                  Live Fleet Telemetry
                </span>
                <span className="badge badge-glow-emerald">Active</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900">Total Aircraft In Service</span>
                  <span className="font-extrabold text-slate-900">12 Fleet Jets</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-700">Active Diagnostic Alerts</span>
                  <span className="font-extrabold text-[#ca5a8b]">3 Critical Faults</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="font-bold text-slate-700">FAA Document Search</span>
                  <span className="font-extrabold text-indigo-600">Vector Index Ready</span>
                </div>
              </div>
            </div>

            {/* Floating Image panel */}
            <div className="p-2 rounded-2xl bg-white/80 border border-white/40 shadow-xl absolute top-1/2 right-12 w-64 z-20 backdrop-blur-xl transform translate-y-4 hover:scale-105 transition-transform">
              <img 
                src="/images/floating-panels.png" 
                alt="AI Workflow Nodes" 
                className="w-full h-32 object-cover rounded-xl"
              />
              <div className="p-2.5">
                <p className="text-xs font-bold text-slate-900 font-['Outfit']">Semantic Search Vector Database</p>
                <p className="text-[11px] text-slate-500">Real-time retrieval from manuals & AC logs.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURE CARDS GRID */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge badge-sparkle">Built for Aviation Maintenance Engineers</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Core Aviation AI Capabilities
          </h2>
          <p className="text-slate-600 font-medium">
            Everything you need to triage fault codes, analyze history logs, and query technical manuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard
            icon={Database}
            title="Diverse & Indexed Datasets"
            description="NASA ASRS, FAA SDR, NTSB incident archives, and Aircraft Maintenance Manuals (AMM)."
            onClick={() => setActivePage('dataset')}
          />

          <GlassCard
            icon={Cpu}
            title="RAG Diagnostic Engine"
            description="Vector search coupled with domain-tailored LLM context grounding."
            onClick={() => setActivePage('try')}
          />

          <GlassCard
            icon={ShieldCheck}
            title="Fault & Telemetry Radar"
            description="Automatic severity classification (Critical, High, Medium) with recommended ATA resolutions."
            onClick={() => setActivePage('faults')}
          />

          <GlassCard
            icon={LineChart}
            title="Fleet Maintenance Logs"
            description="Log maintenance events, track component wear, and export historical audit trails."
            onClick={() => setActivePage('history')}
          />
        </div>
      </section>

      {/* INTERACTIVE WORKSPACE BANNER */}
      <section>
        <div className="bottom-cta-banner text-center text-white relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="bottom-cta-content max-w-3xl mx-auto space-y-4">
            <span className="badge badge-sparkle bg-white/10 text-white border-white/20">
              <Zap className="w-3.5 h-3.5 text-[#f2b347]" />
              NovaTRix Engine Active
            </span>
            <h2 className="bottom-cta-title text-3xl sm:text-4xl font-extrabold font-['Outfit']">
              Ready to Troubleshoot with Aviation AI?
            </h2>
            <p className="bottom-cta-desc text-slate-200">
              Ask questions directly against indexed Aircraft Manuals or input raw maintenance logs to get instant AI diagnostic summaries.
            </p>
            <div className="pt-2 flex justify-center gap-4 flex-wrap">
              <button 
                onClick={() => setActivePage('try')}
                className="btn-liquid-primary text-base py-3.5 px-8 shadow-xl font-bold"
              >
                <span>Launch AeroLLM Workstation</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

