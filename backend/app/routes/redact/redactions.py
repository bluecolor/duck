from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
import app.models.orm as models
import app.models.schemas.redact as s
import app.models.schemas.metadata as ms
from app.oracle.queries import redaction_columns
from .base import router
from app.database import get_db
from app.oracle import redact
import pydash


@router.post(
    "/connections/{conn_id}/redact/ask/columns",
    response_model=List[s.ColumnAnswerOut],
)
def ask_columns(
    conn_id: int, columns: List[ms.ColumnIn], db: Session = Depends(get_db),
):
    connection = db.query(models.Connection).get(conn_id)
    expressions = redact.get_expressions_in_columns(connection, columns)
    red_columns = redact.get_columns_in_columns(connection, columns)
    answers: List[s.ColumnAnswerOut] = []

    for c in columns:
        answer: s.ColumnAnswerOut = s.ColumnAnswerOut(
            owner=c.owner, table_name=c.table_name, column_name=c.column_name
        )
        answer.column = pydash.find(
            red_columns,
            lambda x: x.object_owner == c.owner
            and x.object_name == c.table_name
            and x.column_name == c.column_name,
        )
        answer.expression = pydash.find(
            expressions,
            lambda x: x.object_owner == c.owner
            and x.object_name == c.table_name
            and x.column_name == c.column_name,
        )
        answers.append(answer)

    return answers


@router.get(
    "/connections/{conn_id}/redact/ask/info", response_model=dict,  # todo
)
def ask_redaction_info(
    conn_id: int,
    schema_name: str,
    table_name: str,
    column_name: Optional[str] = None,
    db: Session = Depends(get_db),
):
    connection = db.query(models.Connection).get(conn_id)
    expressions = redact.get_expressions(
        connection, schema_name, table_name, column_name
    )
    redaction_columns = redact.get_expressions(
        connection, schema_name, table_name, column_name
    )
    policies = redact.get_policies(connection, schema_name, table_name)

    return {
        "expressions": expressions,
        "redaction_columns": redaction_columns,
        "policies": policies,
    }