from flask_restful import Resource
from ..models import concert
from ..utils import *


class Concerts(Resource):
    '''
    URL Endpoint: `/concerts/`
    Allowed methods: GET
    '''

    def get(self):
        '''
        GET `/concerts/`:
            params:
                None
            returns:
                List of Concert objects
            errors:
                pass
        '''
        concert_objs = concert.Concert.get_concerts_desc().all()
        concerts_list_json = map(lambda concert_obj: concert_obj.get_json(), concert_objs)

        ret = {'concerts': concerts_list_json}
        return responses.success(ret, 200)


class Concert(Resource):
    '''
    GET `/concerts/<int:concert_id>
        params:
            None
        returns:
            User json object
        errors:
            pass
    '''
    def get(self, concert_id):
        concert_get = concert.Concert.get_concert_by_id(concert_id)
        if 'error' in concert_get['concert']:
            return responses.error('The concert you\'re searching for does not exist', 404)
        concert_obj = concert_get['concert']

        ret = {'concert':  concert_obj.get_json()}
        return responses.success(ret, 200)
