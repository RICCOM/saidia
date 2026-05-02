from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Text
from app.extensions import db


class AuditLog(db.Model):
    __tablename__ = 'audit_logs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, index=True)
    
    action = Column(String(100), nullable=False)   # e.g. "CREATE_TRANSACTION", "APPROVE_TRANSACTION", "ADD_CAREGIVER"
    description = Column(Text, nullable=False)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(255), nullable=True)
    
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow)

    def __repr__(self):
        return f"<AuditLog {self.action} by user {self.user_id}>"