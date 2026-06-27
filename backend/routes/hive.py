from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.hive import Hive
from models.hive_member import HiveMember

from extensions import db

import random
import string


hive_bp = Blueprint("hive", __name__)

# amogus time
def generate_room_code():

    return "".join(
        random.choices(
            string.ascii_uppercase + string.digits,
            k=6
        )
    )

@hive_bp.route("/hives", methods=["POST"])
@jwt_required()
def create_hive():

    data = request.get_json()

    name = data.get("name")

    if not name:
        return {
            "error": "Hive name is required"
        }, 400

    room_code = generate_room_code()

    current_user_id = get_jwt_identity()

    new_hive = Hive(
        name=name,
        room_code=room_code,
        owner_id=int(current_user_id)
    )

    db.session.add(new_hive)
    db.session.commit()

    hive_member = HiveMember(
        hive_id=new_hive.id,
        user_id=int(current_user_id),
        role="owner"
    )

    db.session.add(hive_member)
    db.session.commit()

    return {
        "id": new_hive.id,
        "name": new_hive.name,
        "room_code": new_hive.room_code
    }, 201

@hive_bp.route("/hives/join", methods=["POST"])
@jwt_required()
def join_hive():

    data = request.get_json()

    room_code = data.get("room_code")

    if not room_code:
        return {
            "error": "Room code is required"
        }, 400

    hive = Hive.query.filter_by(
        room_code=room_code
    ).first()

    if not hive:
        return {
            "error": "Hive not found"
        }, 404

    current_user_id = int(
        get_jwt_identity()
    )

    existing_member = HiveMember.query.filter_by(
        hive_id=hive.id,
        user_id=current_user_id
    ).first()

    if existing_member:
        return {
            "error": "Already a member of this hive"
        }, 409

    new_member = HiveMember(
        hive_id=hive.id,
        user_id=current_user_id,
        role="member"
    )

    db.session.add(new_member)
    db.session.commit()

    return {
        "message": "Joined hive successfully",
        "hive_id": hive.id,
        "hive_name": hive.name
    }, 200

@hive_bp.route("/hives", methods=["GET"])
@jwt_required()
def get_hives():

    current_user_id = int(
        get_jwt_identity()
    )

    memberships = HiveMember.query.filter_by(
        user_id=current_user_id
    ).all()

    hives = []

    for membership in memberships:

        hive = Hive.query.get(
            membership.hive_id
        )

        hives.append({
            "id": hive.id,
            "name": hive.name,
            "room_code": hive.room_code
        })

    return hives, 200