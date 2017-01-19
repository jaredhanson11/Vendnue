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
    path_to_tickets = db.Column(db.String(180))
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listed_at = db.Column(db.DateTime)
    # seller through users backref
    # concert through backref
    # section through backref

    cleared_section_bid_id = db.Column(db.Integer, db.ForeignKey('cleared_section_bids.id'))
