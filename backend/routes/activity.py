from flask import Blueprint
from models.user import User

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.activity import Activity
from models.hive_member import HiveMember
from models.hive import Hive

activity_bp = Blueprint(
    "activity",
    __name__
)


@activity_bp.route(
    "/hives/<int:hive_id>/activities",
    methods=["GET"]
)
@jwt_required()
def get_activities(hive_id):

    current_user_id = int(
        get_jwt_identity()
    )

    membership = HiveMember.query.filter_by(
        hive_id=hive_id,
        user_id=current_user_id
    ).first()

    if not membership:
        return {
            "error": "Not authorized"
        }, 403

    activities = Activity.query.filter_by(
        hive_id=hive_id
    ).order_by(
        Activity.created_at.desc()
    ).all()

    result = []

    for activity in activities:

        hive = None

        if activity.hive_id:
            hive = Hive.query.get(
                activity.hive_id
            )

        result.append({
            "id": activity.id,
            "action": activity.action,
            "hive_id": activity.hive_id,
            "hive_name": (
                hive.name
                if hive
                else None
            ),
            "created_at": (
                activity.created_at.isoformat()
            )
        })
    return result, 200


@activity_bp.route(
    "/users/<int:user_id>/activities",
    methods=["GET"]
)
@jwt_required()
def get_user_activities(user_id):

    user = User.query.get(user_id)

    if not user:
        return {
            "error": "User not found"
        }, 404

    activities = Activity.query.filter_by(
        user_id=user_id
    ).order_by(
        Activity.created_at.desc()
    ).limit(5).all()

    result = []

    for activity in activities:

        hive = None

        if activity.hive_id:
            hive = Hive.query.get(
                activity.hive_id
            )

        result.append({
            "id": activity.id,
            "action": activity.action,
            "hive_id": activity.hive_id,
            "hive_name": (
                hive.name
                if hive
                else None
            ),
            "created_at": (
                activity.created_at.isoformat()
            )
        })

    return result, 200