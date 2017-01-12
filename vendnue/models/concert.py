from . import db
from concert_to_artist import concerts_to_artists

class Concert(db.Model):
    '''
    Concerts model.
    '''
    __tablename__ = 'concerts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180))
    date = db.Column(db.DateTime)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
    map_id = db.Column(db.Integer, db.ForeignKey('maps.id'))
    artists_performing = db.relationship('Artist', secondary=concerts_to_artists, backref=db.backref('concerts', lazy='dynamic'))
    tickets = db.relationship('Ticket', backref='concert', lazy='dynamic')
    section_bids = db.relationship('Section_Bid', backref='concert', lazy='dynamic')

