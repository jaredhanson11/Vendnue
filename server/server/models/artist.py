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
            return model_responses.error('No artist exists')
        ret = {
            'artist': artist_obj
        }
        return model_responses.success(ret)


    @staticmethod
    def get_all_artists():
        artist_objs = Artist.query.order_by(Artist.name)
        if artist_objs is None:
            return model_responses.error('No artists listed')
        ret = {
            'artists': artist_objs
        }
        return model_responses.success(ret)

    def get_json(self, verbose=True):
        artist_json = {
            'id': self.id,
            'name': self.name,
            'type' :' artist'
        }

        if verbose:
            artist_json.update({
                'concerts': map(lambda concert_obj: concert_obj.get_json(verbose=False), self.concerts)
            })

        return artist_json
