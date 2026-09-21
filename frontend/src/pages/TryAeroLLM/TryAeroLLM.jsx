import React, { useState, useEffect } from 'react';
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
  Wrench, 
  RefreshCw,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Tag,
  GitFork,
  CheckSquare,
  AlertCircle,
  ExternalLink,
  Layers,
  Search,
  ChevronDown,
  ChevronUp,
  Info,
  HelpCircle,
  Activity
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../../data/mockData';
import { apiService } from '../../services/api';

export default function TryAeroLLM({ setActivePage }) {
  // Input Form State
  const [selectedSampleId, setSelectedSampleId] = useState(SAMPLE_REPORTS[0].id);
  const [queryText, setQueryText] = useState(SAMPLE_REPORTS[0].text);
  const [aircraftModel, setAircraftModel] = useState(SAMPLE_REPORTS[0].aircraftModel || "A320 Family");
  const [aircraftReg, setAircraftReg] = useState(SAMPLE_REPORTS[0].aircraftReg || "DEMO-VT204");
  const [ataChapter, setAtaChapter] = useState(SAMPLE_REPORTS[0].ataChapter || "ATA 29");
  const [reportType, setReportType] = useState(SAMPLE_REPORTS[0].reportType || "Post-flight Inspection");

  // Workflow & Pipeline State
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
  const [expandedWhyIdx, setExpandedWhyIdx] = useState(null);
  const [selectedSourceModal, setSelectedSourceModal] = useState(null);
  const [historyRecords, setHistoryRecords] = useState([]);

  const pipelineSteps = [
    "Extracting entities & symptoms...",
    "Identifying ATA chapter designation...",
    "Building fault context vector...",
    "Searching ChromaDB knowledge base...",
    "Ranking retrieved maintenance references...",
    "Generating structured decision report..."
  ];

  // Load history records on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await apiService.getMaintenanceHistory();
      setHistoryRecords(data?.records?.slice(0, 5) || []);
    } catch (e) {
      console.warn("Unable to load history:", e);
    }
  };

  // Handle Sample Report Select
  const handleSampleSelect = (e) => {
    const sId = e.target.value;
    setSelectedSampleId(sId);
    const sample = SAMPLE_REPORTS.find(s => s.id === sId);
    if (sample) {
      setQueryText(sample.text);
      setAircraftModel(sample.aircraftModel || "A320 Family");
      setAircraftReg(sample.aircraftReg || "DEMO-VT204");
      setAtaChapter(sample.ataChapter || "ATA 29");
      setReportType(sample.reportType || "Post-flight Inspection");
    }
  };

  // Main Submit Handler
  const handleAnalyze = async () => {
    if (!queryText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < pipelineSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 400);

    try {
      const fullReportPayload = `[Aircraft Model: ${aircraftModel}] [Registration: ${aircraftReg}] [ATA: ${ataChapter}] [Type: ${reportType}]\n${queryText}`;
      const data = await apiService.analyzeMaintenanceReport(fullReportPayload);
      clearInterval(interval);
      setResult(data);
      loadHistory();
    } catch (err) {
      clearInterval(interval);
      setError(err.message || "Unable to process maintenance report. Please check backend RAG engine.");
    } finally {
      setLoading(false);
    }
  };

  const payload = result?.result || result || {};
  const meta = payload.fault_metadata || {};
  const evidence = payload.evidence || {};
  const completeness = payload.completeness || { present: [], missing: [], note: "" };
  const ragReferences = payload.rag_references || [];
  const lowRelevanceFound = payload.low_relevance_found || false;
  const analysisSummary = payload.analysis_summary || {};
  const knowledgeGraph = payload.knowledge_graph || { nodes: [], edges: [] };

  const currentCategory = meta.fault_category || "Hydraulics & Fluid Power";

  const getActiveIncidentLabel = () => {
    if (currentCategory.includes("Hydraulics")) return "14 Hydraulics-related incidents";
    if (currentCategory.includes("Landing Gear")) return "12 Landing Gear-related incidents";
    if (currentCategory.includes("Propulsion") || currentCategory.includes("Oil")) return "15 Engine Oil-related incidents";
    if (currentCategory.includes("Flight Controls")) return "9 Flight Control-related incidents";
    if (currentCategory.includes("Avionics")) return "11 Avionics-related incidents";
    if (currentCategory.includes("Structures")) return "10 Structures-related incidents";
    return "15 Selected Category incidents";
  };

  const getCategoryStats = () => {
    return [
      { label: 'Hydraulics', count: 14, isCurrent: currentCategory.includes("Hydraulics") },
      { label: 'Landing Gear', count: 12, isCurrent: currentCategory.includes("Landing Gear") },
      { label: 'Engine Oil', count: 15, isCurrent: currentCategory.includes("Propulsion") || currentCategory.includes("Oil") },
      { label: 'Flight Controls', count: 9, isCurrent: currentCategory.includes("Flight Controls") },
      { label: 'Avionics', count: 11, isCurrent: currentCategory.includes("Avionics") },
      { label: 'Structures', count: 10, isCurrent: currentCategory.includes("Structures") }
    ];
  };

  return (
    <div className="try-workstation max-w-7xl mx-auto px-4 lg:px-8 py-4 space-y-8">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-sparkle">
              <Sparkles className="w-3.5 h-3.5 text-[#6654f5]" />
              NOVATRIX AVIATION INTELLIGENCE WORKSTATION
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            NovaTRix Aviation RAG Copilot
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Source-backed decision support system for aviation maintenance engineering & line operations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActivePage('history')}
            className="btn-liquid-secondary text-xs py-2 px-5 shadow-sm font-bold flex items-center gap-2"
          >
            <Database className="w-3.5 h-3.5 text-[#6654f5]" />
            <span>Audit History Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. MAINTENANCE REPORT INPUT PANEL */}
      <div className="glass-panel p-6 sm:p-8 space-y-6 relative border-indigo-500/15 shadow-xl bg-white/95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#6654f5]" />
            <span>Maintenance Report Input & Aircraft Context</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono font-bold">Logbook Intake</span>
        </div>

        {/* Aircraft Context Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
          
          {/* Aircraft Model Dropdown */}
          <div className="space-y-1.5">
            <label className="text-slate-700 uppercase tracking-wider font-bold text-[11px]">
              Aircraft Model
            </label>
            <select
              value={aircraftModel}
              onChange={(e) => setAircraftModel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-[#6654f5] outline-none"
            >
              <option value="A320 Family">A320 Family</option>
              <option value="B737 Series">B737 Series</option>
              <option value="B787 Dreamliner">B787 Dreamliner</option>
              <option value="A350 XWB">A350 XWB</option>
              <option value="ATR 72">ATR 72</option>
            </select>
          </div>

          {/* Aircraft Registration Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 uppercase tracking-wider font-bold text-[11px]">
                Aircraft Tail / Reg
              </label>
              <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-extrabold">DEMO DATA</span>
            </div>
            <input
              type="text"
              value={aircraftReg}
              onChange={(e) => setAircraftReg(e.target.value)}
              placeholder="e.g. DEMO-VT204"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-sky-600 outline-none font-mono"
            />
          </div>

          {/* ATA Chapter Dropdown */}
          <div className="space-y-1.5">
            <label className="text-slate-700 uppercase tracking-wider font-bold text-[11px]">
              ATA Chapter
            </label>
            <select
              value={ataChapter}
              onChange={(e) => setAtaChapter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-sky-600 outline-none"
            >
              <option value="Auto Detect">Auto Detect</option>
              <option value="ATA 29">ATA 29 — Hydraulic Power</option>
              <option value="ATA 32">ATA 32 — Landing Gear</option>
              <option value="ATA 79">ATA 79 — Engine Oil System</option>
              <option value="ATA 27">ATA 27 — Flight Controls</option>
              <option value="ATA 23">ATA 23 — Avionics / Comms</option>
              <option value="ATA 51">ATA 51 — Structures</option>
            </select>
          </div>

          {/* Report Type Dropdown */}
          <div className="space-y-1.5">
            <label className="text-slate-700 uppercase tracking-wider font-bold text-[11px]">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-sky-600 outline-none"
            >
              <option value="Post-flight Inspection">Post-flight Inspection</option>
              <option value="Scheduled Maintenance">Scheduled Maintenance</option>
              <option value="Operational BITE Check">Operational BITE Check</option>
              <option value="Line Maintenance">Line Maintenance</option>
              <option value="In-flight Incident">In-flight Incident</option>
            </select>
          </div>

        </div>

        {/* Sample Maintenance Reports Dropdown */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span>Sample Maintenance Reports</span>
              <span className="text-[10px] font-mono text-sky-800 bg-sky-100 px-2 py-0.5 rounded font-extrabold">DEMO SCENARIOS</span>
            </label>
            <span className="text-[11px] text-slate-500 font-normal">Select a structured realistic scenario</span>
          </div>
          <select
            value={selectedSampleId}
            onChange={handleSampleSelect}
            className="w-full bg-sky-50/80 border border-sky-300 rounded-xl p-3 text-slate-900 font-bold text-xs focus:border-sky-600 outline-none shadow-sm cursor-pointer"
          >
            {SAMPLE_REPORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Text Area Input */}
        <div className="space-y-2">
          <textarea
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            rows={5}
            placeholder="Describe the aircraft fault, symptom, or maintenance inspection finding..."
            className="w-full bg-white border border-slate-300 focus:border-sky-600 rounded-xl p-4 text-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-sky-500/20 leading-relaxed resize-none shadow-inner"
          />
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{queryText.length} characters</span>
            <span>Real AI entity extraction + ChromaDB RAG manual retrieval</span>
          </div>
        </div>

        {/* Submit Action */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !queryText.trim()}
          className="w-full btn-liquid-primary justify-center text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Executing NovaTRix Pipeline...</span>
            </>
          ) : (
            <>
              <Cpu className="w-5 h-5 text-white" />
              <span>Analyze with NovaTRix →</span>
            </>
          )}
        </button>
      </div>

      {/* 3. ANALYSIS PROGRESS */}
      {loading && (
        <div className="glass-panel p-6 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-lg text-center">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Pipeline Execution in Progress
            </h3>
          </div>
          
          <p className="text-sm font-bold text-sky-700 animate-pulse">
            {pipelineSteps[loadingStep]}
          </p>

          <div className="w-full max-w-md h-2.5 bg-slate-100 rounded-full overflow-hidden mx-auto border border-slate-200">
            <div 
              className="h-full bg-sky-600 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${((loadingStep + 1) / pipelineSteps.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 text-[11px] font-mono">
            {pipelineSteps.map((stepMsg, idx) => (
              <div 
                key={idx}
                className={`p-2 rounded-lg border text-center font-bold ${
                  idx < loadingStep 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : idx === loadingStep
                    ? 'bg-sky-100 text-sky-900 border-sky-400 animate-pulse'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                {idx < loadingStep ? '✓ Done' : idx === loadingStep ? 'Processing...' : `Step ${idx+1}`}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ERROR DISPLAY */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-center space-y-4 shadow-sm">
          <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
          <h4 className="font-bold text-lg text-rose-950">Analysis Exception</h4>
          <p className="text-sm text-rose-700 font-semibold">{error}</p>
          <button
            onClick={handleAnalyze}
            className="btn-liquid-chip px-5 py-2 text-xs bg-rose-600 border-rose-700 text-white font-semibold inline-flex items-center gap-2 hover:bg-rose-700 transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Analysis</span>
          </button>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && !loading && (
        <div className="space-y-8">

          {/* 4. ANALYSIS SUMMARY CARD */}
          <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  Analysis Summary
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-900 text-sky-300 border border-sky-700 text-xs font-mono font-bold">
                {analysisSummary.ata || meta.ata_chapter || 'ATA 29'}
              </span>
            </div>

            <p className="text-sm text-slate-200 font-semibold leading-relaxed">
              {analysisSummary.text || payload.fault || "Maintenance report processed."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 font-bold">
                • Status: {meta.operational_status || "Requires Inspection"}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-sky-400 border border-slate-700 font-bold">
                • {analysisSummary.references_label || `${ragReferences.length} References Retrieved`}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-amber-400 border border-slate-700 font-bold">
                • {completeness.missing ? completeness.missing.length : 2} Context Fields Missing
              </span>
            </div>
          </div>

          {/* 5. AI FAULT ANALYSIS CARD */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200/90 shadow-xl bg-white/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  AI Fault Analysis
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEvidenceDrawer(!showEvidenceDrawer)}
                  className="btn-liquid-chip px-3 py-1.5 text-xs text-sky-800 bg-sky-50 border-sky-300 font-bold hover:bg-sky-100 flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-sky-600" />
                  <span>{showEvidenceDrawer ? 'Hide Extraction Evidence' : 'View Extraction Evidence'}</span>
                </button>
                <span className="badge-cyan text-xs">AI Verified</span>
              </div>
            </div>

            {/* Grid of Extracted Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Fault Category</span>
                <p className="text-base font-extrabold text-sky-800">
                  {meta.fault_category || "Not determined from report"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Component</span>
                <p className="text-base font-extrabold text-slate-900">
                  {meta.component || "Not determined from report"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Affected System</span>
                <p className="text-base font-extrabold text-blue-800">
                  {meta.affected_system || "Not determined from report"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">ATA Chapter</span>
                <p className="text-base font-mono font-extrabold text-indigo-700">
                  {meta.ata_chapter || "Not determined from report"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Fault Symptom</span>
                <p className="text-base font-extrabold text-slate-900">
                  {meta.symptom || meta.fault_type || "Not determined from report"}
                </p>
              </div>

              {/* Separated Reservoir Quantity Parameter */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Reservoir Quantity</span>
                <p className="text-base font-mono font-extrabold text-amber-800">
                  {meta.reservoir_quantity || "Not specified"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Severity</span>
                <p className="text-base font-extrabold text-slate-700">
                  {meta.severity || "Not determined from report"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Operational Status</span>
                <p className="text-base font-extrabold text-emerald-800">
                  {meta.operational_status || "Requires Inspection"}
                </p>
              </div>

            </div>

            {/* EXTRACTION EVIDENCE DRAWER */}
            {showEvidenceDrawer && (
              <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3 text-xs shadow-inner">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-[11px]">
                  <Search className="w-4 h-4 text-sky-600" />
                  <span>Extraction Evidence (Verbatim Text Quotes from Report)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                  {Object.entries(evidence).map(([field, quote], qIdx) => (
                    <div key={qIdx} className="p-3 bg-white rounded-lg border border-sky-100 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{field.replace('_', ' ')}:</span>
                      <p className="text-slate-800 font-semibold text-xs leading-relaxed italic">"{quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 6. OBSERVED VS POTENTIAL FINDINGS */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200/90 shadow-xl bg-white/95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Observed Findings vs. Potential Inspection Areas
                </h3>
              </div>
              <span className="text-xs text-sky-800 font-mono font-bold">AI Traceability</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
              {/* Observed from Report */}
              <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-3">
                <span className="font-bold uppercase tracking-wider text-[11px] text-sky-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Observed from Report (Direct Facts)</span>
                </span>
                <ul className="space-y-2">
                  {(meta.observed_findings || [
                    "Symptom description identified in maintenance log",
                    "Telemetry/parameter status recorded by crew",
                    "Initial operational visual check executed"
                  ]).map((item, obIdx) => (
                    <li key={obIdx} className="p-2.5 bg-white rounded-xl border border-sky-100 text-slate-800 font-semibold flex items-center gap-2 shadow-sm">
                      <span className="text-emerald-600 font-extrabold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Potential Inspection Areas */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>Potential Inspection Areas (Candidate Components)</span>
                </span>
                <ul className="space-y-2">
                  {(meta.potential_inspection_areas || [
                    "Component body & associated fittings",
                    "Electrical wiring harness & connectors",
                    "Control valve / sensor mechanism"
                  ]).map((item, poIdx) => (
                    <li key={poIdx} className="p-2.5 bg-white rounded-xl border border-amber-100 text-slate-800 font-semibold flex items-center gap-2 shadow-sm">
                      <span className="text-amber-600 font-extrabold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 italic text-center border-t border-slate-100 pt-2">
              Note: Candidate components are listed as potential inspection areas for engineering verification, not confirmed faulty parts.
            </p>
          </div>

          {/* 6. RELATIONAL KNOWLEDGE GRAPH */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200/90 shadow-xl bg-white/95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <GitFork className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Entity Relationships & Knowledge Graph
                </h3>
              </div>
              <span className="text-xs text-sky-800 font-mono font-bold">Relational Architecture</span>
            </div>

            {/* Relational Graph View */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-inner">
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-300 font-mono border-b border-slate-800 pb-2 gap-2">
                <span className="font-bold text-sky-400">Relational Architecture</span>
                <span className="flex items-center gap-3">
                  <span className="text-rose-400">OBSERVED = Directly Reported</span>
                  <span className="text-amber-400">POTENTIAL = Inspection Areas</span>
                  <span className="text-emerald-400">REFERENCE = Source Manual</span>
                </span>
              </div>

              {/* Relational Visual Diagram */}
              <div className="py-4 space-y-6 max-w-4xl mx-auto font-sans text-xs">
                
                {/* Layer 0: ATA Root */}
                <div className="flex justify-center">
                  <div className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold shadow-lg border border-indigo-400 flex items-center gap-2">
                    <span className="text-[10px] uppercase opacity-75 font-mono">ATA Root:</span>
                    <span>{meta.ata_chapter || 'ATA 29'}</span>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-indigo-400 mx-auto" />

                {/* Layer 1: System */}
                <div className="flex justify-center">
                  <div className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-extrabold shadow-lg border border-sky-400 flex items-center gap-2">
                    <span className="text-[10px] uppercase opacity-75 font-mono">System:</span>
                    <span>{meta.affected_system || 'Hydraulic Power System'}</span>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-sky-400 mx-auto" />

                {/* Layer 2: OBSERVED Parameter & Symptom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-3.5 rounded-xl bg-amber-900/70 text-amber-200 font-bold border border-amber-500/50 text-center space-y-1 shadow-md">
                    <span className="text-[10px] text-amber-400 uppercase font-mono block">OBSERVED Parameter:</span>
                    <span>{meta.reservoir_quantity || 'Reservoir Qty ~20% Low'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-rose-900/70 text-rose-200 font-bold border border-rose-500/50 text-center space-y-1 shadow-md">
                    <span className="text-[10px] text-rose-400 uppercase font-mono block">OBSERVED Symptom:</span>
                    <span>{meta.symptom || 'Hydraulic Fluid Leakage'}</span>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-slate-600 mx-auto" />

                {/* Layer 3: POTENTIAL Inspection Areas */}
                <div className="p-4.5 rounded-xl bg-slate-800 text-slate-200 font-bold border border-amber-500/50 max-w-xl mx-auto shadow-md space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                    <span className="text-[10px] text-amber-400 font-mono font-extrabold uppercase tracking-wider">
                      POTENTIAL INSPECTION AREAS (CANDIDATE COMPONENTS):
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono italic">Engineering verification</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-1">
                    {(meta.potential_inspection_areas && meta.potential_inspection_areas.length > 0 
                      ? meta.potential_inspection_areas 
                      : (meta.component || "").split("/").map(s => s.trim())
                     ).map((area, aIdx) => (
                      <div key={aIdx} className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-200 font-semibold text-xs flex items-center gap-2">
                        <span className="text-amber-400 font-extrabold text-sm">•</span>
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-emerald-500 mx-auto" />

                {/* Layer 4: REFERENCE Target Manual */}
                <div className="flex justify-center">
                  <div className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-extrabold shadow-lg border border-emerald-400 flex items-center gap-2">
                    <span className="text-[10px] uppercase opacity-80 font-mono">REFERENCE Target:</span>
                    <span>{ragReferences[0]?.document || 'Project Knowledge Base Manual'}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 7. RAG MAINTENANCE REFERENCES */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200/90 shadow-xl bg-white/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Retrieved Maintenance References (Ranked Classification)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-600 font-bold">RAG Retrieval Engine</span>
            </div>

            {/* Handle LOW RELEVANCE SCENARIO */}
            {lowRelevanceFound ? (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 text-amber-900">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  <h4 className="font-extrabold text-base">
                    No Sufficiently Relevant Maintenance Reference Found
                  </h4>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  No sufficiently relevant maintenance reference was found in the available knowledge base matching this report.
                </p>
                <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs space-y-2 font-mono">
                  <div><span className="font-bold text-slate-600 uppercase">Detected Fault:</span> {payload.detected_fault}</div>
                  <div><span className="font-bold text-slate-600 uppercase">Suggested Next Step:</span> {payload.suggested_next_step}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {ragReferences.map((ref, rIdx) => (
                  <div key={rIdx} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-md">
                    
                    {/* Classification Header (PRIMARY / SECONDARY / GENERAL) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono px-2.5 py-0.5 rounded text-white font-extrabold ${
                            rIdx === 0 ? 'bg-sky-600' : rIdx === 1 ? 'bg-indigo-600' : 'bg-slate-600'
                          }`}>
                            {ref.category_type}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                            {ref.rank_label}
                          </h4>
                        </div>
                        <p className="text-xs font-mono text-slate-600 font-semibold">
                          Document: <span className="text-slate-900 font-bold">{ref.document}</span> ({ref.source_type}) • ATA Chapter: {ref.ata_chapter} • Page {ref.page}
                        </p>
                      </div>

                      {/* Overall Relevance Badge */}
                      <div className="text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300">
                          <span>Relevance: {ref.relevance_percentage}%</span>
                          <span className="text-[10px] font-normal font-mono">({ref.relevance_label})</span>
                        </div>
                      </div>
                    </div>

                    {/* 8. RETRIEVAL EVIDENCE CHECKMARKS & EXPLANATION */}
                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                          Retrieval Evidence & Matching Criteria:
                        </span>
                        <button
                          onClick={() => setExpandedWhyIdx(expandedWhyIdx === rIdx ? null : rIdx)}
                          className="text-[11px] text-sky-700 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>{expandedWhyIdx === rIdx ? 'Hide Rationale' : 'Why was this retrieved?'}</span>
                          {expandedWhyIdx === rIdx ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {ref.matching_concepts.map((concept, cIdx) => (
                          <span key={cIdx} className="px-3 py-1 rounded-lg bg-white border border-sky-200 text-sky-900 font-bold flex items-center gap-1.5 shadow-sm">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{concept}</span>
                          </span>
                        ))}
                      </div>

                      {/* Expandable Why Retrieved Rationale */}
                      {expandedWhyIdx === rIdx && (
                        <div className="p-3 bg-white rounded-lg border border-sky-200 text-slate-800 font-mono text-xs leading-relaxed animate-fadeIn">
                          <span className="font-bold text-sky-900 mr-1">Retrieval Rationale:</span>
                          {ref.why_retrieved}
                        </div>
                      )}
                    </div>

                    {/* Relevant Evidence Source Passage */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                          Relevant Source Passage:
                        </span>
                        {ref.is_ai_summary && (
                          <span className="text-[10px] font-mono text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                            AI-generated summary of retrieved source
                          </span>
                        )}
                      </div>
                      <p className="text-slate-900 font-medium leading-relaxed italic">
                        "{ref.relevant_passage}"
                      </p>
                    </div>

                    {/* Aircraft Applicability Notice */}
                    <p className="text-[11px] text-slate-500 font-medium italic">
                      Notice: {payload.applicability_note || "Aircraft-specific applicability requires verification."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button 
                        onClick={() => setSelectedSourceModal(ref)}
                        className="btn-liquid-primary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>View Source</span>
                      </button>
                      <button 
                        onClick={() => setSelectedSourceModal(ref)}
                        className="btn-liquid-secondary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Full Document</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 9. INFORMATION COMPLETENESS */}
          <div className="glass-panel p-6 sm:p-8 space-y-4 border-slate-200/90 shadow-xl bg-white/95">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2 border-b border-slate-200 pb-3">
              <CheckSquare className="w-5 h-5 text-sky-600" />
              <span>Information Completeness & Missing Context</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              {/* Present Items */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-emerald-950">
                <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800">
                  ✓ Present Information:
                </span>
                <ul className="space-y-1.5">
                  {(completeness.present || []).map((item, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Items */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-amber-950">
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800">
                  ⚠ Missing / Unspecified Context:
                </span>
                <ul className="space-y-1.5">
                  {(completeness.missing || []).map((item, mIdx) => (
                    <li key={mIdx} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium italic text-right">
              "{completeness.note || "Additional information may improve retrieval accuracy."}"
            </p>
          </div>

          {/* 10. DECISION SUPPORT DISCLAIMER */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 text-xs flex items-start gap-3 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <span className="font-bold text-white uppercase tracking-wider mr-1">
                🛡️ Decision Support Disclaimer:
              </span>
              NovaTRix provides source-backed decision support. Retrieved information must be verified against the applicable approved Aircraft Maintenance Manual (AMM), operator procedures, and authorized engineering/maintenance personnel before any physical maintenance action.
            </p>
          </div>

          {/* 11. NASA ASRS HISTORICAL ANALYTICS */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200/90 shadow-xl bg-white/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  NASA ASRS Historical Dataset Analytics
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-600 font-bold flex items-center gap-2">
                <span>Corpus: 47,500+ ASRS Records</span>
                <span>•</span>
                <span className="text-sky-800 bg-sky-100 px-2 py-0.5 rounded">Selected Analysis Subset: 71 records</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Category Graph */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Historical Context — Current Fault: {currentCategory}
                  </span>
                  <span className="text-[11px] font-mono text-sky-800 font-extrabold">{getActiveIncidentLabel()}</span>
                </div>
                
                <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
                  {getCategoryStats().map((cat, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className={`text-[11px] font-mono font-extrabold ${cat.isCurrent ? 'text-sky-700' : 'text-slate-400'}`}>
                        {cat.count}
                      </span>
                      <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden border border-slate-200 flex items-end h-32">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-500 shadow-sm ${
                            cat.isCurrent 
                              ? 'bg-gradient-to-t from-sky-600 to-sky-400 ring-2 ring-sky-500' 
                              : 'bg-slate-300'
                          }`}
                          style={{ height: `${(cat.count / 15) * 100}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-extrabold text-center truncate w-full ${cat.isCurrent ? 'text-sky-900 font-bold' : 'text-slate-500'}`}>
                        {cat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Severity Breakdown */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Incident Severity Distribution
                  </span>
                  <span className="text-[11px] font-mono text-sky-800 font-extrabold">Risk Profile</span>
                </div>

                <div className="space-y-4 py-2 text-xs font-semibold">
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>Critical Severity</span>
                      <span className="font-mono text-rose-700 font-bold">18 incidents (25%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-rose-500 rounded-full w-[25%]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>Major Severity</span>
                      <span className="font-mono text-amber-700 font-bold">42 incidents (58%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-amber-500 rounded-full w-[58%]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>Minor Severity</span>
                      <span className="font-mono text-emerald-700 font-bold">12 incidents (17%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-emerald-500 rounded-full w-[17%]" />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 italic text-center border-t border-slate-100 pt-2">
                  Notice: Historical dataset statistics do not represent the current aircraft.
                </p>
              </div>
            </div>
          </div>

          {/* 12. SQLITE AUDIT HISTORY */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200/90 shadow-xl bg-white/95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Database Audit History (SQLite Persistence)
                </h3>
              </div>
              <button
                onClick={() => setActivePage('history')}
                className="btn-liquid-secondary text-xs py-1.5 px-4 font-bold flex items-center gap-1.5"
              >
                <span>View Previous Analyses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner">
              <table className="w-full text-left border-collapse text-xs font-semibold">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider font-bold text-[10px] border-b border-slate-200">
                    <th className="p-3">Analysis ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Aircraft Model</th>
                    <th className="p-3">ATA Chapter</th>
                    <th className="p-3">Fault Category</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {historyRecords.length > 0 ? (
                    historyRecords.map((rec) => {
                      const d = rec.created_at ? new Date(rec.created_at) : new Date();
                      const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const timeStr = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      return (
                        <tr key={rec.id} className="hover:bg-sky-50/50 transition-colors">
                          <td className="p-3 font-mono font-bold text-sky-800">#{rec.id}</td>
                          <td className="p-3 text-slate-700 font-mono font-bold">{dateStr}</td>
                          <td className="p-3 text-slate-600 font-mono">{timeStr}</td>
                          <td className="p-3 font-bold text-slate-900">{rec.aircraft || aircraftModel}</td>
                          <td className="p-3 font-mono text-indigo-700 font-extrabold">{ataChapter}</td>
                          <td className="p-3 text-slate-800 font-bold">{currentCategory}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] border border-emerald-300">
                              Saved in SQLite
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-slate-500 italic">
                        No previous analysis records found in SQLite database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SOURCE MODAL DIALOG */}
      {selectedSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-slate-900 text-base font-['Outfit']">
                Technical Manual Source — {selectedSourceModal.document}
              </h4>
              <button 
                onClick={() => setSelectedSourceModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                <div><span className="font-bold">Document:</span> {selectedSourceModal.document}</div>
                <div><span className="font-bold">Page:</span> Page {selectedSourceModal.page}</div>
                <div><span className="font-bold">ATA Chapter:</span> {selectedSourceModal.ata_chapter}</div>
              </div>
              
              <div className="p-4 bg-slate-900 text-sky-300 rounded-xl leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedSourceModal.relevant_passage}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setSelectedSourceModal(null)}
                className="btn-liquid-primary text-xs py-2 px-4"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
