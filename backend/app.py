from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate


from config import Config
from extensions import db, jwt
from models.user import User
from models.hive import Hive
from models.hive_member import HiveMember
from models.task import Task
from models.activity import Activity

from routes.auth import auth_bp
from routes.hive import hive_bp
from routes.task import task_bp
from routes.activity import activity_bp
from models.personal_task import PersonalTask
from routes.personal_task import personal_task_bp
from routes.profile import profile_bp
from routes.statistics import statistics_bp
from routes.notifications import notifications_bp

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(auth_bp)
app.register_blueprint(hive_bp)
app.register_blueprint(task_bp)
app.register_blueprint(activity_bp)
app.register_blueprint(personal_task_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(statistics_bp)
app.register_blueprint(notifications_bp)
@app.route("/")
def home():
    return {
        "message": "WorkHive API is running"
    }


if __name__ == "__main__":
    app.run(debug=True)