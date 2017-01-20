from datetime import datetime
from sqlalchemy.exc import IntegrityError

from . import db
from ..utils import *

class Sold_Ticket(db.Model):
    '''
    Sold_Ticket model.
    '''
    __tablename__ = 'sold_tickets'
    id = db.Column(db.Integer, primary_key=True)
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    price = db.Column(db.Float)
    path_to_ticket = db.Column(db.String(180))
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listed_at = db.Column(db.DateTime)
    # seller through users backref
    # concert through backref
    # section through backref

    cleared_section_bid_id = db.Column(db.Integer, db.ForeignKey('cleared_section_bids.id'))
    # cleared_section_bid through backref
    sold_at = db.Column(db.DateTime, default=datetime.utcnow)


    def get_json(verbose=True):
        ret = {
                'sold_ticket_id': self.id,
                'sold_ticket_price': self.price
            }

        if verbose:
            ret.update({
                'sold_ticket_path_to_ticket': self.path_to_ticket,
                'sold_ticket_seller': self.seller.get_json(verbose=False),
                'sold_ticket_listed_at': self.listed_at,
                'sold_ticket_concert': self.concert.get_json(verbose=False),
                'sold_ticket_section': self.section.get_json(verbose=False),
                'sold_ticket_cleared_section_bid': self.cleared_section_bid.get_json(verbose=False),
                'sold_ticket_sold_at': self.sold_at
            })

        return ret
