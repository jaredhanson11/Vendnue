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

    @staticmethod
    def create_section_bid(concert_id, section_id, num_tickets, bid_price_per_ticket):
        bid_price_total = num_tickets * float(bid_price_per_ticket)

        new_section_bid = Section_Bid(
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

        ret = {'section_bid_id': new_section_bid.id}
        return model_reponses.success(ret)

    @staticmethod
    def get_section_bids(section_id):
        section_bids = Section_Bid.query.filter_by(Section_Bid.section_id == section_id)
        if section_bids:
            ret = {'section_bids' : section_bids}
            return model_responses.success(ret)
        else:
            return model_responses.error('there are no section bids.')
