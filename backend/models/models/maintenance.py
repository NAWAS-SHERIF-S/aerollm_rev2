from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database.session import Base


class MaintenanceRecord(Base):
    __tablename__ = "maintenance_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    aircraft_id = Column(String, ForeignKey("aircraft.id"), nullable=True, index=True)
    report = Column(Text, nullable=False)
    actions = Column(JSON, nullable=True)  # e.g., ["REPLACED", "INSPECTED"]
    extracted_fault = Column(Text, nullable=True)
    novatrix_raw = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    aircraft = relationship("Aircraft", back_populates="maintenance_records")
    faults = relationship("FaultRecord", back_populates="maintenance_record", cascade="all, delete-orphan")
