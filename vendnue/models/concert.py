from sqlalchemy.exc import IntegrityError

from . import db
from concert_to_artist import concerts_to_artists
from ..utils import *

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
    def get_concerts_desc():
        return Concert.query.order_by(Concert.date.desc())


    def get_json(self, verbose=True):
        ret = {
                'concert_id': self.id,
                'concert_name': self.name
            }

        if verbose:
            ret.update({
                    'concert_venue': self.venue.get_json(verbose=False),
                    'concert_map': self.map.get_json(),
                    'concert_artists_performing': map(lambda artist_obj: artist_obj.get_json(verbose=False), self.artists_performing),
                    'concert_tickets': map(lambda ticket_obj: ticket_obj.get_json(verbose=False), self.tickets),
                    'concert_sold_tickets': map(lambda sold_ticket_obj: sold_ticket_obj.get_json(verbose=False), self.sold_tickets),
                    'concert_section_bids': map(lambda section_bid_obj: section_bid_obj.get_json(verbose=False), self.section_bids)
                })

        return ret
