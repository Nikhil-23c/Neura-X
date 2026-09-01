"""
Chart and Visualization Engine.
Automatically recommends and generates Chart.js visualization configurations
based on the shape, types, and semantics of the SQL query results.
"""

from typing import List, Dict, Any, Optional

CHART_COLORS = [
    "rgba(59, 130, 246, 0.8)",   # Blue
    "rgba(16, 185, 129, 0.8)",   # Emerald
    "rgba(245, 158, 11, 0.8)",   # Amber
    "rgba(239, 68, 68, 0.8)",    # Red
    "rgba(139, 92, 246, 0.8)",   # Purple
    "rgba(236, 72, 153, 0.8)",   # Pink
    "rgba(6, 182, 212, 0.8)",    # Cyan
    "rgba(249, 115, 22, 0.8)"    # Orange
]

BORDER_COLORS = [
    "rgb(59, 130, 246)",
    "rgb(16, 185, 129)",
    "rgb(245, 158, 11)",
    "rgb(239, 68, 68)",
    "rgb(139, 92, 246)",
    "rgb(236, 72, 153)",
    "rgb(6, 182, 212)",
    "rgb(249, 115, 22)"
]

class ChartDetector:
    @staticmethod
    def detect_and_build_chart(
        columns: List[str],
        rows: List[Dict[str, Any]],
        intent: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Analyzes the result set and generates a chart specification if suitable.
        Returns None if data is not chart-compatible (e.g., empty or purely text).
        """
        if not rows or len(rows) < 2 or len(columns) < 2:
            return None

        # Identify numeric and categorical columns
        numeric_cols = []
        categorical_cols = []

        first_row = rows[0]
        for col in columns:
            val = first_row.get(col)
            if isinstance(val, (int, float)) and not str(col).endswith("_id") and str(col) != "id":
                numeric_cols.append(col)
            elif isinstance(val, str) or str(col).endswith("_id"):
                categorical_cols.append(col)

        if not numeric_cols or not categorical_cols:
            return None

        # Choose the best label and value column
        label_col = categorical_cols[0]
        value_col = numeric_cols[0]

        # Extract labels and values (limit to max 15 points for clarity)
        chart_rows = rows[:15]
        labels = [str(r.get(label_col, f"Item {i+1}")) for i, r in enumerate(chart_rows)]
        data_points = [r.get(value_col, 0) for r in chart_rows]

        # Determine Chart Type
        chart_type = "bar"
        is_pie_candidate = (
            len(chart_rows) <= 8 and
            any(k in label_col.lower() for k in ["dept", "category", "tier", "status", "group", "gender", "type"])
        )
        is_line_candidate = any(k in label_col.lower() for k in ["date", "month", "year", "time", "day", "semester"])

        if is_line_candidate:
            chart_type = "line"
        elif is_pie_candidate:
            chart_type = "doughnut"
        else:
            chart_type = "bar"

        # Prepare colors
        if chart_type in ["pie", "doughnut", "bar"]:
            bg_colors = [CHART_COLORS[i % len(CHART_COLORS)] for i in range(len(labels))]
            border_colors = [BORDER_COLORS[i % len(BORDER_COLORS)] for i in range(len(labels))]
        else:
            bg_colors = "rgba(59, 130, 246, 0.2)"
            border_colors = "rgb(59, 130, 246)"

        clean_value_name = value_col.replace("_", " ").title()

        return {
            "type": chart_type,
            "title": f"{clean_value_name} by {label_col.replace('_', ' ').title()}",
            "data": {
                "labels": labels,
                "datasets": [{
                    "label": clean_value_name,
                    "data": data_points,
                    "backgroundColor": bg_colors,
                    "borderColor": border_colors,
                    "borderWidth": 1.5,
                    "fill": chart_type == "line"
                }]
            },
            "options": {
                "responsive": True,
                "maintainAspectRatio": False,
                "plugins": {
                    "legend": {
                        "display": chart_type in ["pie", "doughnut"],
                        "labels": {"color": "#94a3b8"}
                    }
                },
                "scales": {} if chart_type in ["pie", "doughnut"] else {
                    "x": {"ticks": {"color": "#94a3b8"}, "grid": {"color": "#334155"}},
                    "y": {"ticks": {"color": "#94a3b8"}, "grid": {"color": "#334155"}}
                }
            }
        }
