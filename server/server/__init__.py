from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_login import LoginManager
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config')
CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
app.secret_key = app.config['SESSION_SECRET_KEY']

migrate = Migrate(app, db)
login_manager = LoginManager(app)
api = Api(app)
# Need to import routes after instatiating the api object
import routes
routes.add_resources()
