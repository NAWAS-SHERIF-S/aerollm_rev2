import React from 'react';

export default function StatCard({ label, value, sublabel, icon: Icon, trend }) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden flex items-center gap-4 bg-white/95 border border-indigo-500/15 shadow-xl">
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6654f5] shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
          {trend && (
            <span className="badge-glow-emerald text-[10px] py-0.5 px-2">
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit'] mt-0.5 tracking-tight">
          {value}
        </h3>
        {sublabel && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

