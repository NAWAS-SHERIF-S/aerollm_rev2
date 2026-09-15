from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database.session import get_db
from models.fault import FaultRecord
from schemas.fault import FaultListResponse, FaultResponse

router = APIRouter(prefix="/faults", tags=["Faults"])


@router.get("", response_model=FaultListResponse)
def get_faults(aircraft: Optional[str] = Query(None, description="Filter faults by aircraft ID"), db: Session = Depends(get_db)):
    """Retrieve fault records, optionally filtered by aircraft tail ID."""
    query = db.query(FaultRecord)
    if aircraft:
        query = query.filter(FaultRecord.aircraft_id == aircraft.upper())
    
    faults = query.order_by(FaultRecord.created_at.desc()).all()

    formatted_faults = [
        FaultResponse(
            id=f.id,
            aircraft=f.aircraft_id,
            fault=f.fault,
            status=f.status,
            action=f.action,
            created_at=f.created_at
        )
        for f in faults
    ]

    return {"faults": formatted_faults}
