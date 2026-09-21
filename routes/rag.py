from fastapi import APIRouter, HTTPException, Query, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional

from services.rag_pipeline import (
    query_rag_pipeline,
    debug_rag_pipeline,
    ingest_all_documents
)

router = APIRouter(prefix="/rag", tags=["RAG Pipeline"])


class RAGQueryRequest(BaseModel):
    query: str


@router.post("/query")
def query_rag(request: RAGQueryRequest):
    """
    RAG Query Endpoint:
    Converts query into embedding, searches vector database, retrieves top document chunks,
    and returns structured maintenance recommendations with source citations.
    """
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty.")
    
    try:
        return query_rag_pipeline(request.query.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG Retrieval Error: {str(e)}")


@router.get("/debug")
def debug_rag(query: str = Query(..., description="Aviation maintenance query to debug retrieval")):
    """
    RAG Debug Endpoint:
    Inspect exact retrieved chunks, similarity distance scores, source PDF/pages, and final RAG response.
    """
    if not query or not query.strip():
        raise HTTPException(status_code=400, detail="Query parameter is required.")
    
    try:
        return debug_rag_pipeline(query.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG Debug Error: {str(e)}")


@router.post("/reindex")
def reindex_documents(background_tasks: BackgroundTasks):
    """
    RAG Ingestion / Re-index Endpoint:
    Triggers re-indexing of all manuals in project root and data/raw directory.
    """
    try:
        result = ingest_all_documents(force_reindex=True)
        return {
            "success": True,
            "details": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document indexing failed: {str(e)}")
