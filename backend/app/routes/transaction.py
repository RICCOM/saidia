from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.transaction_service import TransactionService
from app.models import TransactionType

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/', methods=['POST'])
@jwt_required()
def create_transaction():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    tx, message = TransactionService.create_transaction(
        principal_id=user_id,
        caregiver_id=data.get('caregiver_id'),
        tx_type=data.get('type'),
        amount=data.get('amount'),
        data=data.get('data')          # Changed from metadata
    )
    
    if tx:
        return jsonify({
            "message": message,
            "transaction_id": tx.id,
            "status": tx.status.value
        }), 201
    return jsonify({"error": message}), 400