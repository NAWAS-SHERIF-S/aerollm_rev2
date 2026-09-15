from schemas.aircraft import AircraftResponse, AircraftListResponse
from schemas.maintenance import MaintenanceAnalyzeRequest, MaintenanceAnalyzeResponse, MaintenanceHistoryResponse, MaintenanceRecordResponse
from schemas.fault import FaultResponse, FaultListResponse
from schemas.dashboard import DashboardStatsResponse
from schemas.search import SearchResponse, SearchResultItem

__all__ = [
    "AircraftResponse",
    "AircraftListResponse",
    "MaintenanceAnalyzeRequest",
    "MaintenanceAnalyzeResponse",
    "MaintenanceHistoryResponse",
    "MaintenanceRecordResponse",
    "FaultResponse",
    "FaultListResponse",
    "DashboardStatsResponse",
    "SearchResponse",
    "SearchResultItem",
]
