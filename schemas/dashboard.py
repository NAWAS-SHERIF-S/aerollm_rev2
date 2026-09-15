from typing import Dict
from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    total_aircraft: int
    active_aircraft: int
    aircraft_in_maintenance: int
    total_reports: int
    total_faults: int
    maintenance_actions: Dict[str, int]
