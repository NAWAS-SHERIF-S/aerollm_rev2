from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database.session import get_db
from services.novatrix import check_novatrix_status

router = APIRouter(tags=["Health"])


@router.get("/health")
def health(db: Session = Depends(get_db)):
    db_status = "connected"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"error: {str(e)}"

    novatrix_info = check_novatrix_status()

    return {
        "backend": "online",
        "database": db_status,
        "novatrix": novatrix_info
    }

