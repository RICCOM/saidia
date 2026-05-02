from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, String, Numeric
from sqlalchemy.orm import relationship
from app.extensions import db


class Approval(db.Model):
    __tablename__ = 'approvals'

    id = Column(Integer, primary_key=True, autoincrement=True)
    transaction_id = Column(Integer, ForeignKey('transactions.id'), nullable=False, index=True)
    
    approved = Column(Boolean, nullable=False)
    method = Column(String(20), default='voice')          # voice, manual, ussd
    voice_confidence = Column(Numeric(5, 4), nullable=True)  # Future STT confidence score
    
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow)

    transaction = relationship('Transaction', back_populates='approvals')

    def __repr__(self):
        return f"<Approval Tx:{self.transaction_id} - {'Approved' if self.approved else 'Rejected'}>"