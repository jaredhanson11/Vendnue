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
    def get_concert_by_id(concert_id):
        concert_obj = Concert.query.get(concert_id)
        if concert_obj is None:
            return model_responses.error('Concert does not exist')
        ret = {'concert': concert_obj}
        return model_responses.success(ret)


    @staticmethod
    def get_concerts_desc():
        ret = {
            'concerts': Concert.query.order_by(Concert.date.desc())
        }
        return model_responses.success(ret)


    def get_json(self, verbose=True):
        concert_json = {
                'type': 'concert',
                'id': self.id,
                'name': self.name,
                'date': self.date.isoformat()
            }

        if verbose:
            concert_json.update({
                    'venue': self.venue.get_json(verbose=False),
                    'map': self.map.get_json(verbose=False),
                    'artists_performing': map(lambda artist_obj: artist_obj.get_json(verbose=False), self.artists_performing),
                    'sold_tickets': map(lambda sold_ticket_obj: sold_ticket_obj.get_json(verbose=False), self.sold_tickets),
                    'tickets': map(lambda ticket_obj: ticket_obj.get_json(verbose=False), self.tickets),
                    'section_bids': map(lambda section_bid_obj: section_bid_obj.get_json(verbose=False), self.section_bids)
                })
        ret = concert_json

        return ret
