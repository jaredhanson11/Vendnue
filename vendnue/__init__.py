from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_login import LoginManager
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://hansonj:password@sql.mit.edu/hansonj+vendnue'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'vCasCy0yNdHxvTT30IHOEfqvbUaKON9ulvaS3EssxKhVm8deZMgsaWlmcyQKO1Qn5cy2Z'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
api = Api(app)
# Need to import routes after instatiating the api object
import routes
routes.add_resources()
