from sqlalchemy.exc import IntegrityError

from . import db
from ..utils import *

class Cleared_Section_Bid(db.Model):
    '''
    Cleared section bids are section bids that have succesfully been filled.
    '''
    __tablename__ = 'cleared_section_bids'

    ########################
    id = db.Column(db.Integer, primary_key=True)
    bidder_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    num_tickets = db.Column(db.Integer)
    bid_price_per_ticket = db.Column(db.Float)
    bid_price_total = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    # concert through backref
    # section through backref
    # bidder through backref
    ########################

    sold_tickets = db.relationship('Sold_Ticket', backref='cleared_section_bid', lazy='dynamic')
    cleared_at = db.Column(db.DateTime, default=datetime.utcnow)
