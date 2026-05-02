from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.caregiver_service import CaregiverService

caregiver_bp = Blueprint('caregiver', __name__)

@caregiver_bp.route('/add', methods=['POST'])
@jwt_required()
def add_caregiver():
    principal_id = get_jwt_identity()
    data = request.get_json()
    
    relationship, message = CaregiverService.add_caregiver(
        principal_id=principal_id,
        caregiver_phone=data.get('caregiver_phone'),
        permissions=data.get('permissions')
    )
    
    if relationship:
        return jsonify({"message": message}), 201
    return jsonify({"error": message}), 400