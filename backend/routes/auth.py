from flask import Blueprint, request

from models.user import User
from extensions import db

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

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

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "error": "Email and password are required"
        }, 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return {
            "error": "Invalid credentials"
        }, 401

    if not check_password_hash(
        user.password_hash,
        password
    ):
        return {
            "error": "Invalid credentials"
        }, 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return {
        "access_token": access_token
    }, 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():

    current_user_id = get_jwt_identity()

    return {
        "user_id": current_user_id
    }, 200