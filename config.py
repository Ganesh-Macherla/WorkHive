class Config:
    SECRET_KEY = "workhive-secret-key"

    SQLALCHEMY_DATABASE_URI = "sqlite:///workhive.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False