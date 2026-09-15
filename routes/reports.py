from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database.session import get_db
from models.maintenance import MaintenanceRecord
from schemas.maintenance import MaintenanceRecordResponse

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("")
def get_reports(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """Retrieve paginated maintenance reports."""
    total = db.query(MaintenanceRecord).count()
    offset = (page - 1) * limit
    
    records = (
        db.query(MaintenanceRecord)
        .order_by(MaintenanceRecord.created_at.desc())
        .offset(offset)
        .limit(limit)
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

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit if limit > 0 else 1,
        "reports": formatted_records
    }
