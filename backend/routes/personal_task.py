from datetime import datetime
from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.personal_task import PersonalTask
from extensions import db
from models.user import User
from activity_logger import log_activity

personal_task_bp = Blueprint(
    "personal_task",
    __name__
)


@personal_task_bp.route(
    "/personal-tasks",
    methods=["POST"]
)
@jwt_required()
def create_personal_task():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    due_date = data.get("due_date")

    priority = data.get(
        "priority",
        "medium"
    )

    if due_date:
        due_date = datetime.strptime(
            due_date,
            "%Y-%m-%d"
        ).date()

    if not title:
        return {
            "error": "Title is required"
        }, 400

    task = PersonalTask(
        title=title,
        description=description,
        due_date=due_date,
        priority=priority,
        user_id=int(get_jwt_identity())
    )

    db.session.add(task)
    db.session.commit()
    user = User.query.get(
        int(get_jwt_identity())
    )

    log_activity(
        None,
        user.id,
        f'{user.username} created personal task "{task.title}"'
    )

    return {
        "id": task.id,
        "title": task.title,
        "status": task.status
    }, 201


@personal_task_bp.route(
    "/personal-tasks",
    methods=["GET"]
)
@jwt_required()
def get_personal_tasks():

    current_user = int(
        get_jwt_identity()
    )

    tasks = PersonalTask.query.filter_by(
        user_id=current_user
    ).all()

    result = []

    for task in tasks:
        result.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "due_date": (
                task.due_date.isoformat()
                if task.due_date
                else None
            )
        })

    return result, 200


@personal_task_bp.route(
    "/personal-tasks/<int:task_id>/complete",
    methods=["PATCH"]
)
@jwt_required()
def complete_personal_task(task_id):

    task = PersonalTask.query.get(task_id)

    if not task:
        return {
            "error": "Task not found"
        }, 404

    current_user = int(
        get_jwt_identity()
    )

    if task.user_id != current_user:
        return {
            "error": "Not authorized"
        }, 403

    task.status = "completed"

    db.session.commit()
    user = User.query.get(current_user)

    log_activity(
        None,
        user.id,
        f'{user.username} completed personal task "{task.title}"'
    )

    return {
        "message": "Task completed"
    }, 200


@personal_task_bp.route(
    "/personal-tasks/<int:task_id>/edit",
    methods=["PUT"]
)
@jwt_required()
def update_personal_task(task_id):

    task = PersonalTask.query.get(task_id)

    if not task:
        return {
            "error": "Task not found"
        }, 404

    current_user = int(
        get_jwt_identity()
    )

    if task.user_id != current_user:
        return {
            "error": "Not authorized"
        }, 403

    data = request.get_json()

    due_date = data.get("due_date")

    if due_date:
        task.due_date = datetime.strptime(
            due_date,
            "%Y-%m-%d"
        ).date()
    else:
        task.due_date = None

    task.title = data.get(
        "title",
        task.title
    )

    task.description = data.get(
        "description",
        task.description
    )

    task.priority = data.get(
        "priority",
        task.priority
    )

    db.session.commit()
    user = User.query.get(current_user)

    log_activity(
        None,
        user.id,
        f'{user.username} updated personal task "{task.title}"'
    )

    return {
        "message": "Task updated"
    }, 200


@personal_task_bp.route(
    "/personal-tasks/<int:task_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_personal_task(task_id):

    task = PersonalTask.query.get(task_id)

    if not task:
        return {
            "error": "Task not found"
        }, 404

    current_user = int(
        get_jwt_identity()
    )

    if task.user_id != current_user:
        return {
            "error": "Not authorized"
        }, 403

    db.session.delete(task)
    user = User.query.get(current_user)

    log_activity(
        None,
        user.id,
        f'{user.username} deleted personal task "{task.title}"'
    )

    db.session.commit()

    return {
        "message": "Task deleted"
    }, 200