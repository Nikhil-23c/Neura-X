"""
SQL Query Validator & Security Sandbox
Ensures queries are strictly read-only, protects against SQL injection,
prevents destructive DDL/DML statements, and enforces limits.
"""

import re
import sqlparse
from typing import Tuple, Optional

# Forbidden DDL/DML and administrative SQL commands
FORBIDDEN_KEYWORDS = {
    "DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE",
    "CREATE", "REPLACE", "EXEC", "EXECUTE", "GRANT", "REVOKE",
    "ATTACH", "DETACH", "VACUUM", "PRAGMA", "REINDEX", "FLUSH",
    "SHUTDOWN", "LOCK", "UNLOCK", "KILL", "CALL", "INTO", "MERGE"
}

ALLOWED_START_KEYWORDS = {"SELECT", "WITH", "EXPLAIN"}

class QueryValidationError(Exception):
    """Raised when a SQL query violates security or syntax rules."""
    pass

class QueryValidator:
    @staticmethod
    def sanitize_and_validate(raw_sql: str, default_limit: int = 100) -> Tuple[bool, str, Optional[str]]:
        """
        Validates and sanitizes a SQL query.
        Returns:
            (is_valid: bool, sanitized_sql: str, error_message: Optional[str])
        """
        if not raw_sql or not raw_sql.strip():
            return False, "", "Empty SQL query provided."

        # Remove markdown code blocks if present
        clean_sql = raw_sql.strip()
        clean_sql = re.sub(r"^```(?:sql)?\s*", "", clean_sql, flags=re.IGNORECASE)
        clean_sql = re.sub(r"\s*```$", "", clean_sql)
        clean_sql = clean_sql.strip()

        # Parse statements using sqlparse
        parsed = sqlparse.parse(clean_sql)
        if not parsed:
            return False, "", "Could not parse SQL query."

        # Reject multiple statements (prevent SQL injection chaining)
        valid_statements = [stmt for stmt in parsed if str(stmt).strip() and str(stmt).strip() != ';']
        if len(valid_statements) > 1:
            return False, "", "Security Violation: Multiple SQL statements are not permitted in a single query."

        statement = valid_statements[0]
        stmt_str = str(statement).strip().rstrip(';')

        # Check the first significant token
        first_token = statement.get_type().upper()
        tokens = [t.value.upper() for t in statement.flatten() if not t.is_whitespace and t.value not in (',', ';', '(', ')')]
        
        if not tokens:
            return False, "", "Invalid SQL query: No tokens found."

        first_word = tokens[0]
        if first_word not in ALLOWED_START_KEYWORDS and first_token not in ALLOWED_START_KEYWORDS:
            return False, "", f"Security Violation: Only read-only queries (SELECT) are permitted. Received command starting with '{first_word}'."

        # Check for forbidden keywords anywhere in the query
        for token in tokens:
            if token in FORBIDDEN_KEYWORDS:
                return False, "", f"Security Violation: Destructive or unauthorized keyword '{token}' detected. Only read-only operations are allowed."

        # Check for INTO keyword in SELECT INTO pattern
        if "INTO" in tokens:
            return False, "", "Security Violation: 'SELECT INTO' table creation is not permitted."

        # Ensure a reasonable LIMIT exists if not an aggregate or already limited
        has_limit = any(t == "LIMIT" for t in tokens)
        has_aggregate = any(t in {"COUNT", "SUM", "AVG", "MIN", "MAX"} for t in tokens)
        
        final_sql = stmt_str
        if not has_limit and not (has_aggregate and "GROUP" not in tokens):
            final_sql = f"{final_sql} LIMIT {default_limit}"

        return True, final_sql, None
