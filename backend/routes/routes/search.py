from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database.session import get_db
from models.maintenance import MaintenanceRecord
from models.aircraft import Aircraft
from models.fault import FaultRecord
from schemas.search import SearchResponse, SearchResultItem

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("", response_model=SearchResponse)
def search_all(q: str = Query(..., min_length=1, description="Search query string"), db: Session = Depends(get_db)):
    """Search reports, aircraft, and faults for query keyword."""
    search_term = f"%{q}%"
    results = []

    # 1. Search Maintenance Records
    m_records = db.query(MaintenanceRecord).filter(
        (MaintenanceRecord.report.like(search_term)) |
        (MaintenanceRecord.aircraft_id.like(search_term))
    ).limit(10).all()

    for m in m_records:
        results.append(SearchResultItem(
            type="maintenance",
            id=m.id,
            aircraft=m.aircraft_id,
            text=m.report
        ))

    # 2. Search Aircraft Fleet
    aircraft_matches = db.query(Aircraft).filter(
        (Aircraft.id.like(search_term)) |
        (Aircraft.model.like(search_term)) |
        (Aircraft.status.like(search_term))
    ).limit(10).all()

    for a in aircraft_matches:
        results.append(SearchResultItem(
            type="aircraft",
            id=a.id,
            aircraft=a.id,
            text=f"Aircraft {a.id} ({a.model}) - Status: {a.status}"
        ))

    # 3. Search Fault Records
    fault_matches = db.query(FaultRecord).filter(
        (FaultRecord.fault.like(search_term)) |
        (FaultRecord.action.like(search_term)) |
        (FaultRecord.aircraft_id.like(search_term))
    ).limit(10).all()

    for f in fault_matches:
        results.append(SearchResultItem(
            type="fault",
            id=f.id,
            aircraft=f.aircraft_id,
            text=f"Fault: {f.fault} [Action: {f.action or 'N/A'}, Status: {f.status}]"
        ))

    return {
        "query": q,
        "results": results
    }
