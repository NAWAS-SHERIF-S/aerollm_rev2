from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database.session import Base


class FaultRecord(Base):
    __tablename__ = "fault_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    aircraft_id = Column(String, ForeignKey("aircraft.id"), nullable=True, index=True)
    maintenance_id = Column(Integer, ForeignKey("maintenance_records.id"), nullable=True, index=True)
    fault = Column(Text, nullable=False)  # e.g., "Hydraulic pressure low"
    status = Column(String, nullable=False, default="RESOLVED")  # "RESOLVED", "ACTIVE", "PENDING"
    action = Column(String, nullable=True)  # e.g., "REPLACED"
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    aircraft = relationship("Aircraft", back_populates="fault_records")
    maintenance_record = relationship("MaintenanceRecord", back_populates="faults")
