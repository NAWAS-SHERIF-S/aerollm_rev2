import React, { useState, useEffect } from 'react';
import { Plane, FileText, AlertTriangle, CheckSquare, Activity, RefreshCw, ChevronRight } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <span className="badge-cyan mb-2 inline-block">Real-Time Fleet Intelligence</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Aviation Maintenance Intelligence
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Consolidated overview of aircraft fleet status, AI predictions, and maintenance actions.
          </p>
        </div>

        <button
          onClick={loadDashboardData}
          className="btn-liquid-secondary text-xs py-2 px-4 self-start sm:self-auto flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Fleet Aircraft"
          value={stats?.total_aircraft ?? 5}
          sublabel={`${stats?.active_aircraft ?? 3} Active • ${stats?.aircraft_in_maintenance ?? 1} In Maintenance`}
          icon={Plane}
          trend="LIVE"
        />
        <StatCard
          label="Maintenance Reports"
          value={stats?.total_reports ?? 4}
          sublabel="Analyzed by NovaTRix"
          icon={FileText}
          trend="AI LOGGED"
        />
        <StatCard
          label="Detected Faults"
          value={stats?.total_faults ?? 4}
          sublabel="Aviation Issues Tracked"
          icon={AlertTriangle}
          trend="TRACKED"
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
        <div className="lg:col-span-7 glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-300" />
              <span>Maintenance Actions Distribution</span>
            </h3>
            <span className="text-xs text-slate-300 font-mono">GET /api/dashboard/stats</span>
          </div>

          <div className="space-y-4">
            {Object.entries(stats?.maintenance_actions || { REPLACED: 3, INSPECTED: 2, REPAIRED: 1, TESTED: 1 }).map(([act, count]) => {
              const maxCount = 5;
              const pct = Math.min(100, Math.round((count / maxCount) * 100));
              return (
                <div key={act} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white tracking-wider">{act}</span>
                    <span className="font-mono text-cyan-300 font-bold">{count} Action{count > 1 ? 's' : ''} ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15 backdrop-blur-md">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500 shadow-md"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fleet Status Pie/Card */}
        <div className="lg:col-span-5 glass-panel p-6 space-y-6">
          <h3 className="text-lg font-bold text-white font-['Outfit']">Fleet Airworthiness</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between backdrop-blur-md">
              <div>
                <p className="text-xs text-slate-300">Active Flight Status</p>
                <p className="text-lg font-bold text-emerald-300 font-['Outfit']">{stats?.active_aircraft ?? 3} Aircraft (60%)</p>
              </div>
              <span className="badge-green">AIRWORTHY</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between backdrop-blur-md">
              <div>
                <p className="text-xs text-slate-300">In Maintenance Bay</p>
                <p className="text-lg font-bold text-amber-300 font-['Outfit']">{stats?.aircraft_in_maintenance ?? 1} Aircraft (20%)</p>
              </div>
              <span className="badge-amber">BAY 2</span>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT REPORTS TABLE */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-['Outfit']">Recent Maintenance Reports</h3>
          <button
            onClick={() => setActivePage('history')}
            className="btn-liquid-secondary text-xs py-1.5 px-4"
          >
            <span>View All Reports ({history.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Aircraft ID</th>
                <th>Maintenance Report</th>
                <th>Detected Action</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="badge-cyan font-mono">{item.aircraft || 'N/A'}</span>
                  </td>
                  <td>
                    <p className="line-clamp-1 max-w-md text-slate-200">{item.report}</p>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {item.actions?.map((a, idx) => (
                        <span key={idx} className="badge-green text-[10px] py-0 px-2">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-xs text-slate-300 font-mono">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => setActivePage('history')}
                      className="btn-liquid-chip text-xs py-1 px-3"
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
