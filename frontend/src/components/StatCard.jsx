import React from 'react';

export default function StatCard({ label, value, sublabel, icon: Icon, trend }) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden flex items-center gap-4">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
          {trend && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-extrabold text-white font-['Outfit'] mt-0.5 tracking-tight">
          {value}
        </h3>
        {sublabel && (
          <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
