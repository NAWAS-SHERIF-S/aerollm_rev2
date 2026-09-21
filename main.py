import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.session import Base, engine, SessionLocal
from services.seed import seed_initial_data
from services.rag_pipeline import ingest_all_documents
from routes import (
    health_router,
    maintenance_router,
    aircraft_router,
    dashboard_router,
    faults_router,
    search_router,
    reports_router,
    rag_router,
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Seed initial fleet & demo maintenance records
db = SessionLocal()
try:
    seed_initial_data(db)
finally:
    db.close()

app = FastAPI(
    title="AeroLLM Backend",
    version="1.0.0",
    description="AeroLLM / NovaTRix Aviation Maintenance Backend API with Real RAG Engine"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    """Ensure RAG vector database index is initialized on backend startup."""
    try:
        print("[AeroLLM RAG] Initializing vector database knowledge base...")
        ingest_all_documents(force_reindex=False)
        print("[AeroLLM RAG] Knowledge base ready!")
    except Exception as e:
        print(f"[AeroLLM RAG] Vector DB initialization warning: {e}")


@app.get("/", tags=["Root"])
def root():
    return {
        "status": "online",
        "service": "AeroLLM Aviation Maintenance Backend API with Real RAG",
        "version": "1.0.0",
        "docs": "/docs"
    }


# Register Routers under /api
app.include_router(health_router, prefix="/api")
app.include_router(maintenance_router, prefix="/api")
app.include_router(aircraft_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(faults_router, prefix="/api")
app.include_router(search_router, prefix="/api")
app.include_router(reports_router, prefix="/api")
app.include_router(rag_router, prefix="/api")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)