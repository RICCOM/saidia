from app.models import Transaction, TransactionType, TransactionStatus, Approval, db

class TransactionService:
    # @staticmethod
    # def create_transaction(principal_id, caregiver_id, tx_type, amount, metadata):
    #     tx = Transaction(
    #         principal_id=principal_id,
    #         caregiver_id=caregiver_id,
    #         type=TransactionType[tx_type],
    #         amount=amount,
    #         metadata=metadata or {}
    #     )
    #     db.session.add(tx)
    #     db.session.commit()
    #     return tx, "Transaction request created"
    @staticmethod
    def create_transaction(principal_id, caregiver_id, tx_type, amount, data=None):
        tx = Transaction(
            principal_id=principal_id,
            caregiver_id=caregiver_id,
            type=TransactionType[tx_type],
            amount=amount,
            data=data or {}          # Changed from metadata
        )
        db.session.add(tx)
        db.session.commit()
        return tx, "Transaction request created"