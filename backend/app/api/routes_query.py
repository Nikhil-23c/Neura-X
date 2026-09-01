"""
Query Orchestration Router.
Translates Natural Language to SQL, applies security validation, executes against the DB,
synthesizes conversational answers, and recommends visualizations.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.core.nl_to_sql import NLToSQLEngine
from app.core.query_validator import QueryValidator
from app.core.database_manager import db_manager
from app.core.summarizer import ResultSummarizer
from app.core.chart_detector import ChartDetector
from app.api.routes_history import record_audit_log
from app.config import settings

router = APIRouter(prefix="/api/query", tags=["query"])

class QueryRequest(BaseModel):
    question: str
    database_id: Optional[str] = None
    provider: Optional[str] = None
    api_key: Optional[str] = None
    model_name: Optional[str] = None
    custom_sql: Optional[str] = None  # If user wants to execute raw SQL directly

class QueryResponse(BaseModel):
    question: str
    database_id: str
    intent: Optional[str] = None
    entities: Optional[List[str]] = None
    sort_by: Optional[str] = None
    generated_sql: str
    sanitized_sql: str
    is_safe: bool
    columns: List[str]
    rows: List[Dict[str, Any]]
    row_count: int
    execution_time_ms: float
    natural_answer: str
    chart: Optional[Dict[str, Any]] = None
    provider_used: str

@router.post("", response_model=QueryResponse)
async def process_question(req: QueryRequest):
    """
    Main Question-Answering Pipeline:
    Natural Language -> Understanding -> SQL Generation -> Safety Validation -> Execution -> Conversational Answer + Chart.
    """
    if not req.question.strip() and not req.custom_sql:
        raise HTTPException(status_code=400, detail="Please provide a valid question or SQL query.")

    db_id = req.database_id or settings.default_database_id

    try:
        # Step 1 & 2: Natural Language Understanding & SQL Generation
        if req.custom_sql:
            generated_sql = req.custom_sql.strip()
            intent = "Manual SQL Query"
            entities = ["Custom"]
            sort_by = None
            provider_used = "direct_sql"
        else:
            nl_result = await NLToSQLEngine.generate_sql(
                user_query=req.question,
                database_id=db_id,
                provider=req.provider,
                api_key=req.api_key,
                model_name=req.model_name
            )
            generated_sql = nl_result.get("sql", "").strip()
            intent = nl_result.get("intent", "Data Retrieval")
            entities = nl_result.get("entities", [])
            sort_by = nl_result.get("sort_by")
            provider_used = nl_result.get("provider_used", "ai_engine")

        # Step 3: Query Validation & Security Guardrails
        is_safe, sanitized_sql, error_msg = QueryValidator.sanitize_and_validate(
            generated_sql,
            default_limit=settings.max_query_rows
        )

        if not is_safe:
            # Record security violation in audit log
            record_audit_log(
                question=req.question,
                database_id=db_id,
                sql=generated_sql,
                status="BLOCKED_SECURITY",
                row_count=0,
                execution_time_ms=0.0,
                provider=provider_used,
                error=error_msg
            )
            raise HTTPException(status_code=403, detail=f"Query Blocked by Security Guardrail: {error_msg}")

        # Step 4: Query Execution & Data Retrieval
        exec_res = db_manager.execute_query(db_id, sanitized_sql)
        columns = exec_res["columns"]
        rows = exec_res["rows"]
        row_count = exec_res["row_count"]
        exec_time = exec_res["execution_time_ms"]

        # Step 5: Conversational Synthesis & Chart Recommendation
        natural_answer = ResultSummarizer.generate_summary(
            user_query=req.question,
            sql_query=sanitized_sql,
            columns=columns,
            rows=rows,
            intent=intent
        )

        chart_spec = ChartDetector.detect_and_build_chart(
            columns=columns,
            rows=rows,
            intent=intent
        )

        # Step 6: Record in Audit Log
        record_audit_log(
            question=req.question,
            database_id=db_id,
            sql=sanitized_sql,
            status="SUCCESS",
            row_count=row_count,
            execution_time_ms=exec_time,
            provider=provider_used
        )

        return QueryResponse(
            question=req.question,
            database_id=db_id,
            intent=intent,
            entities=entities,
            sort_by=sort_by,
            generated_sql=generated_sql,
            sanitized_sql=sanitized_sql,
            is_safe=True,
            columns=columns,
            rows=rows,
            row_count=row_count,
            execution_time_ms=exec_time,
            natural_answer=natural_answer,
            chart=chart_spec,
            provider_used=provider_used
        )

    except HTTPException:
        raise
    except Exception as e:
        record_audit_log(
            question=req.question,
            database_id=db_id,
            sql=generated_sql if 'generated_sql' in locals() else "",
            status="ERROR",
            row_count=0,
            execution_time_ms=0.0,
            provider=provider_used if 'provider_used' in locals() else "unknown",
            error=str(e)
        )
        raise HTTPException(status_code=500, detail=f"Database execution error: {str(e)}")
