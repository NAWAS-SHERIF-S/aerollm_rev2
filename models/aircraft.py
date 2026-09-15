from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from database.session import Base


class Aircraft(Base):
    __tablename__ = "aircraft"

    id = Column(String, primary_key=True, index=True)  # Tail number / ID e.g. "VT101"
    model = Column(String, nullable=False, default="A320")  # e.g. "A320", "B737"
    status = Column(String, nullable=False, default="ACTIVE")  # "ACTIVE", "MAINTENANCE", "INSPECTION"
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    maintenance_records = relationship("MaintenanceRecord", back_populates="aircraft", cascade="all, delete-orphan")
    fault_records = relationship("FaultRecord", back_populates="aircraft", cascade="all, delete-orphan")
