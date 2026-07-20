from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required
)

from models.user import User
from models.task import Task
from models.personal_task import PersonalTask
from models.hive_member import HiveMember

profile_bp = Blueprint(
    "profile",
    __name__
)


@profile_bp.route(
    "/users/<int:user_id>/profile",
    methods=["GET"]
)
@jwt_required()
def get_profile(user_id):

    user = User.query.get(user_id)

    if not user:
        return {
            "error": "User not found"
        }, 404

    hives_joined = HiveMember.query.filter_by(
        user_id=user_id
    ).count()

    team_tasks = Task.query.filter_by(
        assigned_to=user_id
    ).all()

    personal_tasks = PersonalTask.query.filter_by(
        user_id=user_id
    ).all()

    team_count = len(team_tasks)

    personal_count = len(personal_tasks)

    completed_count = 0
    pending_count = 0

    all_tasks = team_tasks + personal_tasks

    for task in all_tasks:

        if task.status == "completed":
            completed_count += 1
        else:
            pending_count += 1

    total_tasks = completed_count + pending_count

    completion_rate = 0

    if total_tasks > 0:
        completion_rate = round(
            completed_count * 100 / total_tasks,
            1
        )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "hives_joined": hives_joined,
        "team_tasks": team_count,
        "personal_tasks": personal_count,
        "completed_tasks": completed_count,
        "pending_tasks": pending_count,
        "completion_rate": completion_rate
    }, 200


@profile_bp.route(
    "/users/search",
    methods=["GET"]
)
@jwt_required()
def search_users():

    query = request.args.get(
        "q",
        ""
    )

    users = User.query.filter(
        User.username.ilike(
            f"%{query}%"
        )
    ).limit(5).all()

    result = []

    for user in users:

        result.append({
            "id": user.id,
            "username": user.username
        })

    return result, 200