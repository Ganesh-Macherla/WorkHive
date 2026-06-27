from extensions import db


class HiveMember(db.Model):

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

    role = db.Column(
        db.String(20),
        default="member"
    )