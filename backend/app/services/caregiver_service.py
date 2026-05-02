from app.models import User, CaregiverRelationship, db

class CaregiverService:
    @staticmethod
    def add_caregiver(principal_id, caregiver_phone, permissions=None):
        principal = User.query.get(principal_id)
        caregiver = User.query.filter_by(phone_number=caregiver_phone).first()

        if not principal or not caregiver:
            return None, "User not found"
        if principal.role != 'PRINCIPAL':
            return None, "Only principals can add caregivers"

        relationship = CaregiverRelationship(
            principal_id=principal.id,
            caregiver_id=caregiver.id,
            permissions=permissions or {"max_amount": 10000, "daily_limit": 30000}
        )
        db.session.add(relationship)
        db.session.commit()
        return relationship, "Caregiver added successfully"