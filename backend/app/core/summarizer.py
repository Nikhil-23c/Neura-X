"""
Answer Delivery & Natural Language Summarizer.
Transforms structured SQL result rows and metadata into crisp, human-readable conversational answers.
"""

from typing import List, Dict, Any, Optional

class ResultSummarizer:
    @staticmethod
    def generate_summary(
        user_query: str,
        sql_query: str,
        columns: List[str],
        rows: List[Dict[str, Any]],
        intent: Optional[str] = None
    ) -> str:
        """
        Generates a clear natural language answer from the query results.
        """
        row_count = len(rows)
        if row_count == 0:
            return "No matching records were found in the database for your query."

        # Case 1: Single value aggregate (e.g. COUNT(*), AVG(cgpa), SUM(amount))
        if row_count == 1 and len(columns) == 1:
            col_name = columns[0]
            val = rows[0][col_name]
            clean_col = col_name.replace("_", " ").title()
            return f"The {clean_col} is **{val}**."

        # Case 2: Single row with multiple fields (e.g. details of a student or product)
        if row_count == 1:
            row = rows[0]
            name_key = next((k for k in ["name", "student_name", "dept_name", "category_name"] if k in row), None)
            if name_key:
                details = ", ".join([f"**{k.replace('_', ' ').title()}**: {v}" for k, v in row.items() if k != name_key])
                return f"Details for **{row[name_key]}**: {details}."
            else:
                details = ", ".join([f"**{k.replace('_', ' ').title()}**: {v}" for k, v in row.items()])
                return f"Result: {details}."

        # Case 3: Top N ranking (e.g., Top 5 students with highest CGPA)
        if ("top" in user_query.lower() or "highest" in user_query.lower() or "best" in user_query.lower() or intent == "Get Top Records") and ("name" in columns):
            metric_col = next((c for c in columns if c != "name" and c != "student_id"), columns[-1])
            metric_label = metric_col.replace("_", " ").upper()
            items = []
            for i, r in enumerate(rows, 1):
                name = r.get("name", "Unknown")
                score = r.get(metric_col, "")
                items.append(f"{i}. **{name}** ({score})")
            
            return f"Here are the top {row_count} records with the highest {metric_label}:\n\n" + "\n".join(items)

        # Case 4: Grouped Aggregations (e.g. students per department, sales by category)
        if len(columns) == 2 and any(isinstance(rows[0][columns[1]], (int, float)) for _ in [0]):
            label_col, num_col = columns[0], columns[1]
            num_label = num_col.replace("_", " ").title()
            summary_items = [f"• **{r[label_col]}**: {r[num_col]}" for r in rows[:7]]
            more = f"\n...and {row_count - 7} more" if row_count > 7 else ""
            return f"Breakdown of {num_label} across {label_col.replace('_', ' ')}:\n\n" + "\n".join(summary_items) + more

        # Case 5: General multi-row summary
        return f"Found **{row_count}** matching records for your query. The details are displayed in the table below."
