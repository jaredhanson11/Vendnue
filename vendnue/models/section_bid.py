from datetime import datetime
from . import db

class Section_Bid(db.Model):
    '''
    Section Bid model.
    '''
    __tablename__ = 'section_bids'
    id = db.Column(db.Integer, primary_key=True)
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    num_tickets = db.Column(db.Integer)
    price_per_ticket = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # concert through backref
    # section through backref
