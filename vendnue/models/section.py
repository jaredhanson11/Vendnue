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
    bids = db.relationship('Section_Bid', backref='section', lazy='dynamic')
    map_id = db.Column(db.Integer, db.ForeignKey('maps.id'))
    # map through backref get concert through map object

    @staticmethod
    def create_section(name, map_id):
        new_section = Section(name=name, map_id=map_id)
        db.session.add(new_section)
        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('there was an integrity error')
        return model_responses.success({'section_id':new_section.id})
