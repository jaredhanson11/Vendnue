from flask_restful import Resource
from ..models import artist
from ..utils import *


class Artist(Resource):
    '''
    URL Endpoint /artists/<int:artist_id>
    Allowed methods: GET
    '''

    def get(self, artist_id):
        '''
        GET /artists/<int:artist_id>
            params:
                NONE
            returns:
                artist object
            errors:
                pass
        '''

        get_artist = artist.Artist.get_by_id(artist_id)
        if 'error' in get_artist:
            return responses.error(get_artist['error'], 404)
        artist_obj = get_artist['artist']
        data = artist_obj.get_json()
        return responses.success(data, 200)
