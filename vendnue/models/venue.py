from sqlalchemy.exc import IntegrityError

from . import db
from ..utils import *

class Venue(db.Model):
    '''
    Venue model.
    '''
    __tablename__ = 'venues'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(250))
    city = db.Column(db.String(75))
    state = db.Column(db.String(75))
    concerts = db.relationship('Concert', backref='venue', lazy='dynamic')

    @staticmethod
    def create_venue(name, description, city, state):
        new_venue = Venue(name=name, description=description, city=city, state=state)
        db.session.add(new_venue)
        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('there was an integrity error')
        return model_responses.success({'venue_id' : new_venue.id})
