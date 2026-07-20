from extensions import db
from models.activity import Activity


def log_activity(
    hive_id,
    user_id,
    action
):

    print("INSIDE LOG_ACTIVITY")

    activity = Activity(
        hive_id=hive_id,
        user_id=user_id,
        action=action
    )

    db.session.add(activity)

    db.session.commit()

    print("ACTIVITY SAVED")