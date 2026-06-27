class Config:
    SECRET_KEY = "workhive-secret-key"

    JWT_SECRET_KEY = "workhive-jwt-secret"

    SQLALCHEMY_DATABASE_URI = "sqlite:///workhive.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False