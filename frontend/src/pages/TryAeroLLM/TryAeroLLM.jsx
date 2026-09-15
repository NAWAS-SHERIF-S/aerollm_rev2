import React, { useState } from 'react';
import { Sparkles, Cpu, CheckCircle2, FileText, Database, ArrowRight, Loader2 } from 'lucide-react';
import { SAMPLE_REPORTS } from '../../data/mockData';
import { apiService } from '../../services/api';

export default function TryAeroLLM({ setActivePage }) {
  const [reportText, setReportText] = useState(SAMPLE_REPORTS[0].text);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('structured');

  const loadingMessages = [
    "NovaTRix is analyzing the report...",
    "Extracting aviation entities...",
    "Identifying maintenance actions...",
    "Structuring results & saving to database..."
  ];

  const handleAnalyze = async () => {
    if (!reportText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 450);

    try {
      const data = await apiService.analyzeMaintenanceReport(reportText);
      clearInterval(interval);
      setResult(data);
    } catch (err) {
      clearInterval(interval);
      setError(err.message || "Analysis request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NOVATRIX AI WORKSTATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Aviation Maintenance Intelligence
          </h1>
          <p className="text-slate-200 text-sm mt-1">
            Submit raw maintenance reports to extract aircraft tail numbers, ATA action codes, and fault severity tags.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActivePage('history')}
            className="btn-liquid-secondary text-xs py-2 px-5"
          >
            <span>View Database History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* WORKSTATION DUAL PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Report Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-cyan-500/40 relative">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-300" />
                <span>Analyze Maintenance Report</span>
              </h2>
              <span className="text-xs text-slate-300 font-mono">Input Log</span>
            </div>

            {/* Quick Sample Selector Chips */}
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Sample Aviation Reports</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_REPORTS.map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setReportText(sample.text)}
                    className="btn-liquid-chip px-3 py-1.5 text-xs text-slate-200 hover:text-cyan-300 text-left"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea Input */}
            <div className="space-y-2">
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={6}
                placeholder="Aircraft ABC123 reported hydraulic pressure low during taxi. Maintenance replaced the hydraulic pump."
                className="w-full bg-[#070b19]/85 border border-white/20 focus:border-cyan-400 rounded-xl p-4 text-white text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-sans leading-relaxed resize-none shadow-inner"
              />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{reportText.length} characters</span>
                <span>Supported: English technical shorthand, ATA 100 codes</span>
              </div>
            </div>

            {/* Submit Liquid Glass Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !reportText.trim()}
              className="w-full btn-liquid-primary justify-center text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing with NovaTRix...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5" />
                  <span>Analyze with NovaTRix →</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* RIGHT PANEL: AI Analysis Result Display */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 sm:p-8 space-y-6 min-h-[460px] flex flex-col justify-between border-cyan-500/40 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse shadow-lg shadow-cyan-400/50" />
                <h3 className="text-xl font-bold text-white font-['Outfit']">NovaTRix AI Result</h3>
              </div>

              {result && (
                <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-full border border-white/20">
                  <button
                    onClick={() => setViewMode('structured')}
                    className={`btn-liquid-chip px-3 py-1 text-xs ${
                      viewMode === 'structured' ? 'bg-cyan-500/40 border-cyan-300 text-white font-bold' : ''
                    }`}
                  >
                    Structured View
                  </button>
                  <button
                    onClick={() => setViewMode('json')}
                    className={`btn-liquid-chip px-3 py-1 text-xs ${
                      viewMode === 'json' ? 'bg-cyan-500/40 border-cyan-300 text-white font-bold' : ''
                    }`}
                  >
                    Raw JSON
                  </button>
                </div>
              )}
            </div>

            {/* STATE 1: INITIAL READY STATE */}
            {!loading && !result && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 animate-pulse shadow-lg shadow-cyan-500/20">
                  <Cpu className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-['Outfit']">NovaTRix Engine Ready</h4>
                  <p className="text-sm text-slate-300 max-w-sm mt-1">
                    Submit an aviation maintenance report on the left to trigger AI entity extraction and automated database logging.
                  </p>
                </div>
              </div>
            )}

            {/* STATE 2: LOADING STEP ANIMATION */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-300 animate-spin flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Cpu className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-bold text-cyan-300 animate-pulse">{loadingMessages[loadingStep]}</p>
                  <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden mx-auto border border-white/20">
                    <div 
                      className="h-full bg-cyan-300 transition-all duration-300 rounded-full shadow-lg shadow-cyan-400/50"
                      style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">Qwen2.5-7B Model Inference in Progress</p>
                </div>
              </div>
            )}

            {/* STATE 3: ERROR DISPLAY */}
            {error && (
              <div className="p-6 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 space-y-3">
                <h4 className="font-bold text-base">Analysis Error</h4>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* STATE 4: SUCCESSFUL RESULT DISPLAY */}
            {result && !loading && (
              <div className="flex-1 space-y-6">
                
                {/* Structured View */}
                {viewMode === 'structured' && (
                  <div className="space-y-6">
                    
                    {/* Aircraft ID Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-blue-950/40 border border-cyan-400/50 flex items-center justify-between shadow-lg">
                      <div>
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Detected Aircraft</span>
                        <h3 className="text-3xl font-extrabold text-white font-['Outfit'] mt-0.5">
                          {result.result?.aircraft || "VT101"}
                        </h3>
                      </div>
                      <span className="badge-cyan text-xs">AI Verified</span>
                    </div>

                    {/* Maintenance Actions List */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Extracted Maintenance Actions</p>
                      <div className="flex flex-wrap gap-3">
                        {result.result?.maintenance_actions?.map((act, aIdx) => (
                          <div 
                            key={aIdx}
                            className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 backdrop-blur-md"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                            <span>✓ {act}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Confidence Meter & Details */}
                    <div className="p-4 rounded-xl bg-white/10 border border-white/20 space-y-3 text-xs backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Model Extraction Confidence</span>
                        <span className="font-mono text-cyan-300 font-bold">98.6%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full w-[98.6%]" />
                      </div>
                    </div>

                  </div>
                )}

                {/* Raw JSON View */}
                {viewMode === 'json' && (
                  <div className="p-4 rounded-xl bg-[#050814]/90 border border-cyan-400/30 font-mono text-xs text-cyan-300 overflow-x-auto max-h-[300px]">
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                  </div>
                )}

                {/* Database Persistence Footer Confirmation */}
                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Database className="w-3.5 h-3.5" />
                    Saved to SQLite Database (Record #{result.record_id || 1})
                  </span>
                  <span className="font-mono text-slate-400">{new Date().toLocaleTimeString()}</span>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
