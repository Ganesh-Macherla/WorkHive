from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.task import Task
from models.personal_task import PersonalTask
from models.hive_member import HiveMember


statistics_bp = Blueprint(
    "statistics",
    __name__
)


@statistics_bp.route(
    "/statistics",
    methods=["GET"]
)
@jwt_required()
def get_statistics():

    user_id = int(
        get_jwt_identity()
    )

    personal_tasks = PersonalTask.query.filter_by(
        user_id=user_id
    ).all()

    team_tasks = Task.query.filter_by(
        assigned_to=user_id
    ).all()

    total_personal = len(
        personal_tasks
    )

    completed_personal = len(
        [
            task
            for task in personal_tasks
            if task.status == "completed"
        ]
    )

    total_team = len(
        team_tasks
    )

    completed_team = len(
        [
            task
            for task in team_tasks
            if task.status == "completed"
        ]
    )

    total_tasks = (
        total_personal
        + total_team
    )

    completed_tasks = (
        completed_personal
        + completed_team
    )

    pending_tasks = (
        total_tasks
        - completed_tasks
    )

    completion_rate = (
        round(
            (
                completed_tasks
                / total_tasks
            ) * 100,
            1
        )
        if total_tasks > 0
        else 0
    )

    hives_joined = HiveMember.query.filter_by(
        user_id=user_id
    ).count()

    personal_pending = len(
        [
            task
            for task in personal_tasks
            if task.status == "pending"
        ]
    )

    personal_completed = len(
        [
            task
            for task in personal_tasks
            if task.status == "completed"
        ]
    )

    team_pending = len(
        [
            task
            for task in team_tasks
            if task.status == "pending"
        ]
    )

    team_completed = len(
        [
            task
            for task in team_tasks
            if task.status == "completed"
        ]
    )

    return {

        "hives_joined": hives_joined,

        "personal_pending": personal_pending,
        "personal_completed": personal_completed,

        "team_pending": team_pending,
        "team_completed": team_completed,

        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "completion_rate": completion_rate

    }, 200