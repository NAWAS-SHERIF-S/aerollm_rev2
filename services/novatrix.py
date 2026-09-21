import re
import requests
from typing import Dict, Any
from services.rag_pipeline import query_rag_pipeline

NOVATRIX_URL = "http://localhost:8010"


def check_novatrix_status() -> Dict[str, Any]:
    """Check health/status of NovaTRix server."""
    try:
        response = requests.get(f"{NOVATRIX_URL}/", timeout=3)
        response.raise_for_status()
        res = response.json()
        if isinstance(res, dict):
            res["status"] = "online"
            return res
        return {"status": "online", "model": "NovaTRix"}
    except requests.RequestException:
        return {"status": "offline", "note": "GPU server at localhost:8010 is offline (Using Local RAG Engine)"}


def call_novatrix_analyze(report: str) -> Dict[str, Any]:
    """
    Real RAG Analysis Engine:
    Sends query to RAG Pipeline which retrieves document chunks from ChromaDB vector database
    and synthesizes step-by-step procedures and source citations.
    """
    try:
        response = requests.post(
            NOVATRIX_URL,
            json={"report": report},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException:
        # Real RAG Pipeline execution
        rag_res = query_rag_pipeline(report)

        aircraft_match = re.search(r'\b(VT\d{3,4}|[A-Z]{2,3}\d{3,4}|DEMO-[A-Z0-9]+)\b', report, re.IGNORECASE)
        aircraft_id = aircraft_match.group(1).upper() if aircraft_match else "A320-DEMO"

        actions = []
        action_sources = f"{report}".upper()
        action_patterns = (
            ("REPLACED", ("REPLACE", "REPLACED")),
            ("INSPECTED", ("INSPECT", "INSPECTED", "EXAMINE")),
            ("REPAIRED", ("REPAIR", "REPAIRED", "RECTIFY")),
            ("TESTED", ("TEST", "TESTED", "MEASURE", "PRESSURE")),
            ("BLED", ("BLEED", "BLED")),
            ("VERIFIED", ("VERIFY", "VERIFIED", "CHECK")),
        )
        for action, keywords in action_patterns:
            if any(keyword in action_sources for keyword in keywords):
                actions.append(action)
        if not actions:
            actions = ["INSPECTED", "VERIFIED"]

        meta = rag_res.get("fault_metadata", {})

        res = {
            "query": rag_res.get("query", report),
            "low_relevance_found": rag_res.get("low_relevance_found", False),
            "relevance_message": rag_res.get("relevance_message", ""),
            "detected_fault": rag_res.get("detected_fault", meta.get("fault_type", "Reported Fault")),
            "suggested_next_step": rag_res.get("suggested_next_step", ""),
            "analysis_summary": rag_res.get("analysis_summary", {}),
            "fault": meta.get("fault_type", report[:60]),
            "fault_identified": meta.get("fault_type", report[:60]),
            "fault_metadata": meta,
            "evidence": rag_res.get("evidence", {}),
            "knowledge_graph": rag_res.get("knowledge_graph", {}),
            "completeness": rag_res.get("completeness", {}),
            "rag_references": rag_res.get("rag_references", []),
            "system": meta.get("affected_system", "Aviation System"),
            "component": meta.get("component", "Component"),
            "ata_chapter": meta.get("ata_chapter", "ATA 05"),
            "severity": meta.get("severity", "Not determined from report"),
            "operational_status": meta.get("operational_status", "Requires Inspection"),
            "actions": actions,
            "maintenance_actions": actions,
            "sources": rag_res.get("sources", []),
            "applicability_note": rag_res.get("applicability_note", "Aircraft-specific applicability requires verification."),
            "disclaimer": rag_res.get("disclaimer", ""),
            "aircraft": aircraft_id,
            "note": "Analyzed via AeroLLM Real RAG Knowledge Engine"
        }

        return res
