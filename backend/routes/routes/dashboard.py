from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from models.aircraft import Aircraft
from models.maintenance import MaintenanceRecord
from models.fault import FaultRecord
from schemas.dashboard import DashboardStatsResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Retrieve consolidated counts and statistics for frontend dashboards."""
    total_aircraft = db.query(Aircraft).count()
    active_aircraft = db.query(Aircraft).filter(Aircraft.status == "ACTIVE").count()
    aircraft_in_maintenance = db.query(Aircraft).filter(Aircraft.status == "MAINTENANCE").count()
    
    total_reports = db.query(MaintenanceRecord).count()
    total_faults = db.query(FaultRecord).count()

    # Aggregate maintenance actions breakdown
    all_records = db.query(MaintenanceRecord.actions).all()
    action_counts = {}
    for (actions,) in all_records:
        if actions and isinstance(actions, list):
            for act in actions:
                act_clean = str(act).upper()
                action_counts[act_clean] = action_counts.get(act_clean, 0) + 1

    # Ensure default action keys exist if empty
    for default_act in ["REPLACED", "REPAIRED", "INSPECTED"]:
        if default_act not in action_counts:
            action_counts[default_act] = 0

    return {
        "total_aircraft": total_aircraft,
        "active_aircraft": active_aircraft,
        "aircraft_in_maintenance": aircraft_in_maintenance,
        "total_reports": total_reports,
        "total_faults": total_faults,
        "maintenance_actions": action_counts
    }
