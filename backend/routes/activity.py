from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.activity import Activity
from models.hive_member import HiveMember

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

        result.append({
            "id": activity.id,
            "action": activity.action,
            "created_at": (
                activity.created_at.isoformat()
            )
        })

    return result, 200