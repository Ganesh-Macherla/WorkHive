from flask import Blueprint, request

from models.user import User
from extensions import db

from werkzeug.security import generate_password_hash

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {
            "error": "All fields are required"
        }, 400

    existing_email = User.query.filter_by(email=email).first()

    if existing_email:
        return {
            "error": "Email already registered"
        }, 409

    existing_username = User.query.filter_by(username=username).first()

    if existing_username:
        return {
            "error": "Username already taken"
        }, 409

    hashed_password = generate_password_hash(password)

    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return {
        "message": "User registered successfully"
    }, 201