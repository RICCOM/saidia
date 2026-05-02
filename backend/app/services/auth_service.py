from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User, UserRole, db
from flask_jwt_extended import create_access_token

class AuthService:
    @staticmethod
    def register(phone_number, password, role, full_name=None, ncpwd_card_number=None):
        if User.query.filter_by(phone_number=phone_number).first():
            return None, "Phone number already registered"

        user = User(
            phone_number=phone_number,
            role=UserRole[role.upper()],
            full_name=full_name,
            ncpwd_card_number=ncpwd_card_number if role.upper() == "PRINCIPAL" else None
        )
        
        user.pin_hash = generate_password_hash(password)
        db.session.add(user)
        db.session.commit()

        return user, "User registered successfully"

    @staticmethod
    def login(phone_number, password):
        user = User.query.filter_by(phone_number=phone_number).first()
        if not user or not check_password_hash(user.pin_hash, password):
            return None, "Invalid credentials"

        access_token = create_access_token(identity=user.id)
        return {"user": user, "token": access_token}, "Login successful"