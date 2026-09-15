from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class FaultResponse(BaseModel):
    id: int
    aircraft: Optional[str] = None
    fault: str
    status: str
    action: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class FaultListResponse(BaseModel):
    faults: List[FaultResponse]
