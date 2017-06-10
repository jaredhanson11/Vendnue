from sqlalchemy.exc import IntegrityError

from . import db
from ..utils import *

import numpy as np
import itertools

class Section(db.Model):
    '''
    Section model.
    '''
    __tablename__ = 'sections'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    tickets = db.relationship('Ticket', backref='section', lazy='dynamic')
    sold_tickets = db.relationship('Sold_Ticket', backref='section', lazy='dynamic')
    section_bids = db.relationship('Section_Bid', backref='section', lazy='dynamic')
    cleared_section_bids = db.relationship('Cleared_Section_Bid', backref='section', lazy='dynamic')
    map_id = db.Column(db.Integer, db.ForeignKey('maps.id'))
    # map through backref get concert through map object

    def get_json(self, verbose=True):
        section_json = {
            'id' : self.id,
            'name' : self.name,
            'type' : 'section'
        }
        if verbose:
            section_json.update({
                'tickets' :  map(lambda ticket : ticket.get_json(verbose=False), self.tickets),
                'sold_tickets' : map(lambda sold_ticket : sold_ticket.get_json(verbose=False), self.sold_tickets),
                'section_bids' : map(lambda section_bid : section_bid.get_json(verbose=False), self.section_bids),
                'cleared_section_bids' : map(lambda cleared_section_bid : cleared_section_bid.get_json(verbose=False), self.cleared_section_bids),
                'map' : self.map.get_json(verbose=False),
                'section_bid_summary' : self.get_section_bid_summary(),
                'cleared_section_bid_summary' : self.get_cleared_section_bid_summary(),
                'ticket_summary' : self.get_ticket_summary(),
                'sold_ticket_summary' : self.get_sold_ticket_summary()
            })
        return section_json

    @staticmethod
    def create_section(name, map_id):
        new_section = Section(name=name, map_id=map_id)
        db.session.add(new_section)
        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('there was an integrity error')
        return model_responses.success({'section_id':new_section.id})

    @staticmethod
    def get_section_by_id(section_id):
        section_obj = Section.query.get(section_id)
        if section_obj is None:
            return model_responses.error('Section does not exist')
        ret = {'section': section_obj}
        return model_responses.success(ret)

    def is_related_to_concert_with_id(self, concert_id):
        return self.map.concert_id == concert_id

    def get_section_bid_summary(self):
        bids = map(lambda sb : [sb.bid_price_per_ticket] * sb.num_tickets, self.section_bids)
        bids = list(itertools.chain.from_iterable(bids))
        volume_bids = len(bids)

        # init with 0, update with real bids.
        # if this is nonzero, then the other params exist
        ret = {
            'volume_bids' : volume_bids
        }

        if volume_bids > 0:
            average_bid_price = float(sum(bids)) / len(bids)
            variance_bid_price = np.var(bids)
            hi_bid_price = max(bids)
            lo_bid_price = min(bids)

            data = {
                'average_price' : average_bid_price,
                'variance_price' : variance_bid_price,
                'hi_bid_price' : hi_bid_price,
                'lo_bid_price' : lo_bid_price,
            }
            ret.update(data)

        return ret

    def get_cleared_section_bid_summary(self):
        bids = map(lambda sb : [sb.bid_price_per_ticket] * sb.num_tickets, self.cleared_section_bids)
        bids = list(itertools.chain.from_iterable(bids))
        volume_bids = len(bids)

        # init with 0, update with real bids.
        # if this is nonzero, then the other params exist
        ret = {
            'volume_bids' : volume_bids
        }

        if volume_bids > 0:
            average_bid_price = float(sum(bids)) / len(bids)
            variance_bid_price = np.var(bids)
            hi_bid_price = max(bids)
            lo_bid_price = min(bids)

            data = {
                'average_price' : average_bid_price,
                'variance_price' : variance_bid_price,
                'hi_bid_price' : hi_bid_price,
                'lo_bid_price' : lo_bid_price,
            }
            ret.update(data)

        return ret




    def get_sold_ticket_summary(self):
        # avg sold ticket price
        sold_ticket_prices = map(lambda st : st.price, self.sold_tickets)
        volume_sold_tickets = len(sold_ticket_prices)

        ret = {
            'volume_sold_tickets' : volume_sold_tickets
        }

        if volume_sold_tickets > 0:
            average_sold_ticket_price = float(sum(sold_ticket_prices)) / len(sold_ticket_prices)
            variance_sold_ticket_price = np.var(sold_ticket_prices)
            hi_sold_ticket_price = max(sold_ticket_prices)
            lo_sold_ticket_price = min(sold_ticket_prices)

            data = {
                'average_sold_ticket_price' : average_sold_ticket_price,
                'variance_sold_ticket_price' : variance_sold_ticket_price,
                'hi_sold_ticket_price' : hi_sold_ticket_price,
                'lo_sold_ticket_price' : lo_sold_ticket_price,
            }
            ret.update(data)

        return ret


    def get_ticket_summary(self):
        # avg sold ticket price
        ticket_prices = map(lambda st : st.price, self.tickets)
        volume_tickets = len(ticket_prices)

        ret = {
            'volume_tickets' : volume_tickets
        }

        if volume_tickets > 0:
            average_ticket_price = float(sum(ticket_prices)) / len(ticket_prices)
            variance_ticket_price = np.var(ticket_prices)
            hi_ticket_price = max(ticket_prices)
            lo_ticket_price = min(ticket_prices)

            data = {
                'average_ticket_price' : average_ticket_price,
                'variance_ticket_price' : variance_ticket_price,
                'hi_ticket_price' : hi_ticket_price,
                'lo_ticket_price' : lo_ticket_price,
            }
            ret.update(data)

        return ret
