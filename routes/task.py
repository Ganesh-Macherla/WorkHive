from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.task import Task
from models.hive_member import HiveMember

from extensions import db


task_bp = Blueprint("task", __name__)


@task_bp.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    hive_id = data.get("hive_id")

    if not title or not hive_id:
        return {
            "error": "Title and hive_id are required"
        }, 400

    current_user_id = int(
        get_jwt_identity()
    )

    membership = HiveMember.query.filter_by(
        hive_id=hive_id,
        user_id=current_user_id
    ).first()

    if not membership:
        return {
            "error": "You are not a member of this hive"
        }, 403

    task = Task(
        title=title,
        description=description,
        hive_id=hive_id,
        created_by=current_user_id
    )

    db.session.add(task)
    db.session.commit()

    return {
        "id": task.id,
        "title": task.title,
        "status": task.status
    }, 201

@task_bp.route("/tasks/<int:hive_id>", methods=["GET"])
@jwt_required()
def get_tasks(hive_id):

    current_user_id = int(
        get_jwt_identity()
    )

    membership = HiveMember.query.filter_by(
        hive_id=hive_id,
        user_id=current_user_id
    ).first()

    if not membership:
        return {
            "error": "You are not a member of this hive"
        }, 403

    tasks = Task.query.filter_by(
        hive_id=hive_id
    ).all()

    result = []

    for task in tasks:

        result.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status
        })

    return result, 200

@task_bp.route(
    "/tasks/<int:task_id>/complete",
    methods=["PATCH"]
)
@jwt_required()
def complete_task(task_id):

    task = Task.query.get(task_id)

    if not task:
        return {
            "error": "Task not found"
        }, 404

    current_user_id = int(
        get_jwt_identity()
    )

    membership = HiveMember.query.filter_by(
        hive_id=task.hive_id,
        user_id=current_user_id
    ).first()

    if not membership:
        return {
            "error": "Not authorized"
        }, 403

    task.status = "completed"

    db.session.commit()

    return {
        "message": "Task marked completed"
    }, 200