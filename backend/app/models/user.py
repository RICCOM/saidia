from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from app.extensions import db


class UserRole(PyEnum):
    PRINCIPAL = "PRINCIPAL"      # Visually impaired / elderly user who owns the money
    CAREGIVER = "CAREGIVER"      # Trusted helper


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    phone_number = Column(String(15), unique=True, nullable=False, index=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.PRINCIPAL)
    
    # Hashed PIN (only Principals use this for independent mode)
    pin_hash = Column(String(255), nullable=True)
    
    # NCPWD Disability Registration / Priority Card Number
    # This is key for verifying visually impaired users and potential future integrations
    ncpwd_card_number = Column(String(50), nullable=True, index=True)
    
    is_verified = Column(Boolean, default=False)
    full_name = Column(String(100), nullable=True)          # Used for voice personalization
    preferred_language = Column(String(10), default='sw')   # 'sw' for Swahili, 'en' for English
    
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    relationships_as_principal = relationship(
        'CaregiverRelationship',
        foreign_keys='CaregiverRelationship.principal_id',
        back_populates='principal',
        cascade="all, delete-orphan"
    )
    
    relationships_as_caregiver = relationship(
        'CaregiverRelationship',
        foreign_keys='CaregiverRelationship.caregiver_id',
        back_populates='caregiver'
    )

    def __repr__(self):
        return f"<User {self.phone_number} ({self.role.value})>"