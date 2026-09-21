import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function GlassCard({ icon: Icon, title, description, badge, onClick, className = '' }) {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel glass-panel-interactive p-6 relative overflow-hidden group cursor-pointer bg-white/95 border-indigo-500/15 shadow-xl hover:border-[#6654f5]/40 ${className}`}
    >
      {/* Top right liquid glow indicator */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-[#6654f5]/20 transition-all pointer-events-none" />

      {badge && (
        <span className="badge badge-sparkle mb-4 inline-block font-bold text-[#6654f5]">{badge}</span>
      )}

      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6654f5] mb-4 group-hover:scale-105 group-hover:bg-[#6654f5] group-hover:text-white transition-all shadow-md">
          <Icon className="w-6 h-6" />
        </div>
      )}

      <h3 className="text-lg font-extrabold text-slate-900 mb-2 font-['Outfit'] group-hover:text-[#6654f5] transition-colors flex items-center justify-between">
        <span>{title}</span>
        {onClick && (
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-[#6654f5] transition-all">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </h3>

      <p className="text-sm text-slate-600 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

