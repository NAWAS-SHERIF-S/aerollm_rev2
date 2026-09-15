from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class AircraftBase(BaseModel):
    id: str
    model: str = "A320"
    status: str = "ACTIVE"


class AircraftCreate(AircraftBase):
    pass


class AircraftResponse(AircraftBase):
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AircraftListResponse(BaseModel):
    aircraft: List[AircraftResponse]
