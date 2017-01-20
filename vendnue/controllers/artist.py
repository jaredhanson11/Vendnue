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
        ret = {
            'artist' : data
        }
        return responses.success(ret, 200)


class Artists(Resource):
        '''
        URL Endpoint /artists/
        Allowed methods: GET
        '''


        def get(self):
            '''
            GET /artists/
                params:
                    None
                returns:
                    list of artist objs
                errors:
                    pass
            '''
            get_artists = artist.Artist.get_all_artists()
            if 'error' in get_artists:
                ## Need better error handling
                return responses.error(get_artists['error'], 400)

            artist_objs = get_artists['artists']
            artists_json = map(lambda artist_obj: artist_obj.get_json(), artist_objs)

            ret = {
                'artists': artists_json
            }
            return ret
