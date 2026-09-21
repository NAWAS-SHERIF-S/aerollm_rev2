import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function GlassCard({ icon: Icon, title, description, badge, onClick, className = '' }) {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel glass-panel-interactive p-6 relative overflow-hidden group cursor-pointer bg-white/90 border-slate-200 shadow-xl ${className}`}
    >
      {/* Top right liquid glow indicator */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-all pointer-events-none" />

      {badge && (
        <span className="badge-cyan mb-4 inline-block">{badge}</span>
      )}

      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 mb-4 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-md backdrop-blur-md">
          <Icon className="w-6 h-6" />
        </div>
      )}

      <h3 className="text-lg font-extrabold text-slate-900 mb-2 font-['Outfit'] group-hover:text-sky-700 transition-colors flex items-center justify-between">
        <span>{title}</span>
        {onClick && (
          <div className="w-7 h-7 rounded-full btn-liquid-icon flex items-center justify-center text-slate-600 group-hover:text-sky-700 transition-all">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </h3>

      <p className="text-sm text-slate-700 font-semibold leading-relaxed">{description}</p>
    </div>
  );
}
