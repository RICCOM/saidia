from flask import Flask
from .extensions import db, migrate, jwt, cors
from .config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints (only if they exist - we'll create them soon)
    try:
        from .routes.auth import auth_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
    except ImportError:
        pass  # Will register later when routes are created

    try:
        from .routes.caregiver import caregiver_bp
        app.register_blueprint(caregiver_bp, url_prefix='/api/caregivers')
    except ImportError:
        pass

    try:
        from .routes.transaction import transaction_bp
        app.register_blueprint(transaction_bp, url_prefix='/api/transactions')
    except ImportError:
        pass

    return app