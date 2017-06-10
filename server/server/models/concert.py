from sqlalchemy.exc import IntegrityError

from . import db
from concert_to_artist import concerts_to_artists
from ..utils import *

# ultimately we will dispatch to a computation cluster
import numpy as np
import itertools

class Concert(db.Model):
    '''
    Concerts model.
    '''
    __tablename__ = 'concerts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180))
    date = db.Column(db.DateTime)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
    # venue through backref
    map = db.relationship('Map', backref='concert', uselist=False)
    artists_performing = db.relationship('Artist', secondary=concerts_to_artists, backref=db.backref('concerts', lazy='dynamic'))
    tickets = db.relationship('Ticket', backref='concert', lazy='dynamic')
    sold_tickets = db.relationship('Sold_Ticket', backref='concert', lazy='dynamic')
    section_bids = db.relationship('Section_Bid', backref='concert', lazy='dynamic')
    cleared_section_bids = db.relationship('Cleared_Section_Bid', backref='concert', lazy='dynamic')

    @staticmethod
    def create_concert(name, date, venue_id):
        new_concert = Concert(name=name, date=date, venue_id=venue_id)
        db.session.add(new_concert)
        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('there was an integrity error')
        return model_responses({'concert_id':new_concert.id})


    @staticmethod
    def get_concert_by_id(concert_id):
        concert_obj = Concert.query.get(concert_id)
        if concert_obj is None:
            return model_responses.error('Concert does not exist')
        ret = {'concert': concert_obj}
        return model_responses.success(ret)


    @staticmethod
    def get_concerts_desc():
        concert_objs = Concert.query.order_by(Concert.date.desc()).all() # do we need .all() ?
        if concert_objs is None:
            return model_responses.error('There are no concert objects.')
        ret = {
            'concerts': concert_objs
        }
        return model_responses.success(ret)

    @staticmethod
    def get_top_n_concerts_by_query(query, n=10):
        concert_objs = Concert.query.filter(Concert.name.contains(query)).limit(n).all()
        if concert_objs is None:
            return model_responses.error('There are no concerts that contain the query string ' + query)
        ret = {
            'concerts' : concert_objs
        }
        return model_responses.success(ret)

    def get_json(self, verbose=True):
        concert_json = {
                'type': 'concert',
                'id': self.id,
                'name': self.name,
                'date': self.date.isoformat(),
            }

        if verbose:
            concert_json.update({
                    'venue': self.venue.get_json(verbose=False),
                    'map': self.map.get_json(verbose=True),
                    'artists_performing': map(lambda artist_obj: artist_obj.get_json(verbose=False), self.artists_performing),
                    'sold_tickets': map(lambda sold_ticket_obj: sold_ticket_obj.get_json(verbose=True), self.sold_tickets),
                    'tickets': map(lambda ticket_obj: ticket_obj.get_json(verbose=True), self.tickets),
                    'section_bids': map(lambda section_bid_obj: section_bid_obj.get_json(verbose=True), self.section_bids),
                    'cleared_section_bids': map(lambda cleared_section_bid_obj: cleared_section_bid_obj.get_json(verbose=True), self.cleared_section_bids),
                    'section_bid_summary' : self.get_section_bid_summary(),
                    'cleared_section_bid_summary' : self.get_cleared_section_bid_summary(),
                    'ticket_summary' : self.get_ticket_summary(),
                    'sold_ticket_summary' : self.get_sold_ticket_summary()
                })
        ret = concert_json

        return ret


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
