from sqlalchemy.exc import IntegrityError
from . import db

from ..utils import *


class Artist(db.Model):
    '''
    Artists model.
    '''
    __tablename__ = 'artists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    # concerts = backref from concerts


    @staticmethod
    def get_by_id(artist_id):
        artist_obj = Artist.query.get(artist_id)
        if artist_obj is None:
            return model_reponses.error('No artist exists')
        ret = {
                'artist': artist_obj
            }
        return model_responses.success(ret)


    def get_json(self, verbose=True):
        ret = {
            'artist_id': self.id,
            'artist_name': self.name
        }

        if verbose:
            ret.update({
                'artist_concerts': map(lambda concert_obj: concert_obj.get_json(verbose=False), self.concerts)
            })

        return ret
