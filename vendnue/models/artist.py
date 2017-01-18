from sqlalchemy.exc import IntegrityError
from . import db


class Artist(db.Model):
    '''
    Artists model.
    '''
    __tablename__ = 'artists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    # concerts = backref from concerts
