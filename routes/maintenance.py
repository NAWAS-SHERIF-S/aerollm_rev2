import re
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
import requests

from database.session import get_db
from models.aircraft import Aircraft
from models.maintenance import MaintenanceRecord
from models.fault import FaultRecord
from schemas.maintenance import (
    MaintenanceAnalyzeRequest,
    MaintenanceAnalyzeResponse,
    MaintenanceHistoryResponse,
    MaintenanceRecordResponse
)
from services.novatrix import call_novatrix_analyze

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])


def extract_aircraft_id(report_text: str, novatrix_res: Dict[str, Any]) -> Optional[str]:
    """Extract aircraft ID from NovaTRix response or report text regex."""
    if isinstance(novatrix_res, dict) and novatrix_res.get("aircraft"):
        return str(novatrix_res["aircraft"]).upper()
    
    match = re.search(r'\b(VT\d{3,4}|[A-Z]{2}\d{3,4})\b', report_text, re.IGNORECASE)
    if match:
        return match.group(1).upper()
    return None


def extract_actions(novatrix_res: Dict[str, Any]) -> List[str]:
    """Extract actions list from NovaTRix response."""
    if isinstance(novatrix_res, dict):
        if "maintenance_actions" in novatrix_res and isinstance(novatrix_res["maintenance_actions"], list):
            return novatrix_res["maintenance_actions"]
        elif "actions" in novatrix_res and isinstance(novatrix_res["actions"], list):
            return novatrix_res["actions"]
    return []


@router.post("/analyze", response_model=MaintenanceAnalyzeResponse)
def analyze(request: MaintenanceAnalyzeRequest, db: Session = Depends(get_db)):
    """
    Main AI prediction API:
    1. Sends maintenance report to NovaTRix AI model.
    2. Parses result and automatically persists maintenance record, aircraft, and fault logs to SQLite DB.
    """
    try:
        novatrix_res = call_novatrix_analyze(request.report)
    except requests.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"NovaTRix unavailable or request failed: {str(e)}"
        )

    aircraft_id = extract_aircraft_id(request.report, novatrix_res)
    actions = extract_actions(novatrix_res)

    # Upsert aircraft in DB if aircraft_id detected
    if aircraft_id:
        existing_aircraft = db.query(Aircraft).filter(Aircraft.id == aircraft_id).first()
        if not existing_aircraft:
            new_aircraft = Aircraft(id=aircraft_id, model="A320", status="ACTIVE")
            db.add(new_aircraft)
            db.commit()

    # Save Maintenance Record to DB
    m_record = MaintenanceRecord(
        aircraft_id=aircraft_id,
        report=request.report,
        actions=actions,
        extracted_fault=request.report[:150],
        novatrix_raw=novatrix_res
    )
    db.add(m_record)
    db.commit()
    db.refresh(m_record)

    # Save Fault Record if fault/issue detected
    if aircraft_id or actions:
        action_str = actions[0] if actions else "INSPECTED"
        fault_record = FaultRecord(
            aircraft_id=aircraft_id,
            maintenance_id=m_record.id,
            fault=request.report[:100],
            status="RESOLVED" if "REPLACED" in actions or "REPAIRED" in actions else "ACTIVE",
            action=action_str
        )
        db.add(fault_record)
        db.commit()

    return {
        "success": True,
        "result": novatrix_res,
        "record_id": m_record.id
    }


@router.get("/history", response_model=MaintenanceHistoryResponse)
def get_history(aircraft: Optional[str] = Query(None, description="Filter by aircraft ID"), db: Session = Depends(get_db)):
    """Retrieve list of previous maintenance analysis records."""
    query = db.query(MaintenanceRecord)
    if aircraft:
        query = query.filter(MaintenanceRecord.aircraft_id == aircraft.upper())
    
    records = query.order_by(MaintenanceRecord.created_at.desc()).all()

    formatted_records = [
        MaintenanceRecordResponse(
            id=r.id,
            aircraft=r.aircraft_id,
            report=r.report,
            actions=r.actions or [],
            created_at=r.created_at
        )
        for r in records
    ]

    return {"records": formatted_records}


@router.get("/{id}", response_model=MaintenanceRecordResponse)
def get_one_maintenance(id: int, db: Session = Depends(get_db)):
    """Get single maintenance analysis record by ID."""
    record = db.query(MaintenanceRecord).filter(MaintenanceRecord.id == id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Maintenance record not found")

    return MaintenanceRecordResponse(
        id=record.id,
        aircraft=record.aircraft_id,
        report=record.report,
        actions=record.actions or [],
        created_at=record.created_at
    )
