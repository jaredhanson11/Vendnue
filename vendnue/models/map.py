from sqlalchemy.exc import IntegrityError

from . import db
from ..utils import *

class Map(db.Model):
    '''
    Map model.
    '''
    __tablename__ = 'maps'
    id = db.Column(db.Integer, primary_key=True)
    path_to_map = db.Column(db.String(250))
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))
    # concert object through backref in concerts
    sections = db.relationship('Section', backref='map', lazy='dynamic')

    @staticmethod
    def create_map(path_to_map, concert_id):
        new_map = Map(path_to_map=path_to_map, concert_id=concert_id)
        db.session.add(new_map)
        try:
            db.session.commit()
        except:
            return model_responses.error('there was an integrity error')
        return model_responses.success({'map_id':new_map.id})
