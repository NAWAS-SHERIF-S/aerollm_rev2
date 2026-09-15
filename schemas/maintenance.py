from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, ConfigDict


class MaintenanceAnalyzeRequest(BaseModel):
    report: str


class MaintenanceRecordResponse(BaseModel):
    id: int
    aircraft: Optional[str] = None
    report: str
    actions: List[str] = []
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MaintenanceHistoryResponse(BaseModel):
    records: List[MaintenanceRecordResponse]


class MaintenanceAnalyzeResponse(BaseModel):
    success: bool
    result: Dict[str, Any]
    record_id: Optional[int] = None
