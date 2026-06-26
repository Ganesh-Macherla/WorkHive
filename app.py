from flask import Flask

from config import Config
from extensions import db, jwt
from models.user import User
from models.hive import Hive
from models.hive_member import HiveMember
from models.task import Task

from routes.auth import auth_bp
from routes.hive import hive_bp
from routes.task import task_bp

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(hive_bp)
app.register_blueprint(task_bp)


@app.route("/")
def home():
    return {
        "message": "WorkHive API is running"
    }


if __name__ == "__main__":
    app.run(debug=True)