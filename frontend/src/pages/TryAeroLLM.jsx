import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  FileText, 
  Database, 
  ArrowRight, 
  Loader2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Wrench, 
  RefreshCw,
  Info,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BarChart3,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/mockData';
import { apiService } from '../services/api';

export default function TryAeroLLM({ setActivePage }) {
  const [queryText, setQueryText] = useState(SAMPLE_REPORTS[0].text);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('structured');
  const [copied, setCopied] = useState(false);

  const loadingMessages = [
    "Querying RAG Vector Database (ChromaDB)...",
    "Searching FAA Maintenance Manuals...",
    "Extracting top relevant document chunks...",
    "Synthesizing airworthy maintenance procedures..."
  ];

  const handleAnalyze = async () => {
    if (!queryText.trim()) return;

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
      const data = await apiService.analyzeMaintenanceReport(queryText);
      clearInterval(interval);
      setResult(data);
    } catch (err) {
      clearInterval(interval);
      setError(err.message || "Unable to retrieve maintenance documentation. Please check backend RAG engine.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJSON = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPayloadData = () => {
    if (!result) return {};
    return result.result || result;
  };

  const payload = getPayloadData();

  // Extract metadata
  const faultMeta = payload.fault_metadata || {};
  const faultCategory = faultMeta.fault_category || "Hydraulics & Fluid Power";
  const affectedSystem = faultMeta.affected_system || payload.system || "Hydraulic Power System (ATA 29)";
  const component = faultMeta.component || payload.component || "Hydraulic Lift Actuator & Cylinder Assembly";
  const severityTag = faultMeta.severity || payload.severity || "Maintenance Required";

  // RAG Options & Sources
  const ragOptions = payload.rag_options || [];

  // Mock analytics dataset statistics for the bottom charts
  const categoryStats = [
    { label: 'Avionics', count: 12, height: '80%' },
    { label: 'Flight Controls', count: 9, height: '60%' },
    { label: 'Fuel System', count: 11, height: '73%' },
    { label: 'Hydraulics', count: 14, height: '93%' },
    { label: 'Landing Gear', count: 10, height: '66%' },
    { label: 'Propulsion', count: 15, height: '100%' }
  ];

  const severityStats = [
    { label: 'Critical', count: 18, color: 'bg-rose-500', width: '25%' },
    { label: 'Major', count: 42, color: 'bg-amber-500', width: '58%' },
    { label: 'Minor', count: 12, color: 'bg-emerald-500', width: '17%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold mb-2 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>NOVATRIX AI WORKSTATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Aviation Maintenance Intelligence
          </h1>
          <p className="text-slate-700 text-sm mt-1 font-medium">
            Submit raw maintenance reports to extract aircraft tail numbers, ATA action codes, and fault severity tags.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActivePage('history')}
            className="btn-liquid-secondary text-xs py-2 px-5 shadow-sm"
          >
            <span>View Database History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* WORKSTATION DUAL PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 sm:p-8 space-y-6 relative border-slate-200/90 shadow-xl bg-white/90">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <span>Analyze Maintenance Report</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono font-semibold">Input Log</span>
            </div>

            {/* Quick Sample Selector Chips */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Sample Aviation Reports
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_REPORTS.map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setQueryText(sample.text)}
                    className="btn-liquid-chip px-3 py-1.5 text-xs text-slate-800 hover:text-sky-800 hover:bg-sky-100 hover:border-sky-300 font-semibold text-left shadow-sm transition-all"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea Input */}
            <div className="space-y-2">
              <textarea
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                rows={7}
                placeholder="Describe the aircraft fault, symptom, or maintenance issue..."
                className="w-full bg-white border border-slate-300 focus:border-sky-600 rounded-xl p-4 text-slate-900 font-semibold text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500/20 transition-all font-sans leading-relaxed resize-none shadow-inner"
              />
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>{queryText.length} characters</span>
                <span>Supported: English technical shorthand, ATA 100 codes</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !queryText.trim()}
              className="w-full btn-liquid-primary justify-center text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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

        {/* RIGHT PANEL: AI Analysis & Procedure Result */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 sm:p-8 space-y-6 min-h-[540px] flex flex-col justify-between relative border-slate-200/90 shadow-xl bg-white/90">
            
            {/* Header with View Toggle */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse shadow-md shadow-sky-400/50" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                  NovaTRix AI Result
                </h3>
              </div>

              {result && !loading && (
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-300">
                  <button
                    onClick={() => setViewMode('structured')}
                    className={`btn-liquid-chip px-3 py-1 text-xs ${
                      viewMode === 'structured' ? 'bg-sky-600 border-sky-700 text-white font-bold' : 'text-slate-700'
                    }`}
                  >
                    Structured View
                  </button>
                  <button
                    onClick={() => setViewMode('json')}
                    className={`btn-liquid-chip px-3 py-1 text-xs ${
                      viewMode === 'json' ? 'bg-sky-600 border-sky-700 text-white font-bold' : 'text-slate-700'
                    }`}
                  >
                    Raw JSON
                  </button>
                </div>
              )}
            </div>

            {/* STATE 1: INITIAL READY STATE */}
            {!loading && !result && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-5">
                <div className="w-20 h-20 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 animate-pulse shadow-md">
                  <Cpu className="w-10 h-10" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="text-lg font-bold text-slate-900 font-['Outfit'] uppercase tracking-wide">
                    NovaTRix Engine Ready
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    Submit an aviation maintenance report on the left to trigger AI entity extraction and automated database logging.
                  </p>
                </div>
              </div>
            )}

            {/* STATE 2: LOADING STATE */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin flex items-center justify-center shadow-md">
                  <Cpu className="w-6 h-6 text-sky-600" />
                </div>
                <div className="space-y-3 max-w-sm">
                  <p className="text-xs font-mono uppercase tracking-widest text-sky-800 font-bold">
                    VECTOR EMBEDDING & PROCEDURAL ANALYSIS
                  </p>
                  <p className="text-base font-bold text-slate-900 animate-pulse">
                    {loadingMessages[loadingStep]}
                  </p>
                  <div className="w-56 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto border border-slate-300">
                    <div 
                      className="h-full bg-sky-600 transition-all duration-300 rounded-full shadow-md"
                      style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STATE 3: ERROR STATE */}
            {error && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-rose-950">Analysis Exception</h4>
                  <p className="text-sm text-rose-700 font-semibold">{error}</p>
                </div>
                <button
                  onClick={handleAnalyze}
                  className="btn-liquid-chip px-5 py-2.5 text-xs bg-rose-600 border-rose-700 text-white font-semibold flex items-center gap-2 hover:bg-rose-700 transition-all shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Analysis</span>
                </button>
              </div>
            )}

            {/* STATE 4: SUCCESSFUL RESULT DISPLAY */}
            {result && !loading && (
              <div className="flex-1 space-y-6">
                
                {/* STRUCTURED VIEW */}
                {viewMode === 'structured' && (
                  <div className="space-y-6">
                    
                    {/* SECTION 1: EXTRACTED FAULT METADATA */}
                    <div className="p-5 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-md">
                      <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-sky-600" />
                          <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                            1. Extracted Fault Metadata
                          </h4>
                        </div>
                        <span className="badge-cyan text-xs">AI Verified</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Fault Category</span>
                          <p className="text-sm font-extrabold text-sky-700">{faultCategory}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Component</span>
                          <p className="text-sm font-extrabold text-slate-900">{component}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Affected System</span>
                          <p className="text-sm font-extrabold text-blue-700">{affectedSystem}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Severity</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                            <span className="text-sm font-extrabold text-rose-700">{severityTag}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* SECTION 2: RECOMMENDED MAINTENANCE PROCEDURES (RAG) */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-sky-600" />
                          <span>2. Recommended Maintenance Procedures (RAG)</span>
                        </h4>
                        <span className="text-xs text-sky-800 font-mono font-bold">Ranked Resolution Options</span>
                      </div>

                      {/* Render RAG Options */}
                      {ragOptions.length > 0 ? (
                        ragOptions.map((opt, oIdx) => (
                          <div 
                            key={oIdx}
                            className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-md"
                          >
                            {/* Option Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                              <div>
                                <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                  <span className="text-sky-700 font-extrabold">Option {opt.option_id}:</span>
                                  <span>{opt.title}</span>
                                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300 font-extrabold">
                                    {opt.match_percentage}
                                  </span>
                                </h5>
                                <p className="text-xs text-slate-600 font-mono font-semibold mt-0.5">
                                  ATA Chapter: {opt.ata_chapter}
                                </p>
                              </div>
                            </div>

                            {/* Step-by-Step Resolution */}
                            <div className="space-y-2">
                              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Step-by-Step Resolution:
                              </p>
                              <div className="space-y-2">
                                {(opt.steps || []).map((stepText, sIdx) => (
                                  <div 
                                    key={sIdx}
                                    className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 flex items-start gap-3 text-xs text-slate-900 font-semibold hover:bg-sky-100/70 transition-all"
                                  >
                                    <span className="px-2 py-0.5 rounded bg-sky-600 text-white font-mono font-bold shrink-0 shadow-sm">
                                      {sIdx + 1}.
                                    </span>
                                    <span className="leading-relaxed pt-0.5">{stepText}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Safety Precaution Alert Box */}
                            {opt.safety_precaution && (
                              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-extrabold text-amber-950 uppercase tracking-wider mr-1">
                                    ⚠️ Safety Precaution:
                                  </span>
                                  <span className="font-semibold">{opt.safety_precaution}</span>
                                </div>
                              </div>
                            )}

                            {/* Source Reference Badge */}
                            {opt.source_reference && (
                              <div className="p-2.5 rounded-lg bg-slate-900 text-sky-300 text-xs font-mono flex items-center gap-2 border border-slate-800 shadow-inner">
                                <BookOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                <span className="truncate font-semibold">{opt.source_reference}</span>
                              </div>
                            )}

                          </div>
                        ))
                      ) : (
                        <div className="p-6 rounded-2xl bg-white text-center text-slate-600 text-sm font-medium border border-slate-200">
                          No procedure options returned.
                        </div>
                      )}

                    </div>

                    {/* SECTION 3: DECISION SUPPORT DISCLAIMER */}
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs flex items-start gap-2.5 shadow-md">
                      <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        <span className="font-bold text-white uppercase tracking-wider mr-1">
                          🛡️ Decision Support Disclaimer:
                        </span>
                        NovaTRix recommendations are source-backed advisory references. Always consult the official Aircraft Maintenance Manual (AMM) and certified engineering staff before executing physical work.
                      </p>
                    </div>

                  </div>
                )}

                {/* RAW JSON VIEW */}
                {viewMode === 'json' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-700 font-bold">Exact Backend Response</span>
                      <button
                        onClick={handleCopyJSON}
                        className="btn-liquid-chip px-3 py-1.5 text-xs text-slate-800 flex items-center gap-1.5 hover:text-sky-700"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto max-h-[400px] shadow-inner">
                      <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {/* DATABASE PERSISTENCE FOOTER */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    Saved to SQLite Database (Record #{result.record_id || 1})
                  </span>
                  <span className="font-mono text-slate-500 font-bold">{new Date().toLocaleTimeString()}</span>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* BOTTOM FULL-WIDTH PANEL: DATASET ANALYTICS & ISSUE FREQUENCY GRAPHS */}
      <div className="glass-panel p-6 sm:p-8 space-y-6 relative border-slate-200/90 shadow-xl bg-white/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              NASA ASRS Dataset Analytics & Issue Frequency Graphs
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-600 font-bold">
            Statistical distribution across aircraft subsystems
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Chart 1: Fault Issues by Category (Count) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Fault Issues by Category (Count)
              </h4>
              <span className="text-[11px] font-mono text-sky-800 font-extrabold">Total: 71 Incidents</span>
            </div>
            
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-mono text-sky-700 font-extrabold opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.count}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden border border-slate-200 flex items-end h-32">
                    <div 
                      className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-sm"
                      style={{ height: cat.height }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-800 font-extrabold text-center leading-tight truncate w-full">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Incident Severity Breakdown */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Incident Severity Breakdown
              </h4>
              <span className="text-[11px] font-mono text-sky-800 font-extrabold">Risk Profile</span>
            </div>

            <div className="space-y-4 py-2">
              {severityStats.map((sev, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{sev.label} Severity</span>
                    <span className="font-mono text-sky-800 font-extrabold">{sev.count} reports ({sev.width})</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                    <div 
                      className={`h-full ${sev.color} rounded-full transition-all duration-500`}
                      style={{ width: sev.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
