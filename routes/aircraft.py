from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.session import get_db
from models.aircraft import Aircraft
from models.maintenance import MaintenanceRecord
from schemas.aircraft import AircraftResponse, AircraftListResponse
from schemas.maintenance import MaintenanceHistoryResponse, MaintenanceRecordResponse

router = APIRouter(prefix="/aircraft", tags=["Aircraft"])


@router.get("", response_model=AircraftListResponse)
def list_aircraft(db: Session = Depends(get_db)):
    """List all aircraft in the fleet."""
    aircraft_list = db.query(Aircraft).order_by(Aircraft.id.asc()).all()
    return {"aircraft": aircraft_list}


@router.get("/{id}", response_model=AircraftResponse)
def get_aircraft(id: str, db: Session = Depends(get_db)):
    """Get single aircraft details by ID (e.g. VT101)."""
    aircraft = db.query(Aircraft).filter(Aircraft.id == id.upper()).first()
    if not aircraft:
        raise HTTPException(status_code=404, detail=f"Aircraft '{id}' not found")
    return aircraft


@router.get("/{id}/maintenance", response_model=MaintenanceHistoryResponse)
def get_aircraft_maintenance_history(id: str, db: Session = Depends(get_db)):
    """Get maintenance history for a specific aircraft."""
    aircraft = db.query(Aircraft).filter(Aircraft.id == id.upper()).first()
    if not aircraft:
        raise HTTPException(status_code=404, detail=f"Aircraft '{id}' not found")

    records = (
        db.query(MaintenanceRecord)
        .filter(MaintenanceRecord.aircraft_id == id.upper())
        .order_by(MaintenanceRecord.created_at.desc())
        .all()
    )

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
