from datetime import datetime
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

    purchased_tickets = db.relationship('Sold_Ticket', backref='cleared_section_bid', lazy='dynamic')
    cleared_at = db.Column(db.DateTime, default=datetime.utcnow)

    def get_json(self, verbose=True):
        cleared_section_bid_json = {
            'type': 'cleared_section_bid',
            'id' : self.id,
            'num_tickets' : self.num_tickets,
            'bid_price_per_ticket' : self.bid_price_per_ticket,
            'bid_price_total' : self.bid_price_total
        }
        if verbose:
            cleared_section_bid_json.update({
                'created_at' : self.created_at.isoformat(),
                'cleared_at' : self.cleared_atisoformat(),
                'concert' : self.concert.get_json(verbose=False),
                'section' : self.section.get_json(verbose=False),
                'bidder' : self.bidder.get_json(verbose=False),
                'purchased_tickets' : map(lambda ticket : ticket.get_json(verbose=False), self.purchased_tickets)
            })
        ret = cleared_section_bid_json
        return ret



