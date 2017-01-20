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


    def get_json(self, verbose=True):
        map_json = {
                'type': 'map',
                'id': self.id,
                'path_to_map': self.path_to_map
            }
        if verbose:
            map_json.update({
                'sections': map(lambda section_obj: section_obj.get_json(verbose=False), self.sections),
                'concert': self.concert.get_json(verbose=False)
            })

        ret = map_json

        return ret
