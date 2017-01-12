from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://hansonj:password@sql.mit.edu/hansonj+vendnue'
db = SQLAlchemy(app)
api = Api(app)

# Need to import routes after instatiating the api object
import routes
routes.add_resources()
