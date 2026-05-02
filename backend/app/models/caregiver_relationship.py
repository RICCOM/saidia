from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, JSON
from sqlalchemy.orm import relationship
from app.extensions import db


class CaregiverRelationship(db.Model):
    __tablename__ = 'caregiver_relationships'

    id = Column(Integer, primary_key=True, autoincrement=True)
    
    principal_id = Column(Integer, ForeignKey('users.id'), nullable=False, index=True)
    caregiver_id = Column(Integer, ForeignKey('users.id'), nullable=False, index=True)
    
    # Flexible permissions: e.g. {"max_single_amount": 10000, "daily_limit": 30000, 
    # "allowed_types": ["SEND_MONEY", "BUY_AIRTIME", "PAYBILL"]}
    permissions = Column(JSON, nullable=False, default=dict)
    
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    principal = relationship('User', foreign_keys=[principal_id], back_populates='relationships_as_principal')
    caregiver = relationship('User', foreign_keys=[caregiver_id], back_populates='relationships_as_caregiver')

    def __repr__(self):
        return f"<Saidia Relationship Principal:{self.principal_id} → Caregiver:{self.caregiver_id}>"