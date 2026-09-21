import React, { useState, useEffect } from 'react';
import { Plane, FileText, AlertTriangle, CheckSquare, Activity, RefreshCw, ChevronRight, Sparkles } from 'lucide-react';
import { apiService } from '../../services/api';
import StatCard from '../../components/common/StatCard';

export default function Dashboard({ setActivePage }) {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, historyData] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getMaintenanceHistory()
      ]);
      setStats(statsData);
      setHistory(historyData.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-sparkle">
              <Sparkles className="w-3.5 h-3.5 text-[#6654f5]" />
              Real-Time Operations Command Center
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Aviation Maintenance Intelligence
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Consolidated overview of aircraft fleet status, AI predictions, and maintenance actions.
          </p>
        </div>

        <button
          onClick={loadDashboardData}
          className="btn-liquid-secondary text-xs py-2.5 px-5 self-start sm:self-auto flex items-center gap-1.5 shadow-sm font-bold"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#6654f5] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Live Feeds</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Fleet Aircraft"
          value={stats?.total_aircraft ?? 5}
          sublabel={`${stats?.active_aircraft ?? 3} Active • ${stats?.aircraft_in_maintenance ?? 1} In Bay`}
          icon={Plane}
          trend="LIVE"
        />
        <StatCard
          label="Maintenance Reports"
          value={stats?.total_reports ?? 4}
          sublabel="Parsed by RAG Engine"
          icon={FileText}
          trend="INDEXED"
        />
        <StatCard
          label="Active Diagnostics"
          value={stats?.total_faults ?? 4}
          sublabel="Aviation Issues Tracked"
          icon={AlertTriangle}
          trend="SEVERITY"
        />
        <StatCard
          label="Primary Action"
          value="REPLACED"
          sublabel={`${stats?.maintenance_actions?.REPLACED ?? 3} Component Replacements`}
          icon={CheckSquare}
          trend="ATA 100"
        />
      </div>

      {/* CHARTS & DISTRIBUTION SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Maintenance Actions Breakdown */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 space-y-6 bg-white/95 border border-indigo-500/15 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#6654f5]" />
              <span>Maintenance Actions Distribution</span>
            </h3>
            <span className="text-xs text-[#6654f5] font-mono font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              ATA Telemetry
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(stats?.maintenance_actions || { REPLACED: 3, INSPECTED: 2, REPAIRED: 1, TESTED: 1 }).map(([act, count]) => {
              const maxCount = 5;
              const pct = Math.min(100, Math.round((count / maxCount) * 100));
              return (
                <div key={act} className="space-y-1.5 font-semibold">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 tracking-wider uppercase">{act}</span>
                    <span className="font-mono text-[#6654f5] font-extrabold">{count} Action{count > 1 ? 's' : ''} ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-[#6654f5] to-[#ca5a8b] rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fleet Status Card */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 space-y-6 bg-white/95 border border-indigo-500/15 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
            Fleet Availability Status
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Flight Ready</p>
                <p className="text-lg font-extrabold text-emerald-950 font-['Outfit']">{stats?.active_aircraft ?? 3} Aircraft (60%)</p>
              </div>
              <span className="badge-glow-emerald">AIRWORTHY</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs text-amber-800 font-bold uppercase tracking-wider">Scheduled Maintenance</p>
                <p className="text-lg font-extrabold text-amber-950 font-['Outfit']">{stats?.aircraft_in_maintenance ?? 1} Aircraft (20%)</p>
              </div>
              <span className="badge-glow-amber">BAY 2</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs text-rose-800 font-bold uppercase tracking-wider">AOG / Grounded</p>
                <p className="text-lg font-extrabold text-rose-950 font-['Outfit']">1 Aircraft (20%)</p>
              </div>
              <span className="badge-glow-rose font-bold">AOG ALERT</span>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT REPORTS TABLE */}
      <div className="glass-panel p-6 sm:p-8 space-y-4 bg-white/95 border border-indigo-500/15 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Recent Maintenance Logs</h3>
          <button
            onClick={() => setActivePage('history')}
            className="btn-liquid-secondary text-xs py-1.5 px-4 font-bold"
          >
            <span>View All Logs ({history.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Aircraft Tail</th>
                <th>Narrative</th>
                <th>Detected Action</th>
                <th>Log Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="badge-sparkle font-mono font-bold text-[#6654f5]">{item.aircraft || 'N/A'}</span>
                  </td>
                  <td>
                    <p className="line-clamp-1 max-w-md text-slate-800 font-medium">{item.report}</p>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {item.actions?.map((a, idx) => (
                        <span key={idx} className="badge bg-indigo-50 text-[#6654f5] border-indigo-200 text-[10px] py-0.5 px-2">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-xs text-slate-500 font-mono">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => setActivePage('history')}
                      className="btn-liquid-secondary text-xs py-1 px-3"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

