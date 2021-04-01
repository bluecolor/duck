from typing import Optional, Union
from pydantic import BaseModel
from sqlalchemy.sql.expression import column


class Table(BaseModel):
    owner: str
    table_name: str


class DataStore(Table):
    type: Optional[str]


class Column(Table):
    column_name: str
    data_type: str


class ColumnIn(Table):
    column_name: str


class ColumnInOut(Table):
    column_name: str


class ObjectOwner(BaseModel):
    name: str


class SchemaOut(BaseModel):
    name: str


class SearchOut(BaseModel):
    type: str
    owner: str
    table_name: str
    column_name: Optional[str]
