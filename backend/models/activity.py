from extensions import db
from datetime import datetime


class Activity(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    hive_id = db.Column(
        db.Integer,
        db.ForeignKey("hive.id"),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    action = db.Column(
        db.String(255),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )