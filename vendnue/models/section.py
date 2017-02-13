from sqlalchemy.exc import IntegrityError

from . import db
from ..utils import *

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
                'map' : self.map.get_json(verbose=False)
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
