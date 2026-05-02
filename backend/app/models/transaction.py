from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, ForeignKey, String, Numeric, DateTime, Enum, JSON
from sqlalchemy.orm import relationship
from app.extensions import db


class TransactionType(PyEnum):
    SEND_MONEY = "SEND_MONEY"
    BUY_AIRTIME = "BUY_AIRTIME"
    PAYBILL = "PAYBILL"


class TransactionStatus(PyEnum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    EXECUTED = "EXECUTED"
    FAILED = "FAILED"


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    
    principal_id = Column(Integer, ForeignKey('users.id'), nullable=False, index=True)
    caregiver_id = Column(Integer, ForeignKey('users.id'), nullable=True, index=True)
    
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    
    # CHANGED: 'metadata' → 'data'
    data = Column(JSON, nullable=False, default=dict)   # <-- Fixed here
    
    status = Column(Enum(TransactionStatus), default=TransactionStatus.PENDING)
    
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    principal = relationship('User', foreign_keys=[principal_id])
    caregiver = relationship('User', foreign_keys=[caregiver_id])

    approvals = relationship('Approval', back_populates='transaction', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Saidia Transaction {self.id} - {self.type.value} ({self.status.value})>"