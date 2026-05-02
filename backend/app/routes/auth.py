from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user, message = AuthService.register(
        phone_number=data.get('phone_number'),
        password=data.get('password'),
        role=data.get('role'),  # "PRINCIPAL" or "CAREGIVER"
        full_name=data.get('full_name'),
        ncpwd_card_number=data.get('ncpwd_card_number')
    )
    
    if user:
        return jsonify({"message": message, "user_id": user.id}), 201
    return jsonify({"error": message}), 400


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result, message = AuthService.login(
        data.get('phone_number'),
        data.get('password')
    )
    
    if result:
        return jsonify({
            "message": message,
            "token": result["token"],
            "user": {
                "id": result["user"].id,
                "phone_number": result["user"].phone_number,
                "role": result["user"].role.value,
                "full_name": result["user"].full_name
            }
        }), 200
    return jsonify({"error": message}), 401