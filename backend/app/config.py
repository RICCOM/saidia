import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-saidia-2026')
    
    # PostgreSQL configuration
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 
        'postgresql://postgres:password@localhost:5432/saidia_db'
    )
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-dev-secret-saidia-2026')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
    DEFAULT_LANGUAGE = 'sw'