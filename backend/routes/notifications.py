from datetime import date, timedelta

from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.activity import Activity
from models.personal_task import PersonalTask
from models.task import Task
from models.hive_member import HiveMember

notifications_bp = Blueprint(
    "notifications",
    __name__
)


@notifications_bp.route(
    "/notifications",
    methods=["GET"]
)
@jwt_required()
def get_notifications():

    current_user_id = int(
        get_jwt_identity()
    )

    notifications = []

    # Recent activity

    activities = Activity.query.filter_by(
        user_id=current_user_id
    ).order_by(
        Activity.created_at.desc()
    ).limit(10).all()

    for activity in activities:

        notifications.append({

            "type": "activity",

            "message": activity.action,

            "created_at":
                activity.created_at.isoformat()
        })

    today = date.today()

    tomorrow = today + timedelta(
        days=1
    )

    # Personal tasks

    personal_tasks = PersonalTask.query.filter_by(
        user_id=current_user_id
    ).all()

    for task in personal_tasks:

        if (
            task.status != "completed"
            and task.due_date
        ):

            if task.due_date == today:

                notifications.append({

                    "type": "deadline",

                    "message":
                        f'Personal task "{task.title}" is due today.',

                    "created_at":
                        today.isoformat()
                })

            elif task.due_date == tomorrow:

                notifications.append({

                    "type": "deadline",

                    "message":
                        f'Personal task "{task.title}" is due tomorrow.',

                    "created_at":
                        today.isoformat()
                })

    # Hive tasks

    memberships = HiveMember.query.filter_by(
        user_id=current_user_id
    ).all()

    hive_ids = [
        membership.hive_id
        for membership in memberships
    ]

    hive_tasks = Task.query.filter(
        Task.hive_id.in_(hive_ids),
        Task.assigned_to == current_user_id
    ).all()

    for task in hive_tasks:

        if (
            task.status != "completed"
            and task.due_date
        ):

            if task.due_date == today:

                notifications.append({

                    "type": "deadline",

                    "message":
                        f'Task "{task.title}" is due today.',

                    "created_at":
                        today.isoformat()
                })

            elif task.due_date == tomorrow:

                notifications.append({

                    "type": "deadline",

                    "message":
                        f'Task "{task.title}" is due tomorrow.',

                    "created_at":
                        today.isoformat()
                })

    notifications.sort(
        key=lambda x:
        x["created_at"],
        reverse=True
    )

    return notifications, 200