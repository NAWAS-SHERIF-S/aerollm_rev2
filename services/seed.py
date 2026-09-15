from sqlalchemy.orm import Session
from models.aircraft import Aircraft
from models.maintenance import MaintenanceRecord
from models.fault import FaultRecord


def seed_initial_data(db: Session):
    """Seed initial demo fleet and maintenance data if database is empty."""
    # Check if aircraft table is empty
    if db.query(Aircraft).count() == 0:
        initial_aircraft = [
            Aircraft(id="VT101", model="A320", status="ACTIVE"),
            Aircraft(id="VT102", model="B737", status="MAINTENANCE"),
            Aircraft(id="VT103", model="A321", status="ACTIVE"),
            Aircraft(id="VT104", model="B787", status="INSPECTION"),
            Aircraft(id="VT105", model="A350", status="ACTIVE"),
        ]
        db.add_all(initial_aircraft)
        db.commit()

        # Add initial sample maintenance records & faults
        m1 = MaintenanceRecord(
            aircraft_id="VT101",
            report="Aircraft VT101 reported hydraulic pressure low during taxi. Maintenance replaced the hydraulic pump.",
            actions=["REPLACED"],
            extracted_fault="Hydraulic pressure low during taxi",
            novatrix_raw={"aircraft": "VT101", "maintenance_actions": ["REPLACED"]}
        )
        m2 = MaintenanceRecord(
            aircraft_id="VT102",
            report="Aircraft VT102 left engine oil temperature high on climb out. Inspected oil line and replaced sensor.",
            actions=["INSPECTED", "REPLACED"],
            extracted_fault="Left engine oil temperature high",
            novatrix_raw={"aircraft": "VT102", "maintenance_actions": ["INSPECTED", "REPLACED"]}
        )
        m3 = MaintenanceRecord(
            aircraft_id="VT103",
            report="VT103 APU failure to start on gate arrival. Repaired wiring harness and tested OK.",
            actions=["REPAIRED", "TESTED"],
            extracted_fault="APU failure to start",
            novatrix_raw={"aircraft": "VT103", "maintenance_actions": ["REPAIRED", "TESTED"]}
        )

        db.add_all([m1, m2, m3])
        db.commit()

        # Add initial faults
        f1 = FaultRecord(
            aircraft_id="VT101",
            maintenance_id=m1.id,
            fault="Hydraulic pressure low during taxi",
            status="RESOLVED",
            action="REPLACED"
        )
        f2 = FaultRecord(
            aircraft_id="VT102",
            maintenance_id=m2.id,
            fault="Left engine oil temperature high",
            status="ACTIVE",
            action="REPLACED"
        )
        f3 = FaultRecord(
            aircraft_id="VT103",
            maintenance_id=m3.id,
            fault="APU failure to start",
            status="RESOLVED",
            action="REPAIRED"
        )

        db.add_all([f1, f2, f3])
        db.commit()
