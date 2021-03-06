
from sqlalchemy.orm import relationship
from sqlalchemy import (
    func,
    BigInteger,
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    DateTime,
    Text,
    Table
)

from .base import Base, plan_rules


class Plan(Base):
    __tablename__ = "plans"
    __table_args__ = {"extend_existing": True}

    name = Column(String(255), unique=True)
    rules = relationship("Rule",secondary=plan_rules, back_populates="plans")
    schemas = Column(Text)

    sample_size = Column(Integer, default=5000)
    worker_count = Column(Integer, default=1)

    connection_id = Column(Integer, ForeignKey("connections.id"))
    connection= relationship("Connection", back_populates="plans")

    plan_runs = relationship("PlanRun", back_populates="plan")



    def __init__(self, **kw):
        super().__init__(**kw)

