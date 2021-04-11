from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
import app.models.orm as models
import app.models.schemas.mssql as s
from .base import router
from app.database import get_db
from app.vendors.mssql import SqlServer


@router.get(
    "/connections/{conn_id}/mssql/masks/columns",
    response_model=List[s.MaskedColumn],
)
def get_masked_columns(
    conn_id: int,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
    db: Session = Depends(get_db),
) -> List[s.MaskedColumn]:
    conn = db.query(models.Connection).get(conn_id)
    mssql: SqlServer = conn.get_vendor()
    return mssql.get_masked_columns(schema_name, table_name)


@router.post(
    "/connections/{conn_id}/mssql/masks/columns", response_model=bool,
)
def add_mask(
    conn_id: int, mask: s.MaskIn, db: Session = Depends(get_db),
) -> bool:
    conn = db.query(models.Connection).get(conn_id)
    mssql: SqlServer = conn.get_vendor()
    return mssql.add_mask(mask)


@router.get(
    "/mssql/masks/functions", response_model=List[s.MaskingFunction],
)
def get_masking_functions() -> List[s.MaskedColumn]:
    return SqlServer.masking_functions()