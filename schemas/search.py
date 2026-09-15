from typing import List, Optional, Any, Dict
from pydantic import BaseModel


class SearchResultItem(BaseModel):
    type: str  # "maintenance", "aircraft", "fault"
    id: Any
    aircraft: Optional[str] = None
    text: str


class SearchResponse(BaseModel):
    query: str
    results: List[SearchResultItem]
