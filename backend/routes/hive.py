from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.hive import Hive
from models.hive_member import HiveMember
from models.user import User
from models.task import Task
from models.activity import Activity


from extensions import db

import random
import string
from activity_logger import log_activity

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

    user = User.query.get(
        current_user_id
    )

    log_activity(
        new_hive.id,
        current_user_id,
        f"{user.username} created the hive"
    )

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
    user = User.query.get(
        current_user_id
    )

    log_activity(
        hive.id,
        current_user_id,
        f"{user.username} joined the hive"
    )

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
    print(result)

@hive_bp.route("/hives/<int:hive_id>", methods=["GET"])
@jwt_required()
def get_hive(hive_id):

    hive = Hive.query.get(hive_id)

    if not hive:
        return {
            "error": "Hive not found"
        }, 404

    return {
        "id": hive.id,
        "name": hive.name,
        "room_code": hive.room_code,
        "owner_id": hive.owner_id
    }, 200

@hive_bp.route("/hives/<int:hive_id>/members", methods=["GET"])
@jwt_required()
def get_hive_members(hive_id):

    memberships = HiveMember.query.filter_by(
        hive_id=hive_id
    ).all()

    members = []

    for membership in memberships:

        user = User.query.get(
            membership.user_id
        )

        if user:
            members.append({
                "id": user.id,
                "username": user.username,
                "role": membership.role
            })

    return members, 200

@hive_bp.route(
    "/hives/<int:hive_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_hive(hive_id):

    current_user_id = int(
        get_jwt_identity()
    )

    hive = Hive.query.get(
        hive_id
    )

    if not hive:

        return {
            "error": "Hive not found"
        }, 404

    if hive.owner_id != current_user_id:

        return {
            "error": "Only the owner can delete this hive"
        }, 403

    Task.query.filter_by(
        hive_id=hive_id
    ).delete()

    Activity.query.filter_by(
        hive_id=hive_id
    ).delete()

    HiveMember.query.filter_by(
        hive_id=hive_id
    ).delete()

    db.session.delete(
        hive
    )

    db.session.commit()

    return {
        "message": "Hive deleted successfully"
    }, 200

@hive_bp.route(
    "/hives/<int:hive_id>/leave",
    methods=["POST"]
)
@jwt_required()
def leave_hive(hive_id):

    current_user_id = int(
        get_jwt_identity()
    )

    hive = Hive.query.get(
        hive_id
    )

    if not hive:

        return {
            "error": "Hive not found"
        }, 404

    membership = HiveMember.query.filter_by(
        hive_id=hive_id,
        user_id=current_user_id
    ).first()

    if not membership:

        return {
            "error": "You are not a member"
        }, 404

    if hive.owner_id == current_user_id:

        member_count = HiveMember.query.filter_by(hive_id=hive_id).count()

        if member_count > 1:
            return {
                "error":
                "Transfer ownership or delete the hive first"
            }, 403

        return {
            "error":
            "Delete the hive instead"
        }, 403

    db.session.delete(
        membership
    )

    db.session.commit()

    return {
        "message": "Left hive successfully"
    }, 200