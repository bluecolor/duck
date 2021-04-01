from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
import app.models.orm as models
from app.models.orm.connection import Connection
import app.models.schemas as schemas
from .base import router
from app.database import get_db
from app.oracle import metadata as md


@router.get(
    "/connections/{conn_id}/metadata/tables",
    response_model=List[schemas.Table],
)
def get_tables(
    conn_id: int, owner: Optional[str], db: Session = Depends(get_db)
):
    conn = db.query(models.Connection).get(conn_id)
    return md.get_all_tables(connection=conn, owner=owner)


@router.get(
    "/connections/{conn_id}/metadata/object_owners",
    response_model=List[schemas.ObjectOwner],
)
def get_object_owners(conn_id: int, db: Session = Depends(get_db)):
    conn = db.query(models.Connection).get(conn_id)
    return md.get_object_owners(connection=conn)


@router.get(
    "/connections/{conn_id}/metadata/columns",
    response_model=List[schemas.Column],
)
def get_columns(
    conn_id: int,
    owner: Optional[str] = None,
    table_name: Optional[str] = None,
    db: Session = Depends(get_db),
):
    connection = db.query(models.Connection).get(conn_id)
    return md.get_all_tab_cols(connection, owner, table_name)


@router.get(
    "/connections/{conn_id}/metadata/search",
    response_model=List[schemas.SearchOut],
)
def search(
    conn_id: int, q: str, db: Session = Depends(get_db),
):
    connection = db.query(models.Connection).get(conn_id)
    return md.search(connection, q)[0:10]


@router.get(
    "/connections/{conn_id}/metadata/columns/sample",
    response_model=List[dict],
)
def get_col_sample_data(
    conn_id: int,
    schema_name: str,
    table_name: str,
    column_name: str,
    db: Session = Depends(get_db),
):
    connection = db.query(models.Connection).get(conn_id)
    return md.get_col_sample_data(
        connection, schema_name, table_name, column_name
    )
