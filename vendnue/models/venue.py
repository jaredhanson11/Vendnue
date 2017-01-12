from . import db

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
