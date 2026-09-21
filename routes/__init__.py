from routes.health import router as health_router
from routes.maintenance import router as maintenance_router
from routes.aircraft import router as aircraft_router
from routes.dashboard import router as dashboard_router
from routes.faults import router as faults_router
from routes.search import router as search_router
from routes.reports import router as reports_router
from routes.rag import router as rag_router

__all__ = [
    "health_router",
    "maintenance_router",
    "aircraft_router",
    "dashboard_router",
    "faults_router",
    "search_router",
    "reports_router",
    "rag_router",
]

