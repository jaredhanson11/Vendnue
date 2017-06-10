from sqlalchemy.exc import IntegrityError

from datetime import datetime
from . import db
from ..utils import *

class Section_Bid(db.Model):
    '''
    Section Bid model.
    '''
    __tablename__ = 'section_bids'
    id = db.Column(db.Integer, primary_key=True)
    bidder_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id')) # necessary for easy reference to concert, could get through section
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    num_tickets = db.Column(db.Integer)
    bid_price_per_ticket = db.Column(db.Float)
    bid_price_total = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # concert through backref
    # section through backref
    # bidder through backref

    def get_json(self, verbose=True):
        section_bid_json = {
            'id' : self.id,
            'num_tickets' : self.num_tickets,
            'bid_price_per_ticket' : self.bid_price_per_ticket,
            'bid_price_total' : self.bid_price_total,
            'type' : 'section_bid'
        }
        if verbose:
            section_bid_json.update({
                'created_at' : self.created_at.isoformat(),
                'concert' : self.concert.get_json(verbose=False),
                'section' : self.section.get_json(verbose=False),
                'bidder' : self.bidder.get_json(verbose=False),
            })
        return section_bid_json


    @staticmethod
    def get_section_bid_by_id(section_bid_id):
        section_bid_obj = Section_Bid.query.get(section_bid_id)
        if section_bid_obj is None:
            return model_responses.error('Section Bid does not exist')
        ret = {'section_bid': section_bid_obj}
        return model_responses.success(ret)

    @staticmethod
    def create_section_bid(bidder_id, concert_id, section_id, num_tickets, bid_price_per_ticket):
        bid_price_total = num_tickets * float(bid_price_per_ticket)

        new_section_bid = Section_Bid(
                bidder_id=bidder_id,
                concert_id=concert_id,
                section_id=section_id,
                bid_price_per_ticket=bid_price_per_ticket,
                bid_price_total=bid_price_total,
                num_tickets=num_tickets
            )
        db.session.add(new_section_bid)

        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('Integrity error')

        obj = {
            'section_bid': new_section_bid
        }
        return model_responses.success(obj)

    @staticmethod
    def get_section_bids(section_id):
        section_bids = Section_Bid.query.filter(Section_Bid.section_id == section_id).all()
        if section_bids:
            objs = {
                'section_bids' : section_bids
            }
            return model_responses.success(objs)
        else:
            return model_responses.error('there are no section bids.')

