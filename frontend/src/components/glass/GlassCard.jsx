import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function GlassCard({ icon: Icon, title, description, badge, onClick, className = '' }) {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel glass-panel-interactive p-6 relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Top right liquid glow indicator */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl group-hover:bg-cyan-400/30 transition-all pointer-events-none" />

      {badge && (
        <span className="badge-cyan mb-4 inline-block">{badge}</span>
      )}

      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 group-hover:text-white transition-all shadow-lg shadow-cyan-500/20 backdrop-blur-md">
          <Icon className="w-6 h-6" />
        </div>
      )}

      <h3 className="text-lg font-bold text-white mb-2 font-['Outfit'] group-hover:text-cyan-300 transition-colors flex items-center justify-between">
        <span>{title}</span>
        {onClick && (
          <div className="w-7 h-7 rounded-full btn-liquid-icon flex items-center justify-center text-slate-300 group-hover:text-white transition-all">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </h3>

      <p className="text-sm text-slate-200 leading-relaxed">{description}</p>
    </div>
  );
}
