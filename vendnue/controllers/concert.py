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
        concerts_query = concert.Concert.get_concerts_desc()
        if 'error' in concerts_query:
            return responses.error(concerts_query['error'], 500)
        concert_objs = concerts_query['concerts']
        concerts_list_json = map(lambda concert_obj: concert_obj.get_json(verbose=False), concert_objs)

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
        concert_query = concert.Concert.get_concert_by_id(concert_id)
        if 'error' in concert_query:
            return responses.error(concert_query['error'], 404)
        concert_obj = concert_query['concert']

        ret = {'concert':  concert_obj.get_json()}
        return responses.success(ret, 200)
