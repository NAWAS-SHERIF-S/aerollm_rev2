export const DATASETS = [
  {
    id: "nasa-asrs",
    name: "NASA ASRS",
    fullName: "NASA Aviation Safety Reporting System",
    type: "Incident & Safety Reports",
    count: "47,500+",
    volume: "1.2 GB",
    description: "Voluntary safety reports submitted by pilots, air traffic controllers, and dispatchers detailing human factors and operational risks.",
    badge: "Primary Corpus"
  },
  {
    id: "faa-sdr",
    name: "FAA SDR",
    fullName: "FAA Service Difficulty Reports",
    type: "Component Malfunctions & Faults",
    count: "1.2M+",
    volume: "850 MB",
    description: "Official records detailing mechanical difficulties, component breakdowns, structural wear, and system failures in commercial aircraft.",
    badge: "Maintenance Focus"
  },
  {
    id: "ntsb",
    name: "NTSB Reports",
    fullName: "National Transportation Safety Board Archives",
    type: "Investigation Records",
    count: "12,400+",
    volume: "420 MB",
    description: "In-depth accident investigation reports, probable cause determinations, safety recommendations, and metallurgical analysis.",
    badge: "Safety Intelligence"
  },
  {
    id: "advisory-circulars",
    name: "Advisory Circulars",
    fullName: "FAA & EASA Technical Regulations",
    type: "Compliance & Airworthiness Directives",
    count: "3,800+",
    volume: "210 MB",
    description: "Regulatory compliance guidance, airworthiness directives (ADs), standard maintenance practices, and overhaul specs.",
    badge: "Regulatory Specs"
  }
];

export const PIPELINE_STEPS = [
  {
    step: 1,
    title: "Raw Aviation Data",
    desc: "Ingestion of unstructured logbooks, NASA ASRS, NTSB transcripts, and FAA SDR entries.",
    icon: "Database"
  },
  {
    step: 2,
    title: "Data Cleaning",
    desc: "Removal of PII, callsign masking, typo normalization, and standard acronym resolution.",
    icon: "Filter"
  },
  {
    step: 3,
    title: "Normalization",
    desc: "Mapping non-standard mechanic shorthand to ATA Specification 100 codes.",
    icon: "Sliders"
  },
  {
    step: 4,
    title: "Domain Processing",
    desc: "Tokenizing aviation terminology, part numbers, tail numbers, and maintenance verb taxonomy.",
    icon: "Cpu"
  },
  {
    step: 5,
    title: "Training Dataset",
    desc: "Curated 2.8GB instruction-tuning dataset optimized for precision entity extraction.",
    icon: "Layers"
  },
  {
    step: 6,
    title: "NovaTRix Engine",
    desc: "Fine-tuned Qwen2.5-7B-Instruct model delivering structured, airworthy predictions.",
    icon: "Zap"
  }
];

export const CAPABILITIES = [
  {
    id: "maint-analysis",
    title: "Aviation Maintenance Analysis",
    subtitle: "Automated Logbook Parsing",
    icon: "Wrench",
    desc: "Extracts maintenance actions, part replacements, and symptom descriptions from unstructured mechanic narratives with 99.2% accuracy.",
    tag: "Core Model"
  },
  {
    id: "fault-detection",
    title: "Fault & Symptom Detection",
    subtitle: "Root Cause Classification",
    icon: "AlertTriangle",
    desc: "Identifies hidden mechanical faults, pressure anomalies, electrical glitches, and hydraulic fluid losses before failure.",
    tag: "Safety AI"
  },
  {
    id: "action-extraction",
    title: "Maintenance Action Extraction",
    subtitle: "ATA 100 Verb Categorization",
    icon: "CheckSquare",
    desc: "Categorizes actions into REPLACED, INSPECTED, REPAIRED, OVERHAULED, and TESTED according to FAA guidelines.",
    tag: "Structured Data"
  },
  {
    id: "aircraft-id",
    title: "Aircraft & Fleet Identification",
    subtitle: "Tail Number Extraction",
    icon: "Plane",
    desc: "Detects commercial registration numbers, aircraft model types (e.g. A320, B737, B787), and fleet assignments.",
    tag: "Fleet Intel"
  },
  {
    id: "report-understanding",
    title: "Aviation Report Understanding",
    subtitle: "Deep Semantic Comprehension",
    icon: "FileText",
    desc: "Comprehends complex flight crew logs, MEL (Minimum Equipment List) deferrals, and line maintenance reports.",
    tag: "LLM Fine-Tune"
  },
  {
    id: "safety-analysis",
    title: "Safety Incident Analysis",
    subtitle: "Risk Assessment Matrix",
    icon: "ShieldCheck",
    desc: "Cross-references reported symptoms against NASA ASRS historical hazards to evaluate flight safety risk levels.",
    tag: "Predictive Safety"
  },
  {
    id: "tech-retrieval",
    title: "Technical Knowledge Retrieval",
    subtitle: "RAG Manual Search",
    icon: "BookOpen",
    desc: "Queries Aircraft Maintenance Manuals (AMM) and Component Maintenance Manuals (CMM) in real-time.",
    tag: "Knowledge Graph"
  },
  {
    id: "structured-output",
    title: "Structured Output Generation",
    subtitle: "JSON & API Standards",
    icon: "Code",
    desc: "Outputs clean, validated JSON schemas ready for MRO (Maintenance, Repair, and Overhaul) software integration.",
    tag: "JSON Schema"
  }
];

export const USE_CASES = [
  {
    title: "Maintenance Engineering",
    tagline: "Accelerate Turnaround Times (TAT)",
    desc: "Streamline line maintenance routines by automatically converting handwritten or typed mechanic logs into digital work orders and part requisitions.",
    workflow: ["Mechanic Inputs Log", "NovaTRix Identifies Action", "ERP Requisitions Part", "Aircraft Released"],
    icon: "Wrench"
  },
  {
    title: "Safety & Incident Analysis",
    tagline: "Proactive Risk Identification",
    desc: "Analyze thousands of flight safety reports weekly to spot emerging fleet-wide mechanical trends and recurring component vulnerabilities.",
    workflow: ["Ingest Flight Logs", "Pattern Recognition", "Severity Scoring", "Fleet Alert Issued"],
    icon: "ShieldAlert"
  },
  {
    title: "Aircraft Troubleshooting",
    tagline: "Guided Fault Resolution",
    desc: "Assist avionics technicians and mechanics with step-by-step troubleshooting suggestions derived from historical AMM manual resolutions.",
    workflow: ["Enter Symptom Code", "Query AMM Corpus", "Ranked Diagnostics", "Verified Fix Applied"],
    icon: "Cpu"
  },
  {
    title: "Technical Training",
    tagline: "AI Assistance for Junior Technicians",
    desc: "Empower new maintenance personnel with immediate domain-aware explanation of complex ATA codes and system diagrams.",
    workflow: ["Ask Technical Q", "NovaTRix RAG Search", "Interactive Diagram", "Skilled Execution"],
    icon: "GraduationCap"
  },
  {
    title: "Regulatory & Compliance Support",
    tagline: "Airworthiness Audit Compliance",
    desc: "Ensure every maintenance action aligns with FAA Airworthiness Directives (ADs) and EASA safety mandates automatically.",
    workflow: ["Log Submission", "AD Cross-Reference", "Compliance Validation", "Auditable Audit Log"],
    icon: "FileCheck"
  },
  {
    title: "Aviation Fleet Research",
    tagline: "Data-Driven Fleet Optimization",
    desc: "Empower aviation researchers and airline operational leaders to query component reliability data over millions of flight hours.",
    workflow: ["Aggregate SDR Data", "AeroLLM Analytics", "Predictive Lifespan", "Cost Optimization"],
    icon: "LineChart"
  }
];

export const SAMPLE_REPORTS = [
  {
    id: "sample-1",
    label: "Sample 1 — Hydraulic System Leakage",
    shortLabel: "Hydraulic System Leakage",
    text: "During post-flight inspection, hydraulic fluid was observed leaking from the left main landing gear actuator area. Hydraulic reservoir quantity was approximately 20% below the normal servicing level. No abnormal cockpit indications were reported during the previous flight. Maintenance inspection requested to determine the source of leakage and verify actuator and associated hydraulic line condition.",
    aircraftModel: "A320",
    aircraftReg: "DEMO-VT204",
    ataChapter: "ATA 29",
    reportType: "Post-flight Inspection",
    expectedConcepts: [
      "Hydraulic system",
      "Hydraulic leakage",
      "Landing gear actuator",
      "Low reservoir quantity",
      "ATA 29",
      "Maintenance inspection"
    ]
  },
  {
    id: "sample-2",
    label: "Sample 2 — Landing Gear Retraction Issue",
    shortLabel: "Landing Gear Retraction",
    text: "During landing gear operational check, the right main landing gear indicated an unsafe condition during retraction. Gear indication remained intermittent after cycling the landing gear selector. No abnormal hydraulic pressure indication was observed. Aircraft was removed from service pending inspection of the landing gear indication and retraction system.",
    aircraftModel: "B737",
    aircraftReg: "DEMO-VT318",
    ataChapter: "ATA 32",
    reportType: "Operational BITE Check",
    expectedConcepts: [
      "Landing gear",
      "Unsafe indication",
      "Retraction system",
      "Indication fault",
      "ATA 32",
      "Maintenance required"
    ]
  },
  {
    id: "sample-3",
    label: "Sample 3 — Engine Oil Temperature and Pressure",
    shortLabel: "Engine Oil Temp & Pressure",
    text: "During cruise, engine oil temperature increased above the normal operating range while oil pressure decreased gradually. The crew observed the abnormal indication and followed the applicable aircraft operating procedure. No engine vibration or abnormal noise was reported. Maintenance inspection required to determine whether the indication is related to the oil system, sensor, or engine condition.",
    aircraftModel: "A320",
    aircraftReg: "DEMO-VT509",
    ataChapter: "ATA 79",
    reportType: "In-flight Incident",
    expectedConcepts: [
      "Engine oil system",
      "Oil temperature",
      "Oil pressure",
      "Sensor",
      "Engine",
      "ATA 79"
    ]
  },
  {
    id: "sample-4",
    label: "Sample 4 — Flight Control Issue",
    shortLabel: "Flight Control Resistance",
    text: "During scheduled flight-control inspection, increased resistance was observed during movement of the elevator control system. No visible damage was identified during the initial external inspection. Further inspection requested to determine whether the condition is associated with the control linkage, cable system, actuator, or lubrication condition.",
    aircraftModel: "B787",
    aircraftReg: "DEMO-VT412",
    ataChapter: "ATA 27",
    reportType: "Scheduled Maintenance",
    expectedConcepts: [
      "Flight controls",
      "Elevator",
      "Control linkage",
      "Cable",
      "Actuator",
      "ATA 27"
    ]
  },
  {
    id: "sample-5",
    label: "Sample 5 — Avionics Fault",
    shortLabel: "Avionics VHF Fault",
    text: "During avionics operational testing, intermittent communication loss was observed between the aircraft communication control panel and the VHF communication system. The fault occurred intermittently during repeated radio transmission tests. Connector and wiring inspection requested before replacement of any line-replaceable unit.",
    aircraftModel: "A350",
    aircraftReg: "DEMO-VT601",
    ataChapter: "ATA 23",
    reportType: "Line Maintenance",
    expectedConcepts: [
      "Avionics",
      "VHF communication",
      "Communication control panel",
      "Wiring/connectors",
      "ATA 23"
    ]
  },
  {
    id: "sample-6",
    label: "Sample 6 — Corrosion Inspection",
    shortLabel: "Corrosion Inspection",
    text: "During scheduled inspection of the lower fuselage area, localized surface corrosion was identified near an access panel. The affected area was cleaned and visually inspected. Further assessment is required to determine corrosion depth and whether additional inspection or corrective maintenance is necessary.",
    aircraftModel: "A320",
    aircraftReg: "DEMO-VT711",
    ataChapter: "ATA 51",
    reportType: "Scheduled Maintenance",
    expectedConcepts: [
      "Corrosion",
      "Fuselage",
      "Inspection",
      "Surface condition",
      "ATA 51"
    ]
  }
];

