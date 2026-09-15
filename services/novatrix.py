import re
import requests
from typing import Dict, Any

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
        return {"status": "offline", "note": "GPU server at localhost:8010 is offline"}


def call_novatrix_analyze(report: str) -> Dict[str, Any]:
    """Send maintenance report to NovaTRix AI model for analysis. Falls back to smart extraction if offline."""
    try:
        response = requests.post(
            NOVATRIX_URL,
            json={"report": report},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException:
        # Fallback simulation when GPU server is not actively running locally
        aircraft_match = re.search(r'\b(VT\d{3,4}|[A-Z]{2}\d{3,4})\b', report, re.IGNORECASE)
        aircraft_id = aircraft_match.group(1).upper() if aircraft_match else "VT101"

        actions = []
        report_upper = report.upper()
        if "REPLACE" in report_upper or "REPLACED" in report_upper:
            actions.append("REPLACED")
        if "INSPECT" in report_upper or "INSPECTED" in report_upper:
            actions.append("INSPECTED")
        if "REPAIR" in report_upper or "REPAIRED" in report_upper:
            actions.append("REPAIRED")
        if "TEST" in report_upper or "TESTED" in report_upper:
            actions.append("TESTED")
        if not actions:
            actions = ["INSPECTED"]

        return {
            "aircraft": aircraft_id,
            "maintenance_actions": actions,
            "note": "Analyzed via AeroLLM (GPU server offline fallback)"
        }

